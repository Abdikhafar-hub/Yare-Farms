import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and Description */}
        <div className="space-y-4">
          <img src="/images/logo2.png" alt="Poultry Farm Logo" className="w-40 h-auto" />
          <p className="text-gray-400 text-sm">
            Yare Farm is committed to delivering high-quality services and products in poultry farming, ensuring your birds grow healthy and thrive in a disease-free environment.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            <span style={{ color: "#FF8C00" }}>Our</span> <span className="text-green-600">Services</span>
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Chicks Delivery</li>
            <li>Layers Eggs, Broilers, Cockerels, Fresh and Fertilized Kienyeji Eggs, Laying Hens, Ex-Layers.</li>
            <li>Incubation Service</li>
            <li>Manure</li>
            <li>Poultry Consulting Services</li>
            <li>Poultry Equipments: Drinkers, Feeders etc</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            <span style={{ color: "#FF8C00" }}>Contact</span> <span className="text-green-600">Us</span>
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li><i className="fas fa-map-marker-alt"></i> Baruti East, Nakuru West</li>
            <li><i className="fas fa-phone-alt"></i> 0715505444</li>
            <li><i className="fas fa-envelope"></i> info@yarefarm.com</li>
            <li><i className="fas fa-clock"></i> Everyday - 9am until 5pm</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-8 text-sm">
        &copy; 2025 <span className="text-green-400">Yare Farm</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
