import React, { useState } from 'react';
import { FaUsers, FaNewspaper, FaUserCheck } from 'react-icons/fa';
import AdminUsersTab from '../modules/admin/AdminUsersTab';
import AdminPostsTab from '../modules/admin/AdminPostsTab';
import AdminVerificationsTab from '../modules/admin/AdminVerificationsTab';

type AdminTab = 'users' | 'posts' | 'verifications';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, posts, and verification requests
        </p>
      </div>

      <div className="flex border-b mb-8">
        <button
          className={`flex items-center py-3 px-6 ${
            activeTab === 'users' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers className="mr-2" />
          Users Management
        </button>
        <button
          className={`flex items-center py-3 px-6 ${
            activeTab === 'posts' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          <FaNewspaper className="mr-2" />
          Posts Management
        </button>
        <button
          className={`flex items-center py-3 px-6 ${
            activeTab === 'verifications' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('verifications')}
        >
          <FaUserCheck className="mr-2" />
          Verification Requests
        </button>
      </div>

      <div>
        {activeTab === 'users' && <AdminUsersTab />}
        {activeTab === 'posts' && <AdminPostsTab />}
        {activeTab === 'verifications' && <AdminVerificationsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard; 