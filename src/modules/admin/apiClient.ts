import IUser from '../../interfaces/IUser';
import IPost from '../../interfaces/IPost';
import IVerificationRequest from '../../interfaces/IVerificationRequest';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, put } from '../../services/api';

// Query keys
export const adminQueryKeys = {
  users: 'admin-users',
  posts: 'admin-posts',
  verificationRequests: 'admin-verification-requests',
};

// User Management
export const useGetAllUsers = () => {
  return useQuery<IUser[]>(
    adminQueryKeys.users,
    async () => {
      const res = await get('/users/admin/all');
      return res.data;
    }
  );
};

export const useArchiveUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (userId: string) => {
      const res = await put(`/users/admin/archive/${userId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.users);
      },
    }
  );
};

export const useUnarchiveUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (userId: string) => {
      const res = await put(`/users/admin/unarchive/${userId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.users);
      },
    }
  );
};

export const useMakeAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (userId: string) => {
      const res = await put(`/users/admin/make-admin/${userId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.users);
      },
    }
  );
};

export const useRemoveAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (userId: string) => {
      const res = await put(`/users/admin/remove-admin/${userId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.users);
      },
    }
  );
};

// Post Management
export const useGetAllPosts = () => {
  return useQuery<IPost[]>(
    adminQueryKeys.posts,
    async () => {
      const res = await get('/posts/admin/all');
      return res.data;
    }
  );
};

export const useArchivePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (postId: string) => {
      const res = await put(`/posts/admin/archive/${postId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.posts);
      },
    }
  );
};

export const useUnarchivePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (postId: string) => {
      const res = await put(`/posts/admin/unarchive/${postId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.posts);
      },
    }
  );
};

// Verification Requests
export const useGetVerificationRequests = () => {
  return useQuery<IVerificationRequest[]>(
    adminQueryKeys.verificationRequests,
    async () => {
      const res = await get('/verification/requests');
      return res.data;
    }
  );
};

export const useApproveVerificationRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ requestId, adminResponse }: { requestId: string; adminResponse?: string }) => {
      const res = await put(`/verification/approve/${requestId}`, { adminResponse });
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.verificationRequests);
      },
    }
  );
};

export const useRejectVerificationRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ requestId, adminResponse }: { requestId: string; adminResponse: string }) => {
      const res = await put(`/verification/reject/${requestId}`, { adminResponse });
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(adminQueryKeys.verificationRequests);
      },
    }
  );
}; 