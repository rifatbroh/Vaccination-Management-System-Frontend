import React, { useState } from 'react';

const Appoinment = () => {
    const [showModal, setShowModal] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const handleCloseModal = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setShowModal(false);
            setIsAnimatingOut(false);
        }, 300);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-25 lg:py-35">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        We invest in the world’s potential
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a
                            href="#"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                        >
                            Get started
                        </a>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-white border border-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-400"
                        >
                            Learn more
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {showModal && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm overflow-y-auto
                    ${isAnimatingOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                >
                    <div
                        className={`relative p-1 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-borderSpin 
                        ${isAnimatingOut ? 'animate-scaleOut' : 'animate-scaleIn'}`}
                    >
                        <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative z-10">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Our Timeline</h2>
                            <ol className="relative border-s border-gray-200">
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                                        <svg className="w-2.5 h-2.5 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </span>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                        Step 1: Register
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded ms-3">Start</span>
                                    </h3>
                                    <p className="mb-4 text-base text-gray-500">
                                        Sign up using your ID and phone number.
                                    </p>
                                </li>
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                                        <svg className="w-2.5 h-2.5 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">Step 2: Login</h3>
                                    <p className="text-base text-gray-500">
                                        Use your credentials to access your dashboard.
                                    </p>
                                </li>
                                <li className="ms-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                                        <svg className="w-2.5 h-2.5 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">Step 3: Book Appointment</h3>
                                    <p className="text-base text-gray-500">
                                        Select your nearest center and preferred time slot.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation Styles */}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes scaleOut {
                    from { transform: scale(1); opacity: 1; }
                    to { transform: scale(0.95); opacity: 0; }
                }
                @keyframes borderSpin {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .animate-fadeOut {
                    animation: fadeOut 0.3s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out forwards;
                }
                .animate-scaleOut {
                    animation: scaleOut 0.3s ease-out forwards;
                }
                .animate-borderSpin {
                    background-size: 300% 300%;
                    animation: borderSpin 4s linear infinite;
                }
                `}
            </style>
        </div>
    );
};

export default Appoinment;
