import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const slides = [
    { id: 1, image: "/images/slide1.jpg", text: "We Are A Certified Hatchery And Abattoir" },
    { id: 2, image: "/images/chickens.jpg", text: "Nutritious and Fresh Kienyeji Chickens" },
    { id: 3, image: "/images/eggs.jpg", text: "Buy Your Eggs From A Reputable Hatchery" },
    { id: 4, image: "/images/chicks.jpeg", text: "Buy Your Chicks From A Licensed Hatchery" },
    { id: 5, image: "/images/slide5.jpeg", text: "Sustainable Organic Poultry Farming" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      
      <div 
        className="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
              
             
              {currentSlide === 0 && (
                <h2 className="text-3xl sm:text-4xl font-semibold uppercase tracking-wide text-yellow-400 mb-2">
                  Welcome to Yare Farms
                </h2>
              )}
              
              
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 max-w-xs sm:max-w-lg">
                {slide.text}
              </h1>
              
              
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
                <Link 
                  to="/products" 
                  style={{ backgroundColor: '#FF8C00' }} 
                  className="hover:bg-orange-600 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg rounded"
                >
                  Our Products
                </Link>

                <Link 
                  to="/contact" 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg rounded"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <button 
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))} 
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 sm:p-4 rounded-full text-white hover:bg-gray-900 transition"
      >
        <FaArrowLeft size={20} sm:size={28} />
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} 
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 sm:p-4 rounded-full text-white hover:bg-gray-900 transition"
      >
        <FaArrowRight size={20} sm:size={28} />
      </button>
    </div>
  );
};

export default Hero;
