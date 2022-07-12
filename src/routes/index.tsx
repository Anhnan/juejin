import { Navigate } from 'react-router-dom'
import ArticleDetail from '../pages/ArticleDetail'
import Home from '../pages/Home'

const routes = [
  {
    path: 'home',
    element: <Home></Home>,
    exact: true,
  },
  {
    path: 'post/:article_id',
    element: <ArticleDetail></ArticleDetail>,
    exact: true,
  },
  {
    path: '*',
    element: <Navigate replace to={`home`}></Navigate>,
  },
]

export default routes
