import React, { useState } from "react";
import AdminUsersTab from "../modules/admin/AdminUsersTab";
import AdminPostsTab from "../modules/admin/AdminPostsTab";
import AdminVerificationsTab from "../modules/admin/AdminVerificationsTab";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../store/selectors/appSelectors";

enum AdminTab {
  USERS = "users",
  POSTS = "posts",
  VERIFICATIONS = "verifications",
}

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.USERS);
  const currentUser = useSelector(getCurrentUser);

  // Redirect if not admin
  if (!currentUser?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === AdminTab.USERS
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab(AdminTab.USERS)}
        >
          User Management
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === AdminTab.POSTS
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab(AdminTab.POSTS)}
        >
          Post Management
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === AdminTab.VERIFICATIONS
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab(AdminTab.VERIFICATIONS)}
        >
          Verification Requests
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === AdminTab.USERS && <AdminUsersTab />}
        {activeTab === AdminTab.POSTS && <AdminPostsTab />}
        {activeTab === AdminTab.VERIFICATIONS && <AdminVerificationsTab />}
      </div>
    </div>
  );
};

export default AdminDashboardPage; 