import { queryKeys } from "../../common/constansts";
import IComment from "../../interfaces/IComment";
import { useGetPostComments } from "../../modules/posts/apiClient";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const usePostComments = (postId: string) => {
  const { data: currentComments = [] } = useGetPostComments(postId);
  const [comments, setComments] = useState(currentComments);

  const queryClient = useQueryClient();

  const onAddCommentSucceeded = useCallback(
    (newComment: IComment) => {
      queryClient.invalidateQueries(queryKeys.postComments(postId));
      setComments((prev) => [newComment, ...prev]);
    },
    [postId, queryClient]
  );

  const onDeleteCommentSucceeded = useCallback(
    (commentId: string) => {
      queryClient.invalidateQueries(queryKeys.postComments(postId));
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    },
    [postId, queryClient]
  );

  useEffect(() => {
    if (currentComments.length === 0) return;
    setComments(currentComments);
  }, [currentComments]);
  return { onAddCommentSucceeded, onDeleteCommentSucceeded, comments };
};

export default usePostComments;
