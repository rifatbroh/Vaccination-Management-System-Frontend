import React from "react";

const Hero = () => {
    return (
        <div>
            <div className="hero-area w-full h-[710px] bg-[#002570] flex items-center justify-start rounded-b-[300px]">
                {/* Starting hero area */}
                <div className="hero-content flex justify-start w-full gap-15 px-35">
                    <div className="hero-left max-w-lg pt-20">
                        {/* Added animation classes to the h1 */}
                        <p className="text-7xl text-white font-bold animate-fadeInUp">
                            Best caring, <br /> Better Doctors
                        </p>
                        {/* Added animation classes to the p tag with a slight delay */}
                        <p className="text-xl text-white py-10 animate-fadeInUp animate-delay-200">
                            We have the most powerful Doctors, Vaccination,
                            and Treatments all over the world. We treat you like a friend
                            and serve properly.
                        </p>
                        <div className="btn-le">
                            <a
                                href="booking.html"
                                className="text-lg bg-white px-8 py-2 rounded-full font-semibold text-black w-max shadow-md hover:bg-gray-100 transition"
                            >
                                Booking
                            </a>
                        </div>
                    </div>
                    <div className="hero-right ml-30">
                        <img src="/src/assets/img.png" alt="Doctor" />
                    </div>
                </div>
            </div>
            {/* Added style block for the new animations */}
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
