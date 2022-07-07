import React, { FC, useEffect, useRef, useState } from 'react'
import { Article, getArticles, SortBy } from '../../api'
import {
  defaultCategoryIndex,
  defaultSortBy,
  defaultArticleOffset,
  defaultArticleLimit,
} from '../../utils/constant'
import ArticleCard from '../ArticleCard'
import './style.less'
import { throttle } from 'lodash'
import PubSub from 'pubsub-js'
import LoadCard from '../LoadCard'

const ArticleList = () => {
  const [articlesList, setArticlesList] = useState<Article[]>([])
  const [articleLimit, setArticleLimit] = useState(defaultArticleLimit)
  const [categoryIndex, setCategoryIndex] = useState(defaultCategoryIndex)
  const [sortBy, setSortBy] = useState<SortBy>(defaultSortBy)
  const [isLoad, setIsLoad] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getNewCategoryIndex(defaultCategoryIndex)
    getSortBy()
    getCategoryIndex()
  }, [])
  useEffect(() => {
    setArticles(categoryIndex, sortBy, defaultArticleOffset, articleLimit)
  }, [articleLimit])
  const getNewCategoryIndex = (index: number) => {
    setCategoryIndex(index)
    setArticleLimit(defaultArticleLimit)
    setArticles(index, sortBy, defaultArticleOffset, articleLimit)
  }
  const getCategoryIndex = () => {
    PubSub.subscribe('categoryIndex', (_message, data) => {
      controlLoad()
      getNewCategoryIndex(data)
      if (listRef.current?.scrollTop) {
        listRef.current.scrollTop = 0
      }
    })
  }
  const getSortBy = () => {
    PubSub.subscribe('footTabSort', (_message, data) => {
      setSortBy(data)
      controlLoad()
      // getNewCategoryIndex(defaultCategoryIndex)
      setArticles(defaultCategoryIndex, data, defaultArticleOffset, articleLimit)
    })
  }
  const setArticles = (
    index: number,
    sort: SortBy,
    offset: number = defaultArticleOffset,
    limit: number = defaultArticleLimit,
  ) => {
    getArticles(index, sort, offset, limit).then((res) => {
      if (res.code === 0) {
        setArticlesList(res.data.articles)
      }
    })
  }
  const controlLoad = () => {
    setIsLoad(true)
    setTimeout(() => {
      setIsLoad(false)
    }, 300)
  }
  const listenScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (listRef.current?.offsetHeight) {
      if (
        listRef.current.scrollHeight - listRef.current.scrollTop <
        listRef.current.clientHeight + 100
      ) {
        setArticleLimit(articleLimit + 10)
      }
    }
  }

  return (
    <>
      <div className="article--list--wrapper" ref={listRef} onWheel={throttle(listenScroll, 1000)}>
        {isLoad ? (
          <LoadCard></LoadCard>
        ) : (
          articlesList.map((item, index) => {
            return <ArticleCard article={item} key={index}></ArticleCard>
          })
        )}
      </div>
    </>
  )
}

export default ArticleList
