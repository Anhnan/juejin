import React, { useEffect, useState } from 'react'
import { getArticleById } from '../../api'

export default function ArticleDetail() {
  const [articleContent, setArticleContent] = useState<string>('<div>23232</div>')
  useEffect(() => {
    getArticleById('6987387694087143437').then((res) => {
      if (res.code === 0) {
        console.log(document.location.pathname)
        setArticleContent(res.data.article.article_content)
      } else {
        console.warn(res.error_message)
      }
    })
  }, [])
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: articleContent }}></div>
    </>
  )
}
