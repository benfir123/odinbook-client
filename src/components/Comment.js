import { Avatar, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Comment = ({ comment, handleCommentLike, user }) => {
  return (
    <div style={{ display: "flex", gap: 15, marginTop: 15 }}>
      <Avatar
        alt={comment.author.full_name}
        src={comment.author.profile_pic_url}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2">{comment.author.full_name}</Typography>
        <Typography variant="body2">{comment.text}</Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="like comment"
            size="small"
            style={{ marginRight: 5 }}
            onClick={() => handleCommentLike(comment.post, comment.id)}
            color={comment.likes.includes(user.id) ? "primary" : "default"}
          >
            <ThumbUpIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body2">{comment.likes.length}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Comment;
