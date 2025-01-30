import React from "react";

const Products = () => {
  const products = [
    { id: 1, name: "Day Old Improved Kienyeji Chicks", description: "Healthy and robust day-old chicks.", image: "/images/1.jpg" },
    { id: 2, name: "Week Old Improved Kienyeji Chicks", description: "Week-old chicks ready for your farm.", image: "/images/2.png" },
    { id: 3, name: "Two Weeks Old Improved Kienyeji Chicks", description: "Two-week-old chicks, growing strong.", image: "/images/4.jpg" }, // Fixed file name
    { id: 4, name: "Three Weeks Old Improved Kienyeji Chicks", description: "Three-week-old chicks, almost ready for the field.", image: "/images/3.jpg" },
    { id: 5, name: "Cockerels", description: "Young male chickens for breeding or meat.", image: "/images/cockerel2.jpg" },
    { id: 6, name: "Laying Hens", description: "Productive hens for egg production.", image: "/images/hen.jpg" },
    { id: 7, name: "Fertilized Kienyeji Eggs", description: "High-quality fertilized eggs for hatching.", image: "/images/egg.jpg" },
    { id: 8, name: "Fresh Kienyeji Eggs", description: "Fresh eggs for consumption.", image: "/images/eggs.jpg" }, // Fixed file name
    { id: 9, name: "Layers Eggs", description: "Eggs from our best laying hens.", image: "/images/layersegg.jpg" },
    { id: 10, name: "Ex-Layers", description: "Retired laying hens, great for meat.", image: "/images/exlayers.jpeg" },
    { id: 11, name: "Broilers", description: "Fast-growing chickens for meat production.", image: "/images/broilers.jpg" },
    { id: 12, name: "Manure", description: "Organic fertilizer from our poultry.", image: "/images/manure.jpg" },
  ];

  return (
    <div className="py-12 bg-white text-center">
      {/* Section Title with Color Adjustment */}
      <h2 className="text-3xl font-bold mb-4">
        <span style={{ color: "#FF8C00" }}>Our</span> <span className="text-green-600">Products</span>
      </h2>
      <div className="mt-2 flex justify-center">
        <span className="h-1 w-16 bg-green-600"></span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white border rounded-lg shadow-md w-72 h-56 mx-auto flex flex-col justify-start items-center text-center p-4 hover:shadow-lg transition"
          >
            {/* Rectangular Product Image */}
            <div className="w-40 h-24 mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            {/* Product Name & Description */}
            <h3 className="text-md font-bold text-green-700">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
