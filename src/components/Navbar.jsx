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
            <a onClick={() => handleScrollToSection("home")} className="nav-link">Home</a>
            <a onClick={() => handleScrollToSection("about")} className="nav-link">About Us</a>
            <a onClick={() => handleScrollToSection("services")} className="nav-link">Our Services</a>
            <a onClick={() => handleScrollToSection("products")} className="nav-link">Products</a>
            <a onClick={() => handleScrollToSection("contact")} className="nav-link">Contact</a>
            <a onClick={() => handleScrollToSection("blog")} className="nav-link">Blog</a>

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
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="absolute top-4 right-4 text-green-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <div className="flex flex-col mt-16 space-y-4 p-6">
          <a onClick={() => handleScrollToSection("home")} className="mobile-nav-link">Home</a>
          <a onClick={() => handleScrollToSection("about")} className="mobile-nav-link">About Us</a>
          <a onClick={() => handleScrollToSection("services")} className="mobile-nav-link">Our Services</a>
          <a onClick={() => handleScrollToSection("products")} className="mobile-nav-link">Products</a>
          <a onClick={() => handleScrollToSection("contact")} className="mobile-nav-link">Contact</a>
          <a onClick={() => handleScrollToSection("blog")} className="mobile-nav-link">Blog</a>

          {/* 🛒 Mobile Cart Icon with Count */}
          <Link to="/cart" className="relative text-green-700 hover:text-green-800 flex items-center" onClick={() => setIsOpen(false)}>
            <i className="fas fa-shopping-cart text-2xl"></i>
            {cart.length > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
                {cart.length}
              </span>
            )}
            <span className="ml-2 text-lg">Cart</span>
          </Link>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .nav-link {
            cursor: pointer;
            padding: 10px 15px;
            font-weight: bold;
            color: #047857;
            border: 2px solid #047857;
            border-radius: 8px;
            background: white;
            transition: all 0.3s ease-in-out;
          }
          .nav-link:hover {
            background: #047857;
            color: white;
          }
          .mobile-nav-link {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #047857;
            border: 2px solid #047857;
            padding: 10px;
            border-radius: 8px;
            transition: all 0.3s ease-in-out;
          }
          .mobile-nav-link:hover {
            background: #047857;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
