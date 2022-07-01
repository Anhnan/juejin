import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './index.less'
import ArticleAll from '../../components/ArticleAll'

// const

const Home = () => {
  return (
    <>
      <div className="home--wrapper">
        <Header />
        <ArticleAll></ArticleAll>
        <Footer></Footer>
      </div>
    </>
  )
}

export default Home
