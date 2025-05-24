import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential=await signInWithEmailAndPassword(auth, email, password);
      const userid=userCredential.user.uid;
      const useRef= doc(db,"users",userid);
      const userDoc=await getDoc(useRef);
      const userRole=userDoc.data().role;
      if(userRole==="admin"){
       console.log("Admin"); 
      }
      else if(userRole==="user"){
        alert("User");
      }
      
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-green-100 to-green-50 rounded-full -mr-20 -mt-20 z-0" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-green-100 to-green-50 rounded-full -ml-20 -mb-20 z-0" />

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <img src="/images/logo.png" alt="Logo" className="h-16 w-16 mx-auto mb-4 transform hover:rotate-12 transition-transform" />
              </Link>
              <h2 className="text-3xl font-playfair font-bold text-green-600">Welcome Back</h2>
              <p className="text-gray-600 mt-2 font-montserrat">Login to access your account</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-montserrat mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-montserrat mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-green-600 rounded" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-green-600 hover:text-green-700 font-semibold">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-102 font-semibold"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold
                cursor-pointer" 
                onClick={()=>navigate("/register")}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;