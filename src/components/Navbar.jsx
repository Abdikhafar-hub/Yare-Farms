import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import cart context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart(); // Access cart state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle smooth scrolling
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="Poultry Farm Logo" className="h-12 w-auto mr-3" />
            <span className={`text-lg font-extrabold ${isScrolled ? "text-green-700" : "text-green-600"}`}>
              
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <a onClick={() => handleScrollToSection("home")} className="cursor-pointer px-4 py-2 font-extrabold text-green-600 border-2 border-green-600 rounded-lg transition-all duration-500 bg-white hover:bg-green-600 hover:text-white">
              Home
            </a>
            <a onClick={() => handleScrollToSection("about")} className="cursor-pointer px-4 py-2 font-extrabold text-green-600 border-2 border-green-600 rounded-lg transition-all duration-500 bg-white hover:bg-green-600 hover:text-white">
              About Us
            </a>
            <a onClick={() => handleScrollToSection("services")} className="cursor-pointer px-4 py-2 font-extrabold text-green-600 border-2 border-green-600 rounded-lg transition-all duration-500 bg-white hover:bg-green-600 hover:text-white">
              Our Services
            </a>
            <a onClick={() => handleScrollToSection("products")} className="cursor-pointer px-4 py-2 font-extrabold text-green-600 border-2 border-green-600 rounded-lg transition-all duration-500 bg-white hover:bg-green-600 hover:text-white">
              Products
            </a>
            <a onClick={() => handleScrollToSection("contact")} className="cursor-pointer px-4 py-2 font-extrabold text-green-600 border-2 border-green-600 rounded-lg transition-all duration-500 bg-white hover:bg-green-600 hover:text-white">
              Contact
            </a>
            <a onClick={() => handleScrollToSection("blog")} className="cursor-pointer px-4 py-2 font-extrabold text-green-600 border-2 border-green-600 rounded-lg transition-all duration-500 bg-white hover:bg-green-600 hover:text-white">
              Blog
            </a>

            {/* 🛒 Cart Icon with Count */}
            <Link to="/cart" className="relative text-green-700 hover:text-green-800">
              <i className="fas fa-shopping-cart text-2xl"></i>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className={`w-6 h-6 ${isScrolled ? "text-green-700" : "text-green-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
