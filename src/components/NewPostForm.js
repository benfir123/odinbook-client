import { Paper, Avatar, TextField } from "@mui/material";

const NewPostForm = ({
  user,
  postText,
  setPostText,
  postTextError,
  handlePostSubmit,
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
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Avatar alt={user.full_name} src={user.profile_pic_url} />
        <TextField
          placeholder={`What's on your mind, ${user.first_name}?`}
          variant="outlined"
          sx={{ flex: 1 }}
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          helperText={postTextError}
          error={postTextError ? true : false}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePostSubmit(postText);
            }
          }}
        />
      </div>
    </Paper>
  );
};

export default NewPostForm;
