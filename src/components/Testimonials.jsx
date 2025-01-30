import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  { id: 1, name: "Abdikhafar Issack", comment: "I have been purchasing poultry products from Yare Farms for over a year now, and I must say the quality is unmatched! The chickens are always healthy, and the eggs are fresh. The customer service is also exceptional—they respond quickly and ensure timely deliveries. I highly recommend Yare Farms to anyone looking for reliable poultry products!", image: "/images/abdikhafar.jpeg", },
  { id: 2, name: "Jamal", comment: "Honestly Yare Farms has completely transformed my experience with poultry farming. Their expert advice and top-quality feed have significantly improved my farm's productivity. What I love most is their honesty and commitment to delivering the best. They genuinely care about customer satisfaction!", image: "/images/jamal.jpeg",  },
  { id: 3, name: "John Doe", comment: "Finding a trustworthy poultry supplier was a challenge until I discovered Yare Farms. Their organic and ethically raised chickens have made a huge difference in my restaurant’s menu. My customers love the taste, and I appreciate the transparency in their farming practices. Thank you, Yare Farms, for your dedication to quality!", image: "/images/ai.png", },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Title with custom colors */}
      <h2 className="text-center text-2xl font-bold mb-6">
        <span className="text-green-600">Customer</span>{" "}
        <span style={{ color: "#FF8C00" }}>Feedback</span>
      </h2>

      <div className="relative flex items-center">
        {/* Left arrow */}
        <button
          className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={prevSlide}
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Testimonials Container */}
        <div className="flex justify-center w-full overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex flex-col items-center text-center transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0 absolute"}`}
            >
              <span className="text-4xl text-gray-300">“</span>
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2" />
              <p className="text-gray-700 italic px-4">{testimonial.comment}</p>
              <p className="mt-4 text-blue-600 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          className="absolute right-0 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={nextSlide}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
