import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Home from './Pages/Home'
import Login from './Pages/Authentication/Login'
import Register from './Pages/Authentication/Register'


const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  }
])

function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
