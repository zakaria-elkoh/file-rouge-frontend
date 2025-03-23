import IUser from './IUser';

interface IVerificationRequest {
  _id: string;
  user: IUser | string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export default IVerificationRequest; 