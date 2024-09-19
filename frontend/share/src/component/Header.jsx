import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react'
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
    return (
        <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">Just Share</a>
          <div className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/download" className="text-gray-600 hover:text-gray-900">Download</a>
            <a href="/upload" className="text-gray-600 hover:text-gray-900">Upload</a>
          </div>
        </nav>
      </header>
    )
  }