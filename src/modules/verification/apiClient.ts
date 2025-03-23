import IVerificationRequest from '../../interfaces/IVerificationRequest';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, post } from '../../services/api';
import { getCurrentUserId } from '../../store/selectors/appSelectors';
import { useSelector } from 'react-redux';

// Query keys
export const verificationQueryKeys = {
  userRequests: (userId: string) => ['verification-user-requests', userId],
};

// Use this to get a user's verification requests
export const useGetUserVerificationRequests = () => {
  const userId = useSelector(getCurrentUserId);
  
  return useQuery<IVerificationRequest[]>(
    verificationQueryKeys.userRequests(userId),
    async () => {
      const res = await get(`/verification/user/${userId}`);
      return res.data;
    }
  );
};

// Use this to submit a new verification request
export const useSubmitVerificationRequest = () => {
  const queryClient = useQueryClient();
  const userId = useSelector(getCurrentUserId);
  
  return useMutation(
    async (message: string) => {
      const res = await post('/verification/request', { message });
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(verificationQueryKeys.userRequests(userId));
      },
    }
  );
}; 