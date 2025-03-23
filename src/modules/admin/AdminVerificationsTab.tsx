import React, { useState } from "react";
import {
  useApproveVerificationRequest,
  useGetVerificationRequests,
  useRejectVerificationRequest,
} from "./apiClient";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { userImageUrl } from "../../services/api";
import { Link } from "react-router-dom";
import { formatDate } from "../../common/utils";
import { FaCheck, FaTimes } from "react-icons/fa";
import { modalNames } from "../../common/constansts";
import { useDispatch, useSelector } from "react-redux";
import { isModalOpenSelector } from "../../store/selectors/uiSelectors";
import { closeModalAction, openModalAction } from "../../store/ui/uiSlice";
import ModalWrapper from "../../components/ModalWrapper";

type VerificationActionType = "approve" | "reject";

interface IVerificationActionModalProps {
  isOpen: boolean;
  requestId: string | null;
  actionType: VerificationActionType;
  onClose: () => void;
}

const VerificationActionModal: React.FC<IVerificationActionModalProps> = ({
  isOpen,
  requestId,
  actionType,
  onClose,
}) => {
  const [adminResponse, setAdminResponse] = useState("");
  const { mutate: approveRequest, isLoading: isApproving } = useApproveVerificationRequest();
  const { mutate: rejectRequest, isLoading: isRejecting } = useRejectVerificationRequest();
  
  const handleSubmit = () => {
    if (!requestId) return;
    
    if (actionType === "approve") {
      approveRequest({ requestId, adminResponse });
    } else {
      rejectRequest({ requestId, adminResponse });
    }
    
    setAdminResponse("");
    onClose();
  };
  
  return (
    <ModalWrapper
      isModalOpen={isOpen}
      closeModal={onClose}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {actionType === "approve" ? "Approve" : "Reject"} Verification Request
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Response {actionType === "reject" && "(Required)"}
          </label>
          <textarea
            value={adminResponse}
            onChange={(e) => setAdminResponse(e.target.value)}
            placeholder={`Enter your ${actionType === "approve" ? "(optional) response" : "reason for rejection"}`}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color={actionType === "approve" ? "secondary" : "danger"}
            disabled={(actionType === "reject" && !adminResponse) || isApproving || isRejecting}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const AdminVerificationsTab: React.FC = () => {
  const { data: requests = [], isLoading } = useGetVerificationRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<VerificationActionType>("approve");
  
  const dispatch = useDispatch();
  const isModalOpen = useSelector(isModalOpenSelector(modalNames.verificationAction));
  
  const openModal = (requestId: string, type: VerificationActionType) => {
    setSelectedRequestId(requestId);
    setActionType(type);
    dispatch(openModalAction(modalNames.verificationAction));
  };
  
  const closeModal = () => {
    dispatch(closeModalAction(modalNames.verificationAction));
    setSelectedRequestId(null);
  };

  // Filter requests by user name
  const filteredRequests = requests.filter((request) => {
    const user = request.user as any; // Type conversion
    return user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Verification Requests</h2>
        <div className="mb-4">
          <Skeleton height={40} className="mb-2" />
        </div>
        <Skeleton count={3} height={150} className="mb-2" />
      </div>
    );
  }

  return (
    <div>
      <VerificationActionModal
        isOpen={isModalOpen}
        requestId={selectedRequestId}
        actionType={actionType}
        onClose={closeModal}
      />
      
      <h2 className="text-xl font-bold mb-4">Verification Requests</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username..."
          className="w-full"
        />
      </div>
      
      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No verification requests found</div>
        ) : (
          filteredRequests.map((request) => {
            const user = request.user as any; // Type conversion
            return (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={userImageUrl(user._id)}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <Link
                        to={`/profile/${user._id}`}
                        className="text-base font-medium text-gray-900 hover:underline"
                      >
                        {user.fullName}
                      </Link>
                      <div className="text-xs text-gray-500">
                        Requested on {formatDate(new Date(request.createdAt))}
                      </div>
                      {user.jobTitle && (
                        <div className="text-sm text-gray-600">{user.jobTitle}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => openModal(request._id, "approve")}
                      className="flex items-center"
                      color="secondary"
                    >
                      <FaCheck className="mr-1" /> Approve
                    </Button>
                    <Button
                      onClick={() => openModal(request._id, "reject")}
                      className="flex items-center"
                      color="danger"
                    >
                      <FaTimes className="mr-1" /> Reject
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">User's Message:</h3>
                  <p className="text-sm text-gray-600">{request.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminVerificationsTab; 