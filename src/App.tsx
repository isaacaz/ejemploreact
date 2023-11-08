import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './routes/router'
const App = () => {

  return (
    <RouterProvider router={createBrowserRouter(router())} />
  )
}

export default App