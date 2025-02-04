import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="contact" className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-7xl gap-16">
        {/* Contact Info */}
        <div className="md:w-5/12 p-8 text-center md:text-left bg-gray-100 rounded-lg shadow-md md:mb-0 mb-8">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Contact</span>
          <h2 className="text-2xl font-bold mt-2">Contact Us</h2>
          <p className="text-gray-600">Get in touch with us</p>

          <div className="mt-6 space-y-4">
            <p className="flex items-center">
              <FaMapMarkerAlt className="text-green-600 mr-2" />
              Nakuru County, Nakuru Town, along Mzee Wanyama Road, near Jimmia Women Centre
            </p>
            <p className="flex items-center">
              <FaEnvelope className="text-green-600 mr-2" />
              yarefarm@gmail.com
            </p>
            <p className="flex items-center">
              <FaPhone className="text-green-600 mr-2" />
              0757800700 or 0715505444
            </p>
            <p className="flex items-center">
              <FaWhatsapp className="text-green-600 mr-2" />
              0715505444 or 0757800700
            </p>
          </div>
        </div>

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

      {/* Google Maps Embed */}
      <div className="w-full max-w-5xl mt-12">
        {isClient && (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.741232680641!2d36.14584358752995!3d-0.35616743437555426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182991f43b23a9f5%3A0xc086f1f8e6ec783e!2sJimmia%20Women%20Rescue%20Centre!5e0!3m2!1sen!2ske!4v1738700505389!5m2!1sen!2ske"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Contact;
