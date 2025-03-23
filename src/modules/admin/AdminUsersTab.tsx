import React, { useState } from "react";
import {
  useArchiveUser,
  useGetAllUsers,
  useMakeAdmin,
  useRemoveAdmin,
  useUnarchiveUser,
} from "./apiClient";
import { Link } from "react-router-dom";
import { userImageUrl } from "../../services/api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Skeleton from "react-loading-skeleton";
import { FaUserCheck, FaUserTimes, FaUserCog, FaUserMinus } from "react-icons/fa";

const AdminUsersTab: React.FC = () => {
  const { data: users = [], isLoading } = useGetAllUsers();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { mutate: archiveUser } = useArchiveUser();
  const { mutate: unarchiveUser } = useUnarchiveUser();
  const { mutate: makeAdmin } = useMakeAdmin();
  const { mutate: removeAdmin } = useRemoveAdmin();

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.jobTitle && user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <div className="mb-4">
          <Skeleton height={40} className="mb-2" />
        </div>
        <Skeleton count={5} height={60} className="mb-2" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name, email, or job title..."
          className="w-full"
        />
      </div>
      
      {/* Users List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verification Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className={user.archived ? "bg-gray-100" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={userImageUrl(user._id)}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <Link to={`/profile/${user._id}`} className="text-sm font-medium text-gray-900 hover:underline">
                          {user.fullName}
                        </Link>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.jobTitle && (
                          <div className="text-sm text-gray-500">{user.jobTitle}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.archived
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.archived ? "Archived" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.verificationStatus === "verified"
                          ? "bg-green-100 text-green-800"
                          : user.verificationStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.verificationStatus === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.verificationStatus || "Unverified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {user.archived ? (
                        <Button
                          title="Unarchive User"
                          onClick={() => unarchiveUser(user._id)}
                          className="!p-2"
                          color="secondary"
                        >
                          <FaUserCheck />
                        </Button>
                      ) : (
                        <Button
                          title="Archive User"
                          onClick={() => archiveUser(user._id)}
                          className="!p-2"
                          color="danger"
                        >
                          <FaUserTimes />
                        </Button>
                      )}

                      {user.isAdmin ? (
                        <Button
                          title="Remove Admin Role"
                          onClick={() => removeAdmin(user._id)}
                          className="!p-2"
                          color="danger"
                        >
                          <FaUserMinus />
                        </Button>
                      ) : (
                        <Button
                          title="Make Admin"
                          onClick={() => makeAdmin(user._id)}
                          className="!p-2"
                          color="secondary"
                        >
                          <FaUserCog />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTab; 