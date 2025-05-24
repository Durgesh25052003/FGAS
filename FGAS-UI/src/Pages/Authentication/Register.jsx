import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../config';
import { db } from '../../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setDoc, doc} from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    age: '',
    address: '',
    error: '',
    role:"user",
    showPassword: false,
    showConfirmPassword: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(auth.currentUser.uid)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        age: formData.age,
        address: formData.address,
        role: formData.role,
        createdAt: new Date().toISOString()
      });
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setFormData(prev => ({ ...prev, error: 'Failed to create account' }));
      toast.error('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative elements remain the same */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-green-100 to-green-50 rounded-full -mr-20 -mt-20 z-0" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-green-100 to-green-50 rounded-full -ml-20 -mb-20 z-0" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <img src="/images/logo.png" alt="Logo" className="h-16 w-16 mx-auto mb-4 transform hover:rotate-12 transition-transform" />
              </Link>
              <h2 className="text-3xl font-playfair font-bold text-green-600">Create Account</h2>
              <p className="text-gray-600 mt-2 font-montserrat">Join our farming community</p>
            </div>

            {formData.error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg mb-6 text-center">
                {formData.error}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    type={formData.showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('showPassword')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {formData.showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-montserrat mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={formData.showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('showConfirmPassword')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {formData.showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 font-montserrat mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-gray-700 font-montserrat mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-gray-700 font-montserrat mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-gray-700 font-montserrat mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your age"
                  min="18"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-montserrat mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your address"
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-102 font-semibold"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;