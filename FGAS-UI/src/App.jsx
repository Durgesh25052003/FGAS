import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Home from './Pages/Home'
import Login from './Pages/Authentication/Login'
import Register from './Pages/Authentication/Register'
import AdminDashboard from './Pages/Admin/Dashboard'
import SchemeManagement from './Pages/Admin/SchemeManagement'
import CropManagement from './Pages/Admin/CropManagement'
import RegionalCropData from './Pages/Admin/RegionalCropData'
import Applications from './Pages/Admin/Applications'
import Farmers from './Pages/Admin/Farmers'
import UserDashboard from './Pages/User/UserDashboard'
import UserApplications from './Pages/User/UserApplications'
import UserSchemes from './Pages/User/UserSchemes'

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
  },
  {
    path:'/admin/regions',
    element:<RegionalCropData/>
  },
  {
    path:'/admin/applications',
    element:<Applications/>
  },
  {
    path:"/admin/farmers",
    element:<Farmers/>
  },
  {
    path:"/user/:id",
    element:<UserDashboard/>
  },
  {
    path:"/user/applications/:id",
    element:<UserApplications/>
  },
  {
    path:"/user/schemes/:id",
    element:<UserSchemes/>
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
