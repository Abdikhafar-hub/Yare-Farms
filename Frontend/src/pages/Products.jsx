import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Day Old Improved Kienyeji Chicks", description: "Healthy and robust day-old chicks.", price: 110, image: "/images/1.jpg" },
  { id: 2, name: "Week Old Improved Kienyeji Chicks", description: "Week-old chicks ready for your farm.", price: 130, image: "/images/2.png" },
  { id: 3, name: "Two Weeks Old Improved Kienyeji Chicks", description: "Two-week-old chicks, growing strong.", price: 160, image: "/images/4.jpg" },
  { id: 4, name: "Three Weeks Old Improved Kienyeji Chicks", description: "Three-week-old chicks, almost ready for the field.", price: 190, image: "/images/3.jpg" },
  { id: 5, name: "Month Old Improved Kienyeji Chicks", description: "One-month-old chicks, fully feathered.", price: 250, image: "/images/month.jpeg" },
  { id: 6, name: "Fertilized Kienyeji Eggs", description: "High-quality fertilized eggs for hatching. Per tray", price: 900, image: "/images/egg.jpg" },
  { id: 7, name: "Cockerels", description: "Young male chickens for breeding or meat.", price: 1300, image: "/images/cockerel2.jpg" },
  { id: 8, name: "Ex-Layers", description: "Retired laying hens, great for meat.", price: 400, image: "/images/exlayers.jpeg" },
  { id: 9, name: "Broilers", description: "Fast-growing chickens for meat production.", price: 500, image: "/images/broilers.jpg" },
  { id: 10, name: "Fresh Kienyeji Eggs", description: "Fresh eggs for consumption. Per tray", price: 600, image: "/images/eggs.jpg" },
  { id: 11, name: "Layers Eggs", description: "Eggs from our best laying hens.  Per tray", price: 370, image: "/images/layersegg.jpg" },
  { id: 12, name: "Manure", description: "Organic fertilizer from our poultry.  50KG bag", price: 400, image: "/images/manure.jpg" },
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
            className="bg-white border rounded-lg shadow-md w-72 h-[340px] mx-auto flex flex-col justify-between items-center text-center p-4 hover:shadow-lg transition"
          >
            
            <div className="w-40 h-24 mb-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
            </div>

            
            <h3 className="text-md font-bold text-green-700">{product.name}</h3>
            <p className="text-gray-600 text-sm flex-grow">{product.description}</p>
            <p className="text-gray-800 font-semibold">Price: {product.price} KSH</p>

            
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
