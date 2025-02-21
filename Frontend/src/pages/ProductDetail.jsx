import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Day Old Improved Kienyeji Chicks", price: 120, image: "/images/1.jpg" },
  { id: 2, name: "Week Old Improved Kienyeji Chicks", price: 150, image: "/images/2.png" },
  { id: 3, name: "Two Weeks Old Improved Kienyeji Chicks", price: 180, image: "/images/4.jpg" },
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
      { size: "7L", price: 380 },
      { size: "3.5L", price: 300 },
      { size: "1L", price: 160 }
    ]
  },
  { 
    id: 14, 
    name: "Drinkers", 
    description: "Various sizes of poultry drinkers.", 
    image: "/images/drinker2.jpeg",
    variants: [
      { size: "6L", price: 350 },
      { size: "3L", price: 250 },
      { size: "1.5L", price: 170 },
      { size: "1L", price: 150 }
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
      { size: "10kg", price: 580 },
      { size: "6kg", price: 460 },
      { size: "3kg", price: 290 },
      { size: "1.5kg", price: 180 }
    ]
  },
 
];


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center text-red-600">Product not found!</p>;

  // ✅ Ensure unique variant selection is handled correctly
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );

  const handleAddToCart = () => {
    if (product.variants && !selectedVariant) {
      alert("Please select a size before adding to cart.");
      return;
    }

    // ✅ Assign unique ID to each variant (product.id + selectedVariant.size)
    addToCart(
      product.variants 
        ? { 
            ...product, 
            id: `${product.id}-${selectedVariant.size}`,  // Unique ID
            price: selectedVariant.price, 
            size: selectedVariant.size, 
            quantity: 1 
          } 
        : { ...product, quantity: 1 }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8 flex flex-col items-center text-center">
        <img src={product.image} alt={product.name} className="w-80 h-80 object-cover rounded-lg mb-6" />
        <h2 className="text-2xl font-bold text-green-700">{product.name}</h2>

        {/* ✅ If product has variants, show selection dropdown */}
        {product.variants ? (
          <div className="mt-4">
            <label className="text-gray-700 font-semibold">Select Size:</label>
            <select 
              className="border p-2 rounded-md ml-2"
              onChange={(e) => setSelectedVariant(product.variants.find(v => v.size === e.target.value))}
            >
              {product.variants.map((variant, index) => (
                <option key={index} value={variant.size}>
                  {variant.size} - {variant.price} KSH
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-gray-600 text-lg">Price: {product.price} KSH</p>
        )}

        {/* ✅ Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full"
        >
          Add to Cart
        </button>

        {/* ✅ Back to Products Button */}
        <button 
          onClick={() => navigate("/products")} 
          className="mt-2 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 w-full"
        >
          🛒 Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
