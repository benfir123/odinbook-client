import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Paper, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Avatar } from "@mui/material";
import Copyright from "../components/Copyright";

const Account = ({ user }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        ml: {
          xs: 7,
          sm: 9,
        },
      }}
    >
      <Toolbar />
      {user && (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    padding: "28px",
                  }}
                >
                  <Typography variant="h5">My Account</Typography>
                  <div>
                    <Avatar
                      alt={user.full_name}
                      src={user.profile_pic_url}
                      sx={{ width: 256, height: 256 }}
                    />
                  </div>
                  <Typography variant="body1">
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AccountBoxIcon />}
                    disabled
                  >
                    Delete account
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </Container>
      )}
    </Box>
  );
};

export default Account;
