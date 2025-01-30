import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Overlay (Floating Over Hero) */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/images/logo.png" alt="Poultry Farm Logo" className="h-12 w-auto mr-3" />
            <span className="text-lg font-extrabold text-green-700">Yare Farm</span>
          </div>

          {/* Desktop Navigation with White Background */}
          <div className="hidden md:flex space-x-4">
            <a href="#home" className="px-4 py-2 font-bold text-green-700 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              Home
            </a>
            <a href="#about" className="px-4 py-2 font-bold text-green-700 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              About Us
            </a>
            <a href="#services" className="px-4 py-2 font-bold text-green-700 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              Our Services
            </a>
            <a href="#products" className="px-4 py-2 font-bold text-green-700 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              Products
            </a>
            <a href="#contact" className="px-4 py-2 font-bold text-green-700 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              Contact
            </a>
            <a href="#blog" className="px-4 py-2 font-bold text-green-700 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white transition">
              Blog
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className={`w-6 h-6 text-green-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu (Fixed) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[1000] transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="absolute top-4 right-4 text-green-700 text-2xl font-bold" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <div className="flex flex-col mt-16 space-y-4 p-6">
          <a href="#home" className="cursor-pointer text-green-700 text-lg font-extrabold bg-white border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            Home
          </a>
          <a href="#about" className="cursor-pointer text-green-700 text-lg font-extrabold bg-white border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            About Us
          </a>
          <a href="#services" className="cursor-pointer text-green-700 text-lg font-extrabold bg-white border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            Our Services
          </a>
          <a href="#products" className="cursor-pointer text-green-700 text-lg font-extrabold bg-white border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            Products
          </a>
          <a href="#contact" className="cursor-pointer text-green-700 text-lg font-extrabold bg-white border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            Contact
          </a>
          <a href="#blog" className="cursor-pointer text-green-700 text-lg font-extrabold bg-white border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            Blog
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
