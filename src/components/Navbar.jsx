import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-custom-green p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Poultry Farm</div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>
          <a href="/" className="text-white px-4 py-2 block">Home</a>
          <a href="/about" className="text-white px-4 py-2 block">About Us</a>
          <a href="/services" className="text-white px-4 py-2 block">Our Services</a>
          <a href="/products" className="text-white px-4 py-2 block">Products</a>
          <a href="/contact" className="text-white px-4 py-2 block">Contact</a>
          <a href="/gallery" className="text-white px-4 py-2 block">Gallery</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;