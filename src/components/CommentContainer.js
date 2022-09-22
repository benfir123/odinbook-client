import Comment from "./Comment";

const CommentContainer = ({ comments, handleCommentLike, user }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment._id}
            handleCommentLike={handleCommentLike}
            user={user}
          />
        );
      })}
    </>
  );
};

export default CommentContainer;
