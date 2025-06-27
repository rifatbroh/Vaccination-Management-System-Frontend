import { useEffect, useState } from "react";

const AllUsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users on component mount
    useEffect(() => {
        fetch("http://localhost:10/api/admin/all-users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
                setLoading(false);
            });
    }, []);

    // Handle user removal
    const removeUser = (userId) => {
        fetch(`http://localhost:10/api/admin/remove-user/${userId}`, {
            method: "DELETE", // Using DELETE method for removal
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to remove user");
                }
                // Remove the user from the list in the UI
                setUsers(users.filter((user) => user._id !== userId));
            })
            .catch((err) => {
                console.error("Error removing user:", err);
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
                All Users
            </h2>

            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-[#469b7e] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">
                                    Role
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => {
                                const role = user.role || user.roles || "N/A";

                                return (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">
                                            {user.name}
                                        </td>
                                        <td
                                            className={`px-4 py-3 ${
                                                user.email.includes(".ocm")
                                                    ? "text-red-500 font-medium"
                                                    : ""
                                            }`}
                                        >
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-3 capitalize">
                                            {role}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() =>
                                                    removeUser(user._id)
                                                }
                                                className="px-4 py-2 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsersTable;
