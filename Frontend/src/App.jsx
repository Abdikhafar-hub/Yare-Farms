import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";  
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage"; 
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Invoice from "./pages/Invoice";

function App() {
  // Simulating user authentication (Replace with real authentication logic)
  const [user, setUser] = useState({
    isAdmin: true, // Change to false to test restricted access
  });

  // Protect the Invoice Route (Only for Admins)
  const AdminRoute = ({ children }) => {
    return user?.isAdmin ? children : <Navigate to="/login" />;
  };

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ourservices" element={<Services />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} /> {/* Cart Page Route */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Admin Only Route */}
          <Route path="/invoice" element={<AdminRoute><Invoice /></AdminRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
