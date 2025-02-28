import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-orange-100 mt-4 text-yellow-950  text-sm pt-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo & Description */}
          <div>
            <h2 className="text-yellow-950 text-xl font-bold flex items-center space-x-2">
              {/* <span className="text-orange-500 text-2xl">🔥</span> */}
              <span>[Company name]</span>
            </h2>
            <p className="mt-2">
              Company is an admin dashboard template with fascinating features and amazing layout.
            </p>
          </div>
  
          {/* About */}
          <div>
            <h3 className="text-yellow-950 font-semibold mb-2">About Us</h3>
            <ul className="space-y-1">
              <li><a href="#" className=" hover:text-black">Careers</a></li>
              <li><a href="#" className=" hover:text-black">Affiliate Program</a></li>
              <li><a href="#" className=" hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className=" hover:text-black">Terms & Conditions</a></li>
            </ul>
          </div>
  
          {/* Stay Connected */}
          <div>
            <h3 className="text-yellow-950 font-semibold mb-2">Stay Connected</h3>
            <ul className="space-y-1">
              <li><a href="#" className=" hover:text-black">Blogs</a></li>
              <li><a href="#" className="flex gap-2 items-center hover:text-black"><FaFacebook /> Facebook</a></li>
              <li><a href="#" className="flex gap-2 items-center hover:text-black"><FaTwitter /> Twitter</a></li>
            </ul>
          </div>
  
          {/* Customer Service */}
          <div>
            <h3 className="text-yellow-950 font-semibold mb-2">Customer Service</h3>
            <ul className="space-y-1">
              <li><a href="#" className=" hover:text-black">Help Desk</a></li>
              <li><a href="#" className=" hover:text-black">Support, 24/7</a></li>
              <li><a href="#" className=" hover:text-black">Community</a></li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="text-center border-t border-yellow-700 mt-8 p-6">
          <p>Thank you for creating with ... | 2025 © </p>
        </div>
      </footer>
  )
}

export default Footer
