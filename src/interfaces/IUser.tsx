interface IUser {
  _id: string;
  email: string;
  fullName: string;
  friends: IUser[];
  friendRequestsSent: IUser[];
  friendRequestsReceived: IUser[];
  isActive: boolean;
  lastActive: string;
  isAdmin?: boolean;
  jobTitle?: string;
  archived?: boolean;
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
}

export default IUser;
