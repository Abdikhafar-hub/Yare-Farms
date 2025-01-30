import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const slides = [
    { id: 1, image: "src/assets/images/slide1.jpg", text: "We Are A Certified Hatchery And Abattoir" },
    { id: 2, image: "src/assets/images/chickens.jpg", text: "Nutritious and Fresh Kienyeji Chickens" },
    { id: 3, image: "src/assets/images/eggs.jpg", text: "Buy Your Eggs From A Reputable Hatchery" },
    { id: 4, image: "src/assets/images/chicks.jpeg", text: "Buy Your Chicks From A Licensed Hatchery" },
    { id: 5, image: "src/assets/images/slide5.jpeg", text: "Sustainable Organic Poultry Farming" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              
              {/* Subtitle (Welcome to Yare Farms) - Only on the first slide */}
              {currentSlide === 0 && (
                <h2 className="text-4xl font-semibold uppercase tracking-wide text-yellow-400 mb-2">
                  Welcome to Yare Farms
                </h2>
              )}
              
              {/* Main Title (Slide Text) */}
              <h1 className="text-7xl font-extrabold mb-6">
                {slide.text}
              </h1>
              
              {/* CTA Buttons */}
              <div className="mt-6 flex space-x-6">
                <Link to="/products" style={{ backgroundColor: '#FF8C00' }} className="hover:bg-orange-600 text-white font-bold py-3 px-6 text-lg rounded">
                  Our Products
                </Link>

                <Link to="/contact" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 text-lg rounded">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-4 rounded-full text-white hover:bg-gray-900 transition">
        <FaArrowLeft size={28} />
      </button>
      <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-4 rounded-full text-white hover:bg-gray-900 transition">
        <FaArrowRight size={28} />
      </button>
    </div>
  );
};

export default Hero;
