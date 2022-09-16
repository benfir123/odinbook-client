import { Avatar, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Comment = () => {
  return (
    <div style={{ display: "flex", gap: 15, marginTop: 15 }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2">Ben Chanapai</Typography>
        <Typography variant="body2">
          Hey, this is the comment you asked for!
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="like comment"
            size="small"
            style={{ marginRight: 5 }}
          >
            <ThumbUpIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body2">10</Typography>
        </div>
      </div>
    </div>
  );
};

export default Comment;
