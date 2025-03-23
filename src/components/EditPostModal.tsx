import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../store/ui/uiSlice';
import { modalNames } from '../common/constansts';
import { useEditPost } from '../modules/posts/apiClient';
import ModalWrapper from './ModalWrapper';
import Button from './Button/Button';
import { FaSave } from 'react-icons/fa';

interface EditPostState {
  postId: string | null;
  description: string;
}

const EditPostModal: React.FC = () => {
  const dispatch = useDispatch();
  const modalName = modalNames.editPost;
  const { activeModal, modalData } = useSelector((state: any) => state.ui);
  const [formState, setFormState] = useState<EditPostState>({
    postId: null,
    description: '',
  });
  const [error, setError] = useState<string>('');
  const { mutateAsync: editPost, isLoading } = useEditPost();

  // Reset form when modal opens or closes
  useEffect(() => {
    if (activeModal === modalName && modalData?.post) {
      setFormState({
        postId: modalData.post._id,
        description: modalData.post.description || '',
      });
      setError('');
    }
  }, [activeModal, modalData]);

  const handleClose = () => {
    dispatch(closeModalAction());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formState.description.trim()) {
      setError('Post description cannot be empty');
      return;
    }

    try {
      await editPost(
        formState.postId as string, 
        { description: formState.description.trim() }
      );
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
    }
  };

  return (
    <ModalWrapper
      isOpen={activeModal === modalName}
      onClose={handleClose}
      title="Edit Post"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">
            Post Description
          </label>
          <textarea
            id="description"
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md min-h-[120px]"
            placeholder="Update your post description..."
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button 
            type="button" 
            color="secondary" 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            color="primary"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <FaSave /> Save Changes
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditPostModal; 