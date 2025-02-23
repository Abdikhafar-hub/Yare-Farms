import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  { id: 1, name: "Abdikhafar Issack", comment: "I have been purchasing poultry products from Yare Farms for over a year now, and I must say the quality is unmatched! The chickens are always healthy, and the eggs are fresh. The customer service is also exceptional—they respond quickly and ensure timely deliveries. I highly recommend Yare Farms to anyone looking for reliable poultry products!", image: "/images/abdikhafar.jpeg", },
  { id: 2, name: "Jamal", comment: "Honestly Yare Farms has completely transformed my experience with poultry farming. Their expert advice and top-quality feed have significantly improved my farm's productivity. What I love most is their honesty and commitment to delivering the best. They genuinely care about customer satisfaction!", image: "/images/jamal.jpeg",  },
  { id: 3, name: "John Doe", comment: "Finding a trustworthy poultry supplier was a challenge until I discovered Yare Farms. Their organic and ethically raised chickens have made a huge difference in my restaurant’s menu. My customers love the taste, and I appreciate the transparency in their farming practices. Thank you, Yare Farms, for your dedication to quality!", image: "/images/ai.png", },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
      
      <h2 className="text-center text-lg md:text-2xl font-bold mb-4 md:mb-6">
        <span className="text-green-600">Customer</span>{" "}
        <span style={{ color: "#FF8C00" }}>Feedback</span>
      </h2>

      <div className="relative flex items-center">
        
        <button
          className="absolute left-2 z-10 bg-gray-200 p-1 md:p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={prevSlide}
        >
          <FaChevronLeft size={18} className="md:size-24" />
        </button>

        
        <div className="flex justify-center w-full overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex flex-col items-center text-center transition-opacity duration-500 px-2 ${index === currentIndex ? "opacity-100" : "opacity-0 absolute"}`}
            >
              <span className="text-2xl md:text-4xl text-gray-300">“</span>
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300 mb-1 md:mb-2" />
              <p className="text-gray-700 italic text-xs md:text-sm px-2">{testimonial.comment}</p>
              <p className="mt-2 md:mt-4 text-blue-600 font-semibold text-sm md:text-base">{testimonial.name}</p>
            </div>
          ))}
        </div>

        
        <button
          className="absolute right-2 z-10 bg-gray-200 p-1 md:p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={nextSlide}
        >
          <FaChevronRight size={18} className="md:size-24" />
        </button>
      </div>

      
      <div className="flex justify-center mt-3 md:mt-4">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 mx-1 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
