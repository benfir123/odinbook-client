import { Avatar, TextField } from "@mui/material";
import { useState } from "react";

const NewCommentForm = ({ user, handleCommentSubmit, post }) => {
  const [commentText, setCommentText] = useState("");
  return (
    <div
      style={{ display: "flex", gap: 15, alignItems: "center", marginTop: 14 }}
    >
      <Avatar alt={user.full_name} src={user.profile_pic_url} />
      <TextField
        placeholder={`Write your comment...`}
        variant="outlined"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommentSubmit(post.id, commentText);
            setCommentText("");
          }
        }}
      />
    </div>
  );
};

export default NewCommentForm;
