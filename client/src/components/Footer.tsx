import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-orange-100 mt-4 text-yellow-950 text-sm pt-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-yellow-950 text-lg sm:text-xl font-bold flex items-center space-x-2">
            <span>[Company name]</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm">
            Company is an admin dashboard template with fascinating features and an amazing layout.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-yellow-950 font-semibold mb-2 text-sm sm:text-base">About Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Careers</a></li>
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Affiliate Program</a></li>
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-yellow-950 font-semibold mb-2 text-sm sm:text-base">Stay Connected</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Blogs</a></li>
            <li><a href="#" className="flex gap-2 items-center hover:text-black text-xs sm:text-sm"><FaFacebook /> Facebook</a></li>
            <li><a href="#" className="flex gap-2 items-center hover:text-black text-xs sm:text-sm"><FaTwitter /> Twitter</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-yellow-950 font-semibold mb-2 text-sm sm:text-base">Customer Service</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Help Desk</a></li>
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Support, 24/7</a></li>
            <li><a href="#" className="hover:text-black text-xs sm:text-sm">Community</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-yellow-700 mt-8 p-4 sm:p-6">
        <p className="text-xs sm:text-sm">Thank you for creating with ... | 2025 © </p>
      </div>
    </footer>
  )
}

export default Footer
