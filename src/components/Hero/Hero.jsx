const Hero = () => {
    return (
        <div>
            <div className="hero-area w-full h-[800px] bg-[#002570] flex items-center justify-start rounded-b-[300px]">
                {/* Starting hero area */}
                <div className="hero-content flex justify-start w-full gap-15 px-35">
                    <div className="hero-left max-w-lg pt-20">
                        <p className="text-7xl text-white font-bold">
                            Best caring, <br /> Better Doctors
                        </p>
                        <p className="text-xl text-white py-10">
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
        </div>
    );
};

export default Hero;
