import { FC, useEffect, useState } from 'react'
import { CategoriesData, Category, getCategories } from '../../api'
import './style.less'
import { NavList } from './type'

const Categories: FC<NavList> = ({ navList }) => {
  const [activeParentIndex, setActiveParentIndex] = useState(0)
  const [activeChildIndex, setActiveChildIndex] = useState(-1)

  return (
    <>
      <div className="categories--parent--wrapper">
        {navList.map((item, index) => {
          return (
            <div
              className={`categories--parent--item ${
                index === activeParentIndex ? ' categories--parent--item--active' : ''
              }`}
              onClick={() => {
                setActiveParentIndex(index)
                setActiveChildIndex(-1)
              }}
              key={index}
            >
              {item.category_name}
            </div>
          )
        })}
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
      <Categories navList={categories}></Categories>
    </>
  )
}

export default ArticleAll
