import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const handleNavigation = (sectionId) => {
    if (location.pathname === "/") {
      
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false); 
      }
    } else {
      
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); 
    }
  };

  return (
    <>
      
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="Poultry Farm Logo" className="h-12 w-auto mr-3" />
            <span className={`text-lg font-extrabold ${isScrolled ? "text-green-700" : "text-green-600"}`}>
              
            </span>
          </div>

          
          <div className="flex items-center space-x-4 md:hidden">
            
            <Link to="/cart" className="relative text-green-700 hover:text-green-800">
              <i className="fas fa-shopping-cart text-2xl"></i>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          
          <div className="hidden md:flex space-x-4">
            <button onClick={() => handleNavigation("home")} className="nav-link">Home</button>
            <button onClick={() => handleNavigation("about")} className="nav-link">About Us</button>
            <button onClick={() => handleNavigation("services")} className="nav-link">Our Services</button>
            <button onClick={() => handleNavigation("products")} className="nav-link">Products</button>
            <button onClick={() => handleNavigation("contact")} className="nav-link">Contact</button>
            <button onClick={() => handleNavigation("blog")} className="nav-link">Blog</button>

            
            <Link to="/cart" className="relative text-green-700 hover:text-green-800">
              <i className="fas fa-shopping-cart text-2xl"></i>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="absolute top-4 right-4 text-green-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <div className="flex flex-col mt-16 space-y-4 p-6">
          <button onClick={() => handleNavigation("home")} className="mobile-nav-link">Home</button>
          <button onClick={() => handleNavigation("about")} className="mobile-nav-link">About Us</button>
          <button onClick={() => handleNavigation("services")} className="mobile-nav-link">Our Services</button>
          <button onClick={() => handleNavigation("products")} className="mobile-nav-link">Products</button>
          <button onClick={() => handleNavigation("contact")} className="mobile-nav-link">Contact</button>
          <button onClick={() => handleNavigation("blog")} className="mobile-nav-link">Blog</button>
        </div>
      </div>

      
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
