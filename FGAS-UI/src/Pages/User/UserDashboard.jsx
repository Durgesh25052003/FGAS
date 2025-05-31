import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileAlt, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config';

const UserDashboard = () => {

    const navigate=useNavigate();

    console.log(auth.currentUser.uid);
    const userid=auth.currentUser.uid;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-poppins">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white p-6">
        <div className="flex items-center space-x-4 mb-10">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold">Farmer Portal</h1>
        </div>

        <nav className="space-y-4">
          <Link to="/user" className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
            <FaChartBar className="text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all" onClick={()=>{
            navigate(`/user/applications/${userid}`);
          }}>
            <FaClipboardList className="text-xl" />
            <span>My Applications</span>
          </Link>
          <Link className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all"
          onClick={()=>{
            navigate(`/user/schemes/${userid}`);
          }}>
            <FaFileAlt className="text-xl" />
            <span>View Schemes</span>
          </Link>
          <Link to="/user/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all">
            <FaUser className="text-xl" />
            <span>Edit Profile</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">Welcome to Your Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            onClick={() =>{
                navigate('/login');
            }}>
              Logout
            </button>
          </div>
        </header>

        {/* Placeholder for user-specific content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Overview</h3>
          <p className="text-gray-600">This is your personalized user dashboard. Here you can manage your applications, view available schemes, and update your profile information.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-800">Total Applications</h4>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-800">Approved Applications</h4>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-800">Profile Completion</h4>
              <p className="text-2xl font-bold text-blue-600">80%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;