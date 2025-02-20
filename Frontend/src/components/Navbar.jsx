import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  const handleNavigation = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false);
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  };

  const handleAdminAccess = () => {
    setShowAdminModal(true);
  };

  const verifyAdminPassword = () => {
    const correctPassword = "secureAdmin123";
    if (adminPassword === correctPassword) {
      setShowAdminModal(false);
      setIsOpen(false); // Close the navigation menu
      navigate("/invoice");
    } else {
      alert("❌ Only admins can generate invoices!");
    }
  };

  const handleAuthClick = () => {
    if (userToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUserToken(null);
      alert("✅ Logged out successfully!");
      navigate("/");
    } else {
      navigate("/login");
    }
    setShowProfileModal(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"
      }`}>
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src="/images/logo2.png" alt="Yare Farm Logo" className="h-12 w-auto mr-3" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {["home", "about", "services", "products", "contact", "blog"].map((item) => (
              <button key={item} onClick={() => handleNavigation(item)} className="nav-link">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <button onClick={handleAdminAccess} className="nav-link bg-green-600 text-white">Generate Invoice</button>
          </div>

          {/* Cart and Profile Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-green-700 hover:text-green-800 flex items-center">
              <i className="fas fa-shopping-cart text-2xl"></i>
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">{cart.length}</span>}
            </Link>
            <button onClick={() => setShowProfileModal(true)} className="relative flex items-center text-green-700 hover:text-green-800">
              <i className="fas fa-user-circle text-2xl"></i>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-green-700 hover:text-green-800 p-2">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
            {["home", "about", "services", "products", "contact", "blog"].map((item) => (
              <button key={item} onClick={() => handleNavigation(item)} className="nav-link w-full text-center">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <button onClick={handleAdminAccess} className="nav-link bg-green-600 text-white">Generate Invoice</button>
          </div>
        )}
      </nav>

      {/* Admin Password Modal */}
      {showAdminModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Admin Access</h2>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button onClick={verifyAdminPassword}>Submit</button>
            <button onClick={() => setShowAdminModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Profile</h2>
            <button onClick={handleAuthClick}>{userToken ? "Logout" : "Login"}</button>
            <button onClick={() => setShowProfileModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>
        {`
        .nav-link {
          cursor: pointer;
          padding: 10px 15px;
          font-weight: bold;
          color: #047857;
          border: 2px solid #047857;
          border-radius: 8px;
          background: white;
          transition: all 0.3s ease-in-out;
        }
        .nav-link:hover {
          background: #047857;
          color: white;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
          animation: fadeIn 0.3s ease-in-out;
        }
        .modal-content {
          background: white;
          padding: 25px;
          width: 90%;
          max-width: 400px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.3s ease-in-out;
        }
        .modal-content h2 {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }
        .modal-content input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          text-align: center;
          outline: none;
          transition: border 0.3s ease-in-out;
        }
        .modal-content input:focus {
          border-color: #007bff;
        }
        .modal-content button {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease-in-out;
        }
        .modal-content button:first-of-type {
          background: #007bff;
          color: white;
        }
        .modal-content button:first-of-type:hover {
          background: #0056b3;
        }
        .modal-content button:nth-of-type(2) {
          background: #dc3545;
          color: white;
        }
        .modal-content button:nth-of-type(2):hover {
          background: #b52a37;
        }
        .modal-content button:nth-of-type(3) {
          background: #28a745;
          color: white;
        }
        .modal-content button:nth-of-type(3):hover {
          background: #218838;
        }
        .modal-content button:last-of-type {
          background: #6c757d;
          color: white;
        }
        .modal-content button:last-of-type:hover {
          background: #5a6268;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
          }
          to {
            transform: translateY(0);
          }
        }
        `}
      </style>
    </>
  );
};

export default Navbar;