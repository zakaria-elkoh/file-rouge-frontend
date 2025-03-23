import React from 'react';
import { FaCheck, FaClock, FaTimes, FaQuestion } from 'react-icons/fa';
import IUser from '../../interfaces/IUser';

interface VerificationStatusBadgeProps {
  user: IUser;
  className?: string;
}

const VerificationStatusBadge: React.FC<VerificationStatusBadgeProps> = ({ user, className = '' }) => {
  if (!user) return null;

  const getStatusIcon = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return <FaCheck className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'rejected':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaQuestion className="text-gray-500" />;
    }
  };

  const getTooltipText = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return 'Verified Account';
      case 'pending':
        return 'Verification Pending';
      case 'rejected':
        return 'Verification Rejected';
      default:
        return 'Unverified Account';
    }
  };

  const getStatusColorClass = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return 'bg-green-100 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 hover:bg-yellow-200';
      case 'rejected':
        return 'bg-red-100 hover:bg-red-200';
      default:
        return 'bg-gray-100 hover:bg-gray-200';
    }
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full ${getStatusColorClass()} cursor-help ${className}`}
      title={getTooltipText()}
    >
      {getStatusIcon()}
    </div>
  );
};

export default VerificationStatusBadge; 