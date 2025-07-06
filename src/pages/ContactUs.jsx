import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className=" bg-[#e1eefe] to-purple-50 py-20 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Contact Info */}
        <div className="space-y-8 animate-fadeInUp">
          <h2 className="text-4xl font-extrabold text-indigo-800">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            Have a question, concern, or just want to say hello? We'd love to hear from you. Reach out to us and we'll respond as soon as we can.
          </p>

          <div className="space-y-4 text-gray-700 text-md">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-indigo-600 text-xl" />
              <span>+880 1234 567 890</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <span>support@medico.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-indigo-600 text-xl" />
              <span>123 Medico Street, Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 pt-4">
            <a
              href="#"
              className="bg-indigo-100 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-indigo-100 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-indigo-100 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200 animate-fadeInUp animate-delay-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="put your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Custom animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
};

export default ContactUs;
