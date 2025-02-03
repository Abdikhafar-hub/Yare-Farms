import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-700">Shopping Cart</h2>

        {/* Delivery Message */}
        <p className="text-gray-600 text-md text-center mt-2">
          🚚 Delivery available countrywide at customer cost, or pick up at a central location.
        </p>

        {cart.length === 0 ? (
          <p className="text-gray-600 mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                
                {/* Product Name & Price */}
                <div className="w-1/2">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.price} KSH x {item.quantity}</p>
                </div>

                {/* Quantity Controls (Inline Fix) */}
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => decreaseQuantity(item.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-l-md hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-center text-gray-800">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)} 
                    className="bg-green-500 text-white px-3 py-1 rounded-r-md hover:bg-green-600"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 ml-4 flex items-center">
                  🗑 <span className="ml-1">Remove</span>
                </button>
              </div>
            ))}

            {/* Total Price */}
            <h3 className="text-lg font-bold mt-4">Total: {totalPrice} KSH</h3>

            {/* Make Payment Button */}
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">
              Make Payment (M-Pesa)
            </button>

            {/* Continue Shopping Button */}
            <button 
              onClick={() => navigate("/products")} 
              className="mt-2 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 w-full flex items-center justify-center"
            >
              🛒 Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
