import { Avatar, Divider, Typography, Button, Paper } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentContainer from "./CommentContainer";
import NewCommentForm from "./NewCommentForm";

const Post = ({
  post,
  user,
  handlePostLike,
  handleCommentSubmit,
  handleCommentLike,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <div style={{ display: "flex", gap: 15 }}>
        <Avatar alt={post.author.full_name} src={post.author.profile_pic_url} />
        <div>
          <Typography variant="body1">{post.author.full_name}</Typography>
          <Typography variant="body2">{post.added_formatted}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1">{post.text}</Typography>
      </div>
      <div>
        <img src="test" alt="" />
      </div>
      <Typography variant="body2">
        {post.likes.length === 1 ? "1 like" : `${post.likes.length} likes`}
      </Typography>
      <Divider />
      <div style={{ margin: 16, display: "flex", gap: 22 }}>
        <Button
          variant="outlined"
          startIcon={<ThumbUpIcon />}
          sx={{
            width: "calc(50% - 20px)",
            color: !post.likes.includes(user.id) ? "gray" : "",
            border: !post.likes.includes(user.id) ? "1px lightgray solid" : "",
          }}
          onClick={() => handlePostLike(post.id)}
        >
          Like
        </Button>
        <Button
          variant="outlined"
          startIcon={<CommentIcon />}
          sx={{
            width: "calc(50%)",
            color: "gray",
            border: "1px lightgray solid",
          }}
        >
          Comment
        </Button>
      </div>
      <Divider />
      <CommentContainer
        comments={post.comments}
        handleCommentLike={handleCommentLike}
        user={user}
      />
      <NewCommentForm
        user={user}
        handleCommentSubmit={handleCommentSubmit}
        post={post}
      />
    </Paper>
  );
};

export default Post;
