import Post from "./Post";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

const PostContainer = ({
  posts,
  loadingPosts,
  user,
  handlePostLike,
  handleCommentSubmit,
  handleCommentLike,
}) => {
  return (
    <>
      {!loadingPosts ? (
        posts.length ? (
          posts.map((post) => {
            return (
              <Post
                post={post}
                key={post._id}
                user={user}
                handlePostLike={handlePostLike}
                handleCommentSubmit={handleCommentSubmit}
                handleCommentLike={handleCommentLike}
              />
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            No posts yet
          </Typography>
        )
      ) : (
        <Typography variant="body2" color="text.secondary" align="center">
          <CircularProgress />
        </Typography>
      )}
    </>
  );
};

export default PostContainer;
