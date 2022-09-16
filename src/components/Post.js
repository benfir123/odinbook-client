import { Avatar, Divider, Typography, Button, Paper } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentContainer from "./CommentContainer";
import NewCommentForm from "./NewCommentForm";

const Post = () => {
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
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div>
          <Typography variant="body1">Ben Chanapai</Typography>
          <Typography variant="body2">0 minutes ago</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1">
          Lorem ipsum, this is where the post content goes. Lorem ipsum, this is
          where the post content goes. Lorem ipsum, this is where the post
          content goes.
        </Typography>
      </div>
      <div>
        <img src="test" alt="" />
      </div>
      <Typography variant="body2">10 likes</Typography>
      <Divider />
      <div style={{ margin: 16, display: "flex", gap: 22 }}>
        <Button
          variant="outlined"
          startIcon={<ThumbUpIcon />}
          sx={{
            width: "calc(50% - 20px)",
          }}
        >
          Like
        </Button>
        <Button
          variant="outlined"
          startIcon={<CommentIcon />}
          sx={{
            width: "calc(50%)",
          }}
        >
          Comment
        </Button>
      </div>
      <Divider />
      <CommentContainer />
      <NewCommentForm />
    </Paper>
  );
};

export default Post;
