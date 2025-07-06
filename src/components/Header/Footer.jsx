import React from 'react';
import { FaHeartbeat, FaFacebook, FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-10 md:py-16 shadow-inner">
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="md:flex md:justify-between md:items-start mb-10">
          {/* Logo and Brand Name */}
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#" className="flex items-center group">
              <FaHeartbeat className="h-10 w-10 me-3 text-white group-hover:text-red-300 transition-colors duration-300 transform group-hover:scale-110" />
              <span className="self-center text-4xl font-extrabold whitespace-nowrap text-white group-hover:text-blue-200 transition-colors duration-300">
                Medico
              </span>
            </a>
            <p className="mt-4 text-sm text-blue-100 max-w-xs">
              Your trusted partner in modern healthcare. Providing expert care and innovative solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3 text-center md:text-left">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-blue-100 tracking-wide">Resources</h2>
              <ul className="text-blue-200 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Medical</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Vaccination</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Appointments</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-blue-100 tracking-wide">Follow us</h2>
              <ul className="text-blue-200 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Github</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Discord</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">LinkedIn</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-blue-100 tracking-wide">Legal</h2>
              <ul className="text-blue-200 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors duration-200">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-blue-400 sm:mx-auto lg:my-10" />

        {/* Copyright and Social Icons */}
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row text-center">
          <span className="text-sm text-blue-200 sm:text-center mb-4 sm:mb-0">
            © {new Date().getFullYear()} <a href="#" className="hover:underline font-semibold">Medico™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-6">
            <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-125">
              <FaFacebook className="w-6 h-6" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-125">
              <FaTwitter className="w-6 h-6" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-125">
              <FaInstagram className="w-6 h-6" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-125">
              <FaGithub className="w-6 h-6" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-125">
              <FaDiscord className="w-6 h-6" />
              <span className="sr-only">Discord community</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
