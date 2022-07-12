import { useRoutes } from 'react-router-dom'
import Main from './pages/Main'
import routes from './routes'

function App() {
  const elements = useRoutes(routes)
  return elements
  //  (
  //   <>
  //     <Main />
  //   </>
  // )
}

export default App
