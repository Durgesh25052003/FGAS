import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import ReactTypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    '/images/farming1.jpg',
    '/images/farming2.jpg',
    '/images/farming3.jpg'
  ]
  const Navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins">
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white relative h-[600px]">
        <div className="absolute inset-0 overflow-hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Farming Background"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105
                ${index === currentImage ? 'opacity-30 scale-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-600/70" />
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10">
          <nav className="flex items-center justify-between backdrop-blur-sm bg-white/10 rounded-full px-6 py-3">
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="Logo" className="h-14 w-14 transform hover:rotate-12 transition-transform" />
              <h1 className="text-3xl font-playfair font-bold">FGAS</h1>
            </div>
            <div className="flex items-center space-x-8 font-montserrat">
              <Link to="/" className="hover:text-green-200 transition-colors hover:scale-105 transform">Home</Link>
              <Link to="/about" className="hover:text-green-200 transition-colors hover:scale-105 transform">About</Link>
              <Link to="/contact" className="hover:text-green-200 transition-colors hover:scale-105 transform">Contact</Link>
              <button className="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-green-100 transition-all duration-300 font-semibold hover:shadow-lg transform hover:scale-105" onClick={Navigate("/login")}>
                Login
              </button>
            </div>
          </nav>
          <div className="mt-32 text-center">
            <h2 className="text-6xl font-playfair font-bold mb-8 drop-shadow-lg">Farmer Government Aided Schemes</h2>
            <ReactTypingEffect
              text={[
                "Empowering farmers through government initiatives",
                "Supporting agricultural growth and development",
                "Making scheme access easier for farmers",
                "Building a stronger farming community"
              ]}
              speed={50}
              eraseSpeed={50}
              typingDelay={1000}
              eraseDelay={2000}
              className="text-2xl text-green-100 font-montserrat drop-shadow-md"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 mt-5 relative z-20">
        <section className="bg-white rounded-2xl p-8 mb-16 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-playfair font-bold text-green-600 mb-6">About Us</h2>
          <p className="text-gray-600 mb-4 font-montserrat text-lg leading-relaxed">
            We are dedicated to supporting farmers by providing easy access to government schemes
            and agricultural resources. Our platform simplifies the process of finding and applying
            for various agricultural support programs.
          </p>
          <Link to="/about" className="text-green-600 hover:text-green-700 font-semibold font-montserrat inline-flex items-center group">
            Learn More 
            <span className="transform transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-102 font-semibold">
                Apply for Scheme
              </button>
              <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-102 font-semibold">
                View My Applications
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">Need assistance? Reach out to us:</p>
              <p className="text-gray-600 text-lg hover:text-green-600 transition-colors">📞 Helpline: 1800-XXX-XXXX</p>
              <p className="text-gray-600 text-lg hover:text-green-600 transition-colors">📧 Email: support@fgas.gov.in</p>
              <Link to="/contact" className="block w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-102 text-center font-semibold">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-green-700 to-green-600 text-white mt-20 py-8 font-montserrat">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© 2024 Farmer Government Aided Schemes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home