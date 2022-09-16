import { Avatar, TextField } from "@mui/material";

const NewCommentForm = () => {
  return (
    <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <TextField
        placeholder={`Write your comment...`}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default NewCommentForm;
