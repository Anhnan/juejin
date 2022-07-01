import { useState } from 'react'
import './style.less'

import searchIcon from '../../assets/search.svg'
import mainIcon from '../../assets/juejin.svg'
export default function Header() {
  const [search, setSearch] = useState(false)
  const getSearch = () => {
    setSearch(true)
  }
  const loseSearch = () => {
    setSearch(false)
  }
  return (
    <div className="header--wrapper">
      <header>
        <div className="header--contain--wrapper">
          <div className="header--icon--wrapper">
            <img alt="掘金icon" src={mainIcon} />
            <h4>首页</h4>
          </div>
          <div
            className={`header--search--wrapper ${
              search === true ? 'header--search--wrapper--active' : ''
            }`}
          >
            <div className="header--search--input--wrapper">
              <input
                placeholder={`${search === true ? '搜索文章/小册/标签/用户' : '探索稀土掘金'}`}
                onFocus={getSearch}
                onBlur={loseSearch}
              />
            </div>
            <div
              className={`header--search--icon--wrapper  ${
                search === true ? 'header--search--icon--wrapper--active' : ''
              }`}
            >
              <img src={searchIcon} />
            </div>
          </div>
          <div
            className={`header--login--wrapper  ${
              search === true ? 'header--login--wrapper--active' : ''
            }`}
          >
            <button className="header--login--button">登录</button>
          </div>
        </div>
      </header>
    </div>
  )
}
