import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
    { id: 1, name: "Day Old Improved Kienyeji Chicks", price: 110, image: "/images/1.jpg" },
    { id: 2, name: "Week Old Improved Kienyeji Chicks", price: 130, image: "/images/2.png" },
    { id: 3, name: "Two Weeks Old Improved Kienyeji Chicks", price: 160, image: "/images/4.jpg" },
    { id: 4, name: "Three Weeks Old Improved Kienyeji Chicks", price: 190, image: "/images/3.jpg" },
    { id: 5, name: "Month Old Improved Kienyeji Chicks", price: 250, image: "/images/month.jepg" },
    { id: 6, name: "Fertilized Kienyeji Eggs", price: 900, image: "/images/egg.jpg" },
    { id: 7, name: "Cockerels (2kg & Above)", price: 1300, image: "/images/cockerel2.jpg" },
    { id: 8, name: "Ex-Layers", price: 400, image: "/images/exlayers.jpeg" },
    { id: 9, name: "Broilers (1.2kg - 1.3kg)", price: 500, image: "/images/broilers.jpg" },
    { id: 10, name: "Fresh Kienyeji Eggs", price: 600, image: "/images/eggs.jpg" },
    { id: 11, name: "Layers Eggs", price: 370, image: "/images/layersegg.jpg" },
    { id: 12, name: "Manure (50kg Bag)", price: 400, image: "/images/manure.jpg" }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  
  const cartItem = cart.find((item) => item.id === product?.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  if (!product) return <p className="text-center text-red-600">Product not found!</p>;

  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value >= 1 ? value : 1); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8 flex flex-col items-center text-center">
        <img src={product.image} alt={product.name} className="w-80 h-80 object-cover rounded-lg mb-6" />
        <h2 className="text-2xl font-bold text-green-700">{product.name}</h2>
        <p className="text-gray-600 text-lg">Price: {product.price} KSH</p>

        
        <div className="flex items-center mt-4 border rounded-lg">
          <button 
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="bg-red-500 text-white px-3 py-1 rounded-l-md hover:bg-red-600"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center border-none outline-none px-2 py-1"
            min="1"
          />
          <button 
            onClick={() => setQuantity((prev) => prev + 1)}
            className="bg-green-500 text-white px-3 py-1 rounded-r-md hover:bg-green-600"
          >
            +
          </button>
        </div>

        
        <button
          onClick={() => addToCart({ ...product, quantity })}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full"
        >
          Add to Cart
        </button>

        
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
