import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaClipboardList, 
  FaChartBar, 
  FaCog, 
  FaSeedling, 
  FaFileAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign
} from 'react-icons/fa';
import { useNavigate } from'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config';

const AdminDashboard = () => {

  const navigate=useNavigate();
  const [applications,setApplications]=React.useState([]);
  const [farmers,setFarmers]=React.useState([]);
  const [schemes,setSchemes]=React.useState([]);
  const [crops,setCrops]=useState([]);

  const getFarmers=async()=>{
    const farmers= await getDocs(collection(db,'farmers'));
  }

  const getSchemes=async()=>{
    const schemes= await getDocs(collection(db,'schemes'));
    console.log(schemes.docs.map((doc)=>doc.data()));
    setSchemes(schemes.docs.map((doc)=>doc.data()));
  }

  const getCrops=async()=>{
    const crops= await getDocs(collection(db,'crops'));
    setCrops(crops.docs.map((doc)=>doc.data()));
  }

  useEffect(()=>{
    getSchemes()
  })


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-green-700 to-green-600 text-white p-6">
        <div className="flex items-center space-x-4 mb-10">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold">Agro Admin</h1>
        </div>

        <nav className="space-y-4">
          <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
            <FaChartBar className="text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/schemes" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all" onClick={()=>{
             navigate('/admin/schemes');
          }}>
            <FaFileAlt className="text-xl" />
            <span>Schemes Management</span>
          </Link>
          <Link to="/admin/crops" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all" onClick={()=>{
            navigate('/admin/crops');
          }}>
            <FaSeedling className="text-xl" />
            <span>Crop Database</span>
          </Link>
          <Link to="/admin/applications" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all" onClick={()=>{
            navigate('/admin/applications');
          }}>
            <FaClipboardList className="text-xl" />
            <span>Applications</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all" onClick={()=>{
            navigate('/admin/farmers')
          }}>
            <FaUsers className="text-xl" />
            <span>Farmer Database</span>
          </Link>
          <Link to="/admin/regions" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all cursor-pointer" onClick={()=>{
            navigate("/admin/regions")
            }}>
            <FaMapMarkerAlt className="text-xl" />
            <span>Regional Data</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all">
            <FaCog className="text-xl" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-700">Agricultural Services Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search schemes, farmers..."
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors" onClick={()=>{
              navigate('/login')
            }
            }>
              Logout
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Active Farmers</h3>
              <FaUsers className="text-2xl text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">2,543</p>
            <p className="text-sm text-gray-500 mt-2">+15% this season</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Active Schemes</h3>
              <FaFileAlt className="text-2xl text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{
              schemes.length
              }</p>
            <p className="text-sm text-gray-500 mt-2">3 new this month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Pending Applications</h3>
              <FaClipboardList className="text-2xl text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">156</p>
            <p className="text-sm text-gray-500 mt-2">Requires review</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Funds Disbursed</h3>
              <FaRupeeSign className="text-2xl text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">₹12.5M</p>
            <p className="text-sm text-gray-500 mt-2">This quarter</p>
          </div>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left">
                <FaFileAlt className="text-green-600 mb-2" />
                <Link className="font-semibold" onClick={()=>{
                  navigate('/admin/schemes');
                }}>Add New Scheme</Link>
                <p className="text-sm text-gray-500">Create new government scheme</p>
              </button>
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left">
                <FaSeedling className="text-green-600 mb-2" />
                <Link className="font-semibold" onClick={
                  ()=>{
                    navigate('/admin/crops');
                  }
                }>Update Crop Data</Link>
                <p className="text-sm text-gray-500">Manage crop information</p>
              </button>
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left">
                <FaCalendarAlt className="text-green-600 mb-2" />
                <h4 className="font-semibold">Seasonal Updates</h4>
                <p className="text-sm text-gray-500">Update seasonal guidelines</p>
              </button>
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left">
                <FaMapMarkerAlt className="text-green-600 mb-2" />
                <h4 className="font-semibold">Regional Analysis</h4>
                <p className="text-sm text-gray-500">View regional statistics</p>
              </button>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Recent Applications</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <h4 className="font-semibold">Crop Subsidy Application</h4>
                    <p className="text-sm text-gray-500">Farmer ID: FRM{item}2345</p>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Pending Review</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700">View Details →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;