import Button from "../../../components/Button/Button";
import IPost from "../../../interfaces/IPost";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useEditPost } from "../apiClient";

const EditPostDescriptionForm = ({
  description,
  postId,
  onSuccess,
  onCancel,
}: {
  description: string;
  postId: string;
  onSuccess: (updatedPost: IPost) => void;
  onCancel: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { description },
  });
  const editPost = useEditPost();

  const onSubmit = useCallback(
    (values: any) => {
      editPost.execute(postId, values);
    },
    [editPost, postId]
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editPost.isSucceeded && editPost.data) {
      onSuccess(editPost.data);
    }
  }, [editPost.data, editPost.isSucceeded, onSuccess, queryClient]);

  const onClickCancel = useCallback(() => {
    reset();
    onCancel();
  }, [onCancel, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("description")}
        className="bg-dark/50 block w-full p-3 rounded-md"
      />
      <div className="flex items-center gap-2">
        <Button
          onClick={onClickCancel}
          type="button"
          className="my-3 text-secondary"
          color="outline-secondary"
        >
          Cancel
        </Button>
        <Button
          type={editPost.isLoading ? "button" : "submit"}
          disabled={editPost.isLoading}
          className="my-3 text-white"
          color="secondary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditPostDescriptionForm;
