import { Paper, Avatar, TextField, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const NewPostForm = () => {
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
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <TextField
          placeholder={`What's on your mind, Ben?`}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </div>
      <div style={{ marginTop: 15 }}>
        <Button variant="outlined" startIcon={<ImageIcon />} fullWidth>
          Add Image
        </Button>
      </div>
    </Paper>
  );
};

export default NewPostForm;
