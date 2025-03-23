import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../../store/selectors/appSelectors';
import IUser from '../../interfaces/IUser';
import VerificationStatusBadge from '../../modules/verification/VerificationStatusBadge';
import VerificationRequestButton from '../../modules/verification/VerificationRequestButton';

interface VerificationComponentsProps {
  user: IUser;
}

const VerificationComponents: React.FC<VerificationComponentsProps> = ({ user }) => {
  const currentUserId = useSelector(getCurrentUserId);
  const isCurrentUser = currentUserId === user._id;
  
  return (
    <div className="flex items-center gap-2">
      <VerificationStatusBadge user={user} />
      <VerificationRequestButton user={user} isCurrentUser={isCurrentUser} />
    </div>
  );
};

export default VerificationComponents; 