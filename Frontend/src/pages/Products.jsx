import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Day Old Improved Kienyeji Chicks", price: 110, image: "/images/1.jpg" },
  { id: 2, name: "Week Old Improved Kienyeji Chicks", price: 130, image: "/images/2.png" },
  { id: 3, name: "Two Weeks Old Improved Kienyeji Chicks", price: 160, image: "/images/4.jpg" },
  { id: 4, name: "Three Weeks Old Improved Kienyeji Chicks", price: 190, image: "/images/3.jpg" },
  { id: 5, name: "Month Old Improved Kienyeji Chicks", price: 250, image: "/images/month.jpeg" },
  { id: 6, name: "Fertilized Kienyeji Eggs", price: 900, image: "/images/egg.jpg" },
  { id: 7, name: "Cockerels (2kg & Above)", price: 1300, image: "/images/cockerel2.jpg" },
  { id: 8, name: "Ex-Layers", price: 400, image: "/images/exlayers.jpeg" },
  { id: 9, name: "Broilers (1.2kg - 1.3kg)", price: 500, image: "/images/broilers.jpg" },
  { id: 10, name: "Fresh Kienyeji Eggs", price: 600, image: "/images/eggs.jpg" },
  { id: 11, name: "Layers Eggs", price: 370, image: "/images/layersegg.jpg" },
  { id: 12, name: "Manure (50kg Bag)", price: 400, image: "/images/manure.jpg" },
  { 
    id: 13, 
    name: "Drinkers", 
    description: "Various sizes of poultry drinkers.", 
    image: "/images/drinker1.jpeg",
    variants: [
      { size: "7L", price: 340 },
      { size: "3.5L", price: 280 },
      { size: "1L", price: 150 }
    ]
  },
  { 
    id: 14, 
    name: "Drinkers", 
    description: "Various sizes of poultry drinkers.", 
    image: "/images/drinker2.jpeg",
    variants: [
      { size: "6L", price: 330 },
      { size: "3L", price: 230 },
      { size: "1.5L", price: 140 },
      { size: "1L", price: 140 }
    ]
  },
  { 
    id: 15, 
    name: "Feeders", 
    description: "Various sizes of poultry Feeders.", 
    image: "/images/feeder1.jpeg",
    variants: [
      { size: "12Kg", price: 860 },
      { size: "5KGL", price: 680 },
      { size: "7KG", price: 580 },
      { size: "4KG", price: 430 }
    ]
  },
  { 
    id: 16, 
    name: "Feeders", 
    description: "Various shapes of poultry Feeders.", 
    image: "/images/shapes.jpeg",
    variants: [
      { size: "Rectangular", price: 860 },
      { size: "Round Big", price: 680 },
      { size: "Round Small", price: 580 },
      
    ]
  },
  { 
    id: 17, 
    name: "Feeders", 
    description: "Different sizes of poultry feeders.", 
    image: "/images/feeder2.jpeg",
    variants: [
      { size: "10kg", price: 560 },
      { size: "6kg", price: 420 },
      { size: "3kg", price: 270 },
      { size: "1.5kg", price: 160 }
    ]
  },
 
];

const Products = () => {
  return (
    <div className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        <span style={{ color: "#FF8C00" }}>Our</span> <span className="text-green-600">Products</span>
      </h2>
      <div className="mt-2 flex justify-center">
        <span className="h-1 w-16 bg-green-600"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white border rounded-lg shadow-md w-72 h-auto mx-auto flex flex-col justify-between items-center text-center p-4 hover:shadow-lg transition"
          >
            <div className="w-40 h-24 mb-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
            </div>
            
            <h3 className="text-md font-bold text-green-700">{product.name}</h3>
            <p className="text-gray-600 text-sm flex-grow">{product.description}</p>

            {product.variants ? (
              <ul className="text-gray-800 font-semibold">
                {product.variants.map((variant, index) => (
                  <li key={index}>{variant.size}: {variant.price} KSH</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800 font-semibold">Price: {product.price} KSH</p>
            )}

            <Link to={`/product/${product.id}`} className="mt-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
