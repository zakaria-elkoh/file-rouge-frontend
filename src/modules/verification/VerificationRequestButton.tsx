import React from 'react';
import Button from '../../components/Button/Button';
import { FaCheck, FaUserCheck } from 'react-icons/fa';
import { modalNames } from '../../common/constansts';
import { useDispatch } from 'react-redux';
import { openModalAction } from '../../store/ui/uiSlice';
import { useGetUserVerificationRequests } from './apiClient';
import IUser from '../../interfaces/IUser';

interface VerificationRequestButtonProps {
  user: IUser;
  isCurrentUser: boolean;
}

const VerificationRequestButton: React.FC<VerificationRequestButtonProps> = ({
  user,
  isCurrentUser,
}) => {
  const dispatch = useDispatch();
  const { data: _requests = [] } = useGetUserVerificationRequests();
  
  // Don't show the button if not the current user
  if (!isCurrentUser) return null;
  
  // Don't show the button for already verified users
  if (user.verificationStatus === 'verified') {
    return (
      <Button 
        className="flex items-center gap-1" 
        color="secondary"
        disabled={true}
      >
        <FaCheck /> Verified Account
      </Button>
    );
  }
  
  // Show pending message if user has a pending request
  if (user.verificationStatus === 'pending') {
    return (
      <Button 
        className="flex items-center gap-1" 
        color="primary"
        disabled={true}
      >
        Verification Pending
      </Button>
    );
  }
  
  // Show rejected message if the request was rejected
  if (user.verificationStatus === 'rejected') {
    return (
      <Button
        className="flex items-center gap-1" 
        color="secondary"
        onClick={() => dispatch(openModalAction(modalNames.verificationRequest))}
        title="Your previous request was rejected. You can submit a new one."
      >
        Request Verification Again
      </Button>
    );
  }
  
  // Show request button for unverified users
  return (
    <Button
      className="flex items-center gap-1" 
      color="secondary"
      onClick={() => dispatch(openModalAction(modalNames.verificationRequest))}
    >
      <FaUserCheck /> Request Verification
    </Button>
  );
};

export default VerificationRequestButton; 