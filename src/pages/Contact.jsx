import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

// BioGex Pharma Coordinates
const center = [-0.357295, 36.147739];

const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  // Fix for SSR: Only render map after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Contact Info & Form with Proper Spacing */}
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-7xl gap-16">
        {/* Contact Details */}
        <div className="md:w-5/12 p-8 text-center md:text-left bg-gray-100 rounded-lg shadow-md md:mb-0 mb-8">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">contact</span>
          <h2 className="text-2xl font-bold mt-2">Contact Us</h2>
          <p className="text-gray-600">Get in touch with us</p>

          <div className="mt-6 space-y-4">
            <p className="flex items-center">
              <FaMapMarkerAlt className="text-green-600 mr-2" />
              Baruti East, Nakuru West, Nakuru County, Kenya
            </p>
            <p className="flex items-center">
              <FaEnvelope className="text-green-600 mr-2" />
              info@yarefarms.com
            </p>
            <p className="flex items-center">
              <FaPhone className="text-green-600 mr-2" />
              +254 715 505 444
            </p>
            <p className="flex items-center">
              <FaWhatsapp className="text-green-600 mr-2" />
              +254 715 505 444
            </p>
          </div>
        </div>

        {/* Contact Form */}
        {/* Contact Form */}
<div className="md:w-7/12 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
  <form className="space-y-4">
    <input type="text" placeholder="Your First Name" className="w-full p-2 border rounded-lg focus:outline-none" />
    <input type="text" placeholder="Your Last Name" className="w-full p-2 border rounded-lg focus:outline-none" />
    <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg focus:outline-none" />
    <input type="tel" placeholder="Your Phone Number" className="w-full p-2 border rounded-lg focus:outline-none" />
    <textarea placeholder="Your Message" className="w-full p-2 border rounded-lg focus:outline-none h-20"></textarea>
    <button className="w-full bg-green-700 text-white p-3 rounded-lg font-semibold hover:bg-green-800 transition">
      Send Message
    </button>
  </form>
</div>

      </div>

      {/* OpenStreetMap with Leaflet */}
      <div className="w-full max-w-5xl mt-12">
        {isClient && (
          <MapContainer center={center} zoom={16} className="w-full h-96 rounded-lg shadow-lg">
            {/* OpenStreetMap Tiles */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker for Yare Farms */}
            <Marker position={center}>
              <Popup>
                <strong>Yare Farms</strong><br />
                Nakuru, Kenya
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Contact;
