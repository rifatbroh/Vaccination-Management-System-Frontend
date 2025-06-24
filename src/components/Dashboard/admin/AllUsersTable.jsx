import React, { useEffect, useState } from "react";

const AllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">All Users</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-[#469b7e] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => {
                const role = user.role || user.roles || "N/A";

                return (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{user.name}</td>
                    <td
                      className={`px-4 py-3 ${
                        user.email.includes(".ocm") ? "text-red-500 font-medium" : ""
                      }`}
                    >
                      {user.email}
                    </td>
                    <td className="px-4 py-3 capitalize">{role}</td>
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
