import React, { useState } from "react";
import BlurText from "./BlurText";
import SplashCursor from "./SplashCursor"; // Assuming you still want this

// BookingModal.jsx
const BookingModal = ({ onClose }) => {
    return (
        <div className=" fixed inset-0 backdrop-blur-sm overflow-y-auto bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Please register fast!</h3>
                <p className="text-gray-600 mb-6 text-center">Don't miss out on our services. Register now to secure your spot.</p>
                <button
                    onClick={onClose}
                    className="cursor-pointer w-full bg-[#002570] text-white py-3 rounded-full font-semibold hover:bg-[#001c5a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#002570] focus:ring-opacity-50 active:scale-98"
                >
                    OK
                </button>
            </div>
            {/* Simple animation for the modal */}
            <style jsx>{`
                @keyframes scaleIn {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
                }
            `}</style>
        </div>
    );
};

// Hero.jsx (Updated)
const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBookingClick = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="hero-area w-full h-[710px] bg-[#002570] flex items-center justify-start rounded-b-[300px] px-23 ">
                {/* <SplashCursor /> */}
                <div className="hero-content flex flex-wrap justify-between items-center w-full px-10 mt-[-50px]">
                    <div className="hero-left max-w-xl pt-20">
                        {/* ✅ Animated Heading with BlurText */}
                        <BlurText
                            text="Best caring, Better Doctors"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-6xl md:text-7xl text-white font-bold  leading-tight"
                        />

                        {/* ✅ Static paragraph or optionally replace with BlurText too */}
                        <p className="text-lg md:text-xl text-white py-6 animate-fadeInUp animate-delay-200">
                            We have the most powerful Doctors, Vaccination,
                            and Treatments all over the world. We treat you like a friend
                            and serve properly.
                        </p>

                        <div className="mt-4">
                            <a
                                href="#" // Changed to # since we're handling with JS
                                onClick={handleBookingClick}
                                className="text-lg bg-white px-8 py-2 ml-2 rounded-full font-semibold text-black shadow-md hover:bg-gray-100 transition"
                            >
                                Booking
                            </a>
                        </div>
                    </div>

                    <div className="hero-right hidden md:block pt-20">
                        <img src="/src/assets/img.png" alt="Doctor" className="w-[400px]" />
                    </div>
                </div>
            </div>

            {/* Render the modal conditionally */}
            {isModalOpen && <BookingModal onClose={handleCloseModal} />}

            {/* Optional: Keep fadeInUp keyframe if subtitle uses it */}
            <style>
                {`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
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

export default Hero;