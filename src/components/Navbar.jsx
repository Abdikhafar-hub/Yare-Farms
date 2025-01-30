import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
            <img src="src/assets/images/logo.png" alt="Poultry Farm Logo" className="h-12 w-auto mr-3" />
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

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="absolute top-4 right-4 text-green-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <div className="flex flex-col mt-16 space-y-4 p-6">
          <a onClick={() => handleScrollToSection("home")} className="cursor-pointer text-green-600 text-lg font-extrabold border-2 border-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
            Home
          </a>
          <a onClick={() => handleScrollToSection("about")} className="cursor-pointer text-green-600 text-lg font-extrabold border-2 border-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
            About Us
          </a>
          <a onClick={() => handleScrollToSection("services")} className="cursor-pointer text-green-600 text-lg font-extrabold border-2 border-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
            Our Services
          </a>
          <a onClick={() => handleScrollToSection("products")} className="cursor-pointer text-green-600 text-lg font-extrabold border-2 border-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
            Products
          </a>
          <a onClick={() => handleScrollToSection("contact")} className="cursor-pointer text-green-600 text-lg font-extrabold border-2 border-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
            Contact
          </a>
          <a onClick={() => handleScrollToSection("blog")} className="cursor-pointer text-green-600 text-lg font-extrabold border-2 border-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
            Blog
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
