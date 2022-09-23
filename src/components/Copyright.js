import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ mt: 8, mb: 4 }}
    >
      {"Made with ❤️ by "}
      <Link color="inherit" href="https://github.com/benfir123/odinbook-client">
        Ben Chanapai
      </Link>
      {" © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
