import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userToken, setUserToken] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  const handlePayment = async () => {
    if (!userToken) {
      alert("🚫 You must be logged in to make a payment!");
      navigate("/login");
      return;
    }

    setLoading(true); // Show loading spinner
    setPaymentStatus(null);

    try {
      const response = await axios.post(
        "https://yare-farms.onrender.com/pay",
        { phoneNumber, totalPrice },
        {
          headers: { 
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPaymentStatus("promptSent"); // Show "Enter PIN" modal
      } else {
        throw new Error("Payment initiation failed");
      }
    } catch (error) {
      console.error("❌ Payment failed:", error.response?.data || error.message);
      alert("🚫 Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-700">Shopping Cart</h2>
        <p className="text-gray-600 text-md text-center mt-2">
          🚚 Delivery available countrywide at customer cost, or pick up at a central location.
        </p>

        {cart.length === 0 ? (
          <p className="text-gray-600 mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b py-4">
                <div className="w-1/2">
                  <h3 className="font-bold text-gray-800">
                    {item.name} {item.size ? `(${item.size})` : ""}
                  </h3>
                  <p className="text-gray-600">
                    {item.price} KSH x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center border rounded-lg">
                  <button onClick={() => decreaseQuantity(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-l-md hover:bg-red-600">
                    -
                  </button>
                  <span className="px-4 py-1 text-center text-gray-800">
                    {item.quantity}
                  </span>
                  <button onClick={() => increaseQuantity(item.id)} className="bg-green-500 text-white px-3 py-1 rounded-r-md hover:bg-green-600">
                    +
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="text-red-600 ml-4 flex items-center">
                  🗑 <span className="ml-1">Remove</span>
                </button>
              </div>
            ))}

            <h3 className="text-lg font-bold mt-4">Total: {totalPrice} KSH</h3>

            {userToken ? (
              <button onClick={() => setShowModal(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">
                Make Payment (M-Pesa)
              </button>
            ) : (
              <button onClick={() => navigate("/login")} className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md w-full">
                🔒 Log in to Make Payment
              </button>
            )}

            <button onClick={() => navigate("/products")} className="mt-2 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 w-full flex items-center justify-center">
              🛒 Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Modal for Entering Phone Number */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Enter Phone Number</h3>
            <input
              type="text"
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="mt-3 font-semibold">Amount: {totalPrice} KSH</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                {loading && <span className="animate-spin mr-2">🔄</span>} Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Enter PIN */}
      {paymentStatus === "promptSent" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Prompt Sent</h3>
            <p className="text-gray-600">A payment request has been sent to <strong>{phoneNumber}</strong>.</p>
            <p className="text-gray-600">Enter your M-Pesa PIN to complete the transaction.</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setPaymentStatus(null)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Payment Success */}
      {paymentStatus === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold text-green-600">Payment Successful 🎉</h3>
            <p className="text-gray-600">Thank you for your payment!</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => { setPaymentStatus(null); setShowModal(false); }} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
