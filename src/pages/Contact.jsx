import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

// BioGex Pharma Coordinates
const center = [-1.2773, 36.8273];

const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  // Fix for SSR: Only render map after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Contact Info & Form */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
        {/* Contact Details */}
        <div className="md:w-1/2 p-6 text-center md:text-left">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">contact</span>
          <h2 className="text-2xl font-bold mt-2">Contact Us</h2>
          <p className="text-gray-600">Get in touch with us</p>

          <div className="mt-4 space-y-3">
            <p className="flex items-center">
              <FaMapMarkerAlt className="text-green-600 mr-2" />
              Office 7, The Close, Ngara Road, Nairobi, Kenya
            </p>
            <p className="flex items-center">
              <FaEnvelope className="text-green-600 mr-2" />
              info@biogexpahrma.com
            </p>
            <p className="flex items-center">
              <FaPhone className="text-green-600 mr-2" />
              +254 748 763980
            </p>
            <p className="flex items-center">
              <FaWhatsapp className="text-green-600 mr-2" />
              +254 748 763980
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <form className="space-y-4">
            <input type="text" placeholder="Your First Name" className="w-full p-3 border rounded-lg focus:outline-none" />
            <input type="text" placeholder="Your Last Name" className="w-full p-3 border rounded-lg focus:outline-none" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg focus:outline-none" />
            <input type="tel" placeholder="Your Phone Number" className="w-full p-3 border rounded-lg focus:outline-none" />
            <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg focus:outline-none h-24"></textarea>
            <button className="w-full bg-green-700 text-white p-3 rounded-lg font-semibold hover:bg-green-800 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* OpenStreetMap with Leaflet */}
      <div className="w-full max-w-4xl mt-8">
        {isClient && (
          <MapContainer center={center} zoom={16} className="w-full h-96 rounded-lg shadow-lg">
            {/* OpenStreetMap Tiles */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker for BioGex Pharma */}
            <Marker position={center}>
              <Popup>
                <strong>BioGex Pharma</strong><br />
                Nairobi, Kenya
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Contact;
