import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Home from './Pages/Home'
import Login from './Pages/Authentication/Login'
import Register from './Pages/Authentication/Register'
import AdminDashboard from './Pages/Admin/Dashboard'
import SchemeManagement from './Pages/Admin/SchemeManagement'
import CropManagement from './Pages/Admin/CropManagement'

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
  },
  {
    path:'/admin',
    element:<AdminDashboard/>
  },
  {
    path:'/admin/schemes',
    element:<SchemeManagement/>
  },
  {
    path:'/admin/crops',
    element:<CropManagement/>
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
