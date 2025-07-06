import { useEffect, useState } from "react";
import { FaUserFriends, FaTrashAlt, FaSpinner } from "react-icons/fa";
import { animated, useSpring } from "@react-spring/web";

const USERS_PER_PAGE = 7;

const ConfirmModal = ({ isOpen, onCancel, onConfirm, userName }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm overflow-y-auto  bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4 animate-fade-in">
                <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
                <p className="text-gray-700">
                    Are you sure you want to remove <strong>{userName}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

const AllUsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const tableAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        delay: 200,
        config: { mass: 1, tension: 120, friction: 14 },
        reset: true,
    });

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch("http://localhost:10/api/admin/all-users")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
                setError("Failed to load users. Please try again later.");
                setLoading(false);
            });
    }, []);

    const openDeleteConfirmModal = (user) => {
        setUserToDelete(user);
        setConfirmModalOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (!userToDelete) return;
        fetch(`http://localhost:10/api/admin/remove-user/${userToDelete._id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to remove user");
                const updatedUsers = users.filter((user) => user._id !== userToDelete._id);
                setUsers(updatedUsers);
                const maxPages = Math.ceil(updatedUsers.length / USERS_PER_PAGE);
                setCurrentPage(Math.min(currentPage, Math.max(maxPages, 1)));
                setConfirmModalOpen(false);
                setUserToDelete(null);
            })
            .catch((err) => {
                console.error("Error removing user:", err);
                alert("Could not remove user: " + err.message);
                setConfirmModalOpen(false);
            });
    };

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const paginatedUsers = users.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8 font-sans">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 drop-shadow-md flex items-center justify-center gap-4">
                <FaUserFriends className="text-[#469b7e]" />
                User Management
            </h1>

            {loading && (
                <div className="flex flex-col items-center justify-center h-96 text-gray-600 text-2xl font-medium">
                    <FaSpinner className="animate-spin text-[#469b7e] text-5xl mb-4" />
                    Loading...
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md mx-auto max-w-xl text-center flex items-center justify-center gap-3">
                    <span className="font-bold text-xl">Error:</span> {error}
                </div>
            )}

            {!loading && !error && users.length === 0 && (
                <div className="text-center text-gray-600 text-xl font-medium bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                    No users found in the system.
                </div>
            )}

            {!loading && !error && users.length > 0 && (
                <animated.div style={tableAnimation} className="max-w-7xl mx-auto">
                    <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#469b7e] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedUsers.map((user) => {
                                    const role = user.role || user.roles || "N/A";
                                    const isOcMUser = user.email?.includes(".ocm");
                                    return (
                                        <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                                            <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                            <td className={`px-6 py-4 ${isOcMUser ? "text-red-600 font-semibold" : "text-gray-700"}`}>
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 capitalize text-gray-700">{role}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openDeleteConfirmModal(user)}
                                                    className="inline-flex items-center cursor-pointer px-4 py-2 border text-sm font-medium rounded-lg text-black hover:bg-red-600 transition"
                                                >
                                                    <FaTrashAlt className="mr-2" /> Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center gap-3 mt-8">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-xl border font-medium transition ${
                                currentPage === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            ← Previous
                        </button>

                        {[1, 2].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-full text-lg font-semibold transition ${
                                    currentPage === page
                                        ? "bg-[#469b7e] text-white shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-gray-100 border"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {currentPage > 2 && currentPage <= totalPages && (
                            <button
                                onClick={() => setCurrentPage(currentPage)}
                                className="w-10 h-10 rounded-full text-lg font-semibold bg-[#469b7e] text-white shadow-lg"
                            >
                                {currentPage}
                            </button>
                        )}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-xl border font-medium transition ${
                                currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Next →
                        </button>
                    </div>
                </animated.div>
            )}

            <ConfirmModal
                isOpen={confirmModalOpen}
                onCancel={() => setConfirmModalOpen(false)}
                onConfirm={handleDeleteConfirmed}
                userName={userToDelete?.name || ""}
            />
        </div>
    );
};

export default AllUsersTable;
