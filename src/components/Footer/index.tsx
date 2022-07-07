import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js'
import { SortBy } from '../../api'
import './style.less'

type TabType = SortBy | 'history'

export default function Footer() {
  const [tab, setTab] = useState<TabType>('hot')
  useEffect(() => {
    if (tab === 'hot' || tab === 'new') {
      PubSub.publish('footTabSort', tab)
    }
  }, [tab])
  const setHot = () => {
    setTab('hot')
  }
  const setNew = () => {
    setTab('new')
  }
  return (
    <div className="footer--wrapper">
      <button
        className={`footer--button  ${tab === 'hot' ? 'footer--button--active' : ''}`}
        onClick={setHot}
      >
        最热
      </button>
      <button
        className={`footer--button  ${tab === 'new' ? 'footer--button--active' : ''}`}
        onClick={setNew}
      >
        最新
      </button>
      <button className={`footer--button  ${tab === 'history' ? 'footer--button--active' : ''}`}>
        历史
      </button>
    </div>
  )
}
