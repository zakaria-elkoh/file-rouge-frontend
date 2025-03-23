import React, { useState } from "react";
import { useArchivePost, useGetAllPosts, useUnarchivePost } from "./apiClient";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { userImageUrl } from "../../services/api";
import { formatDate } from "../../common/utils";
import { FaEye, FaArchive, FaUndo } from "react-icons/fa";

const AdminPostsTab: React.FC = () => {
  const { data: posts = [], isLoading } = useGetAllPosts();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { mutate: archivePost } = useArchivePost();
  const { mutate: unarchivePost } = useUnarchivePost();

  // Filter posts by search term
  const filteredPosts = posts.filter(
    (post) =>
      post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Post Management</h2>
        <div className="mb-4">
          <Skeleton height={40} className="mb-2" />
        </div>
        <Skeleton count={5} height={100} className="mb-2" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Post Management</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts by description or author name..."
          className="w-full"
        />
      </div>
      
      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No posts found</div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className={`bg-white rounded-lg shadow-sm p-4 border ${
                post.archived ? "border-red-200 bg-red-50" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={userImageUrl(post.user._id)}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <Link
                      to={`/profile/${post.user._id}`}
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      {post.user.fullName}
                    </Link>
                    <div className="text-xs text-gray-500">
                      {formatDate(new Date(post.createdAt))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/posts/${post._id}`}>
                    <Button title="View Post" className="!p-2" color="primary">
                      <FaEye />
                    </Button>
                  </Link>
                  {post.archived ? (
                    <Button
                      title="Unarchive Post"
                      onClick={() => unarchivePost(post._id)}
                      className="!p-2"
                      color="secondary"
                    >
                      <FaUndo />
                    </Button>
                  ) : (
                    <Button
                      title="Archive Post"
                      onClick={() => archivePost(post._id)}
                      className="!p-2"
                      color="danger"
                    >
                      <FaArchive />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-800 line-clamp-3">
                  {post.description || "(No description)"}
                </p>
              </div>
              
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <div className="flex items-center mr-4">
                  <span className="mr-1">
                    {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
                  </span>
                </div>
                <div>
                  {post.archived && (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Archived
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPostsTab; 