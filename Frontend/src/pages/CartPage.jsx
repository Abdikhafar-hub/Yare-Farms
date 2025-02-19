import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import mpesaLogo from "/images/mpesa.png"; 

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      let token = localStorage.getItem("token");

      if (!token) {
        alert("⚠️ You need to log in before making a payment.");
        navigate("/login");
        return;
      }

      if (!mpesaNumber.match(/^07\d{8}$/)) {
        setErrorMessage("🚫 Enter a valid Kenyan phone number (07XXXXXXXX).");
        setIsProcessing(false);
        return;
      }

      // Convert to M-Pesa format (2547XXXXXXXX)
      const formattedPhoneNumber = `254${mpesaNumber.substring(1)}`;

      const response = await axios.post(
        "https://yare-farms.onrender.com/pay",
        { phoneNumber: formattedPhoneNumber, totalPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Payment initiated successfully.") {
        setIsMpesaModalOpen(false);
        setIsPaymentSuccess(true);
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "❌ Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-700">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b py-4">
                <div className="w-1/2">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.price} KSH x {item.quantity}</p>
                </div>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => decreaseQuantity(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-l-md hover:bg-red-600">-</button>
                  <span className="px-4 py-1 text-center text-gray-800">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="bg-green-500 text-white px-3 py-1 rounded-r-md hover:bg-green-600">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 ml-4 flex items-center">🗑 <span className="ml-1">Remove</span></button>
              </div>
            ))}

            <h3 className="text-lg font-bold mt-4">Total: {totalPrice} KSH</h3>

            <button onClick={() => setIsMpesaModalOpen(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full">
              Pay with M-Pesa
            </button>

            {/* Continue Shopping Button */}
            <button onClick={() => navigate("/products")} className="mt-2 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 w-full flex items-center justify-center">
              🛒 Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isMpesaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex flex-col items-center">
              <img src={mpesaLogo} alt="M-Pesa Logo" className="w-20 mb-4" />
              <h3 className="text-lg font-bold">Enter Phone Number to Pay</h3>
            </div>

            <input
              type="text"
              className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number (07XXXXXXXX)"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value.replace(/[^0-9]/g, ""))}
            />

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

            <p className="mt-3 font-semibold">Amount: {totalPrice} KSH</p>

            {!isProcessing ? (
              <button
                onClick={handlePayment}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full"
              >
                Pay
              </button>
            ) : (
              <div className="flex flex-col items-center mt-4">
                <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
                <p className="text-md font-bold mt-2 text-green-600">Processing Payment...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {isPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold text-center">🛍 Order Processing</h3>
            <p className="text-green-600 text-center font-semibold mt-2">
              Thank you for shopping at Yare Farm!
            </p>
            <p className="text-center text-gray-700 mt-2">
              If your payment is confirmed, our team will begin processing your order.
            </p>

            <div className="flex justify-center mt-4">
            <button
  onClick={() => navigate("/")}
  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
>
  Continue
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
