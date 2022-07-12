import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../api'
import Header from '../../components/Header'

export default function ArticleDetail() {
  const [articleContent, setArticleContent] = useState<string>('<h1>文章加载中</h1>')
  const { article_id } = useParams()
  useEffect(() => {
    console.log('params', article_id)
    getArticleById(article_id as string).then((res) => {
      if (res.code === 0) {
        // console.log(document.location.pathname)
        // console.log(article_id);
        console.log(res)

        setArticleContent(res.data.article.article_content)
        console.log(articleContent)
        console.log('get', res.data.article.article_content)
      } else {
        console.warn(res.error_message)
      }
    })
  }, [])
  function createMarkup(articleContent: string) {
    console.log('context', articleContent)

    return { __html: articleContent }
  }
  return (
    <>
      <Header></Header>
      <div dangerouslySetInnerHTML={createMarkup(articleContent)} />
    </>
  )
}
