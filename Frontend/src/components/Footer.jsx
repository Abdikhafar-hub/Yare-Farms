import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center md:text-left text-xs md:text-sm flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        
        {/* Logo & About */}
        <div className="space-y-2">
          <img src="/images/logo2.png" alt="Poultry Farm Logo" className="w-24 h-auto mx-auto md:mx-0" />
          <p className="text-gray-400">
            High-quality poultry services ensuring healthy bird growth in a disease-free environment.
          </p>
          <div className="flex justify-center md:justify-start space-x-3 text-sm">
            <a href="https://web.facebook.com/profile.php?id=61573552649251" className="text-blue-600 hover:text-blue-800"><i className="fab fa-facebook"></i></a>
            <a href="https://x.com/Yarefarmer" className="text-black dark:text-gray-300 hover:text-gray-700"><i className="fab fa-twitter"></i></a>
            <a href="https://www.tiktok.com/@yare.farm.ltd" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-300 hover:text-gray-700"><i className="fab fa-tiktok"></i></a>
            <a href="mailto:yarefarm@gmail.com" className="text-red-500 hover:text-red-700"><i className="fas fa-envelope"></i></a>
            <a href="#" className="text-pink-500 hover:text-pink-700"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-2">
          <h3 className="font-semibold text-green-500">Services</h3>
          <ul className="text-gray-400 space-y-1">
            <li>🐣 Chicks Delivery</li>
            <li>🥚 Eggs & Layers</li>
            <li>🛠️ Incubation</li>
            <li>🌱 Manure</li>
            <li>📞 Consulting</li>
            <li>🥄 Poultry Equipment</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-green-500">Contact</h3>
          <ul className="text-gray-400 space-y-1">
            <li><i className="fas fa-map-marker-alt"></i> Nakuru Town, Mzee Wanyama Rd near Jimmia Women Centre</li>
            <li><i className="fas fa-phone-alt"></i> <a href="tel:+254715505444" className="hover:underline text-gray-300">+254 715 505 444</a></li>
            <li><i className="fas fa-envelope"></i> <a href="mailto:info@yarefarm.com" className="hover:underline text-gray-300">info@yarefarm.com</a></li>
            <li><i className="fas fa-clock"></i> Daily - 9 AM to 5 PM</li>
          </ul>
        </div>
      </div>

      {/* Divider for Mobile */}
      <div className="border-t border-gray-700 my-4 mx-6"></div>

      {/* Copyright & Credit */}
      <div className="text-center text-gray-400 text-xs">
        &copy; 2025 <span className="text-green-400">Yare Farm</span>. All Rights Reserved.
        <div className="flex justify-center items-center space-x-1 mt-2">
          <span>Made</span>  <span>by</span>
          <a href="https://wa.me/254717219448" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline font-bold">Abdikhafar Issack</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
