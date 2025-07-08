import React from "react";
import BlurText from "./BlurText"; 
import SplashCursor from "./SplashCursor";


const Hero = () => {
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
                                href="booking.html"
                                className="text-lg bg-white px-8 py-2 rounded-full font-semibold text-black shadow-md hover:bg-gray-100 transition"
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
