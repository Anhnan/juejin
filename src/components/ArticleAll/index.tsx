import { FC, useEffect, useState } from 'react'
import { CategoriesData, Category, getCategories } from '../../api'
import './style.less'
import { NavList } from './type'
import { defaultCategoryIndex } from '../../utils/constant'
import ArticleList from '../ArticleList'
import PubSub from 'pubsub-js'

const Categories: FC<NavList> = ({ navList }) => {
  const [activeParentIndex, setActiveParentIndex] = useState(defaultCategoryIndex)
  const [activeChildIndex, setActiveChildIndex] = useState(-1)
  const emitCategoryIndex = (index: number) => {
    PubSub.publish('categoryIndex', index)
  }
  const getCategoryIndex = () => {
    setActiveParentIndex(defaultCategoryIndex)
    setActiveChildIndex(-1)
  }
  useEffect(() => {
    emitCategoryIndex(defaultCategoryIndex)
    PubSub.subscribe('footTabSort', getCategoryIndex)
  }, [])
  return (
    <>
      <div className="categories--parent--wrapper">
        <div className="categories--parent--content">
          {navList.map((item, index) => {
            return (
              <div
                className={`categories--parent--item ${
                  index === activeParentIndex ? ' categories--parent--item--active' : ''
                }`}
                onClick={() => {
                  setActiveParentIndex(index)
                  emitCategoryIndex(item.category_id)
                  setActiveChildIndex(-1)
                }}
                key={index}
              >
                {item.category_name}
              </div>
            )
          })}
        </div>
      </div>
      <div className="categories--child--wrapper">
        {navList[activeParentIndex]?.children?.map((item, index) => {
          return (
            <div
              className={`categories--child--item ${
                index === activeChildIndex ? ' categories--child--item--active' : ''
              }`}
              onClick={() => {
                setActiveChildIndex(index)
                emitCategoryIndex(item.category_id)
              }}
              key={index}
            >
              {item.category_name}
            </div>
          )
        })}
      </div>
    </>
  )
}

const ArticleAll = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories().then((res) => {
      if (res.code === 0) {
        setCategories(res.data.categories)
      }
    })
  }, [])

  return (
    <>
      <div className="article--all--wrapper">
        <Categories navList={categories}></Categories>
        <ArticleList></ArticleList>
      </div>
    </>
  )
}

export default ArticleAll
