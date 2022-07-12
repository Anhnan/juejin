import { FC, useEffect, useState } from 'react'
import { ArticleData } from '../../api'
import * as dayjs from 'dayjs'
import './style.less'
import { useLocation, useNavigate } from 'react-router-dom'

const timeSubUnit = {
  year: '年',
  month: '月',
  day: '天',
  hour: '小时',
  minute: '分钟',
  second: '秒',
}

const ArticleCard: FC<ArticleData> = ({ article }) => {
  const [showTime, setShowTime] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setShowTime(getTimeShow(article.article_info.ctime))
  }, [])
  const getTimeShow = (time: number): string => {
    const now = new Date()
    const date1 = dayjs.unix(time)
    const date2 = dayjs(now)
    for (const [key, value] of Object.entries(timeSubUnit) as [
      'year' | 'month' | 'day' | 'hour' | 'minute' | 'second',
      string,
    ][]) {
      const sub = date2.diff(date1, key)
      if (sub > 0) {
        return `${sub}${value}前`
      }
    }
    return `时间转换出错`
  }
  return (
    <>
      <div
        className="articleCard--item--wrapper"
        onClick={() => {
          // 获取绝对路径
          const hrefStr = window.location.href
          const location = useLocation()
          console.log('@@@', location)

          // 获取相对路径
          const urlParams = new URL(hrefStr)
          const pathname = urlParams?.pathname
          // 获取根路径
          const rootPath = hrefStr.replace(pathname, '')
          // console.log(hrefStr, '###',urlParams, '###',pathname, '###',rootPath);
          console.log(urlParams)

          // 在新标签页面打开绝对路径
          window.open(`${urlParams.origin}#/post/${article.article_id}`, '_blank')
          // 该页面需要的信息通过id进行获取，其他信息也可以通过localStorage等方式进行保存
          // navigate(`/post/${article.article_id}`, {
          //   replace: true
          // })
        }}
      >
        <div className="articleCard--item--content">
          <div className="articleCard--item--author">
            <div className="articleCard--author--username">
              {article.author_user_info.user_name}
            </div>
            <div className="articleCard--author--time">{showTime}</div>
          </div>
          <div className="articleCard--article--title">{article.article_info.title}</div>
          <div className="articleCard--brief--content">
            <div
              className={`articleCard--brief--text ${
                article.article_info.cover_image ? '' : 'articleCard--brief--text--all'
              }`}
            >
              <p>{article.article_info.brief_content}</p>
            </div>
            <div
              className={`articleCard--brief--cover ${
                article.article_info.cover_image ? '' : 'articleCard--brief--cover--none'
              }`}
            >
              <img src={article.article_info.cover_image} alt={article.article_info.title} />
            </div>
          </div>
          <div className="articleCard--other--message">
            <ul>
              <li>
                <i></i>
                <span>&nbsp;{article.article_info.view_count}</span>
              </li>
              <li>
                <i></i>
                <span>&nbsp;{article.article_info.digg_count}</span>
              </li>
              <li>
                <i></i>
                <span>&nbsp;{article.article_info.comment_count}</span>
              </li>
            </ul>

            <div className="articleCard--tags--list">
              <ul>
                <li className="articleCard--tags--item">
                  <span>{article.category_info.first_category_name}</span>
                </li>
                <li className="articleCard--tags--item">
                  <span>{article.category_info.second_category_name}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleCard
