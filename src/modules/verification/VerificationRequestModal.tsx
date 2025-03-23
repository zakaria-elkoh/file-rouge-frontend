import React, { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { isModalOpenSelector } from '../../store/selectors/uiSelectors';
import { closeModalAction } from '../../store/ui/uiSlice';
import { modalNames } from '../../common/constansts';
import { useSubmitVerificationRequest } from './apiClient';
import useAddNotification from '../../common/hooks/useAddNotification';
import { InputErrorMessage } from '../../components/Input/Input';

const VerificationRequestModal: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const isOpen = useSelector(isModalOpenSelector(modalNames.verificationRequest));
  const dispatch = useDispatch();
  
  const { mutate: submitRequest, isLoading, error: submitError } = useSubmitVerificationRequest();
  const { showSuccessNotification, showErrorNotification } = useAddNotification();
  
  const handleClose = () => {
    dispatch(closeModalAction(modalNames.verificationRequest));
    setMessage('');
    setError('');
  };
  
  const handleSubmit = () => {
    if (!message.trim()) {
      setError('Please enter a message explaining why you should be verified');
      return;
    }
    
    submitRequest(message, {
      onSuccess: () => {
        showSuccessNotification('Verification request submitted successfully');
        handleClose();
      },
      onError: (error: any) => {
        showErrorNotification(error?.response?.data?.message || 'Failed to submit verification request');
      }
    });
  };
  
  return (
    <ModalWrapper
      modalContentRef={React.useRef(null)}
      isModalOpen={isOpen}
      closeModal={handleClose}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Request Account Verification</h2>
        <p className="text-gray-600 mb-4">
          Please explain why your account should be verified. Our admin team will review your request.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError('');
            }}
            placeholder="Explain why your account should be verified..."
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={5}
            disabled={isLoading}
          />
          {error && <InputErrorMessage message={error} />}
          {submitError ? <InputErrorMessage message="Failed to submit request. Please try again." /> : null}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="secondary"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default VerificationRequestModal; 