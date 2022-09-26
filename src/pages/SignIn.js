import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookLogin from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Copyright from "../components/Copyright";

const theme = createTheme();

export default function SignIn({ user, setUser }) {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState(null);
  const [loadingTestUser, setLoadingTestUser] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // const handleFBLogin = (responseObj) => {
  //   axios
  //     .post("/auth/facebook", {
  //       responseObj,
  //     })
  //     .then((result) => {
  //       const user = {
  //         email: result.data.user.email,
  //         first_name: result.data.user.first_name,
  //         last_name: result.data.user.last_name,
  //         full_name: result.data.user.full_name,
  //         token: `Bearer ${accessToken}`,
  //         id: result.data.user.id,
  //         _id: result.data.user._id,
  //         profile_pic_url: result.data.user.profile_pic_url,
  //         facebookId: result.data.user.facebookId,
  //       };
  //       setUser(user);
  //       localStorage.setItem("user", JSON.stringify(user));
  //       navigate("/");
  //     });
  // };

  const handleTestDrive = () => {
    setLoadingTestUser(true);
    axios
      .post("/auth/testdrive")
      .then((result) => {
        const user = { ...result.data.user, token: result.data.token };
        axios.defaults.headers.common["Authorization"] = user.token;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setLoadingTestUser(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/auth/login", {
        username: data.get("email"),
        password: data.get("password"),
      })
      .then((result) => {
        const user = { ...result.data.user, token: result.data.token };
        axios.defaults.headers.common["Authorization"] = user.token;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      })
      .catch(function (error) {
        setEmailError("");
        setPasswordError("");
        setError("");
        if (error.response.data.errors) {
          if (error.response.data.errors.username) {
            setEmailError(error.response.data.errors.username.msg);
          }
          if (error.response.data.errors.password) {
            setPasswordError(error.response.data.errors.password.msg);
          }
        } else {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {state ? <Alert severity="success">{state.message}</Alert> : null}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              helperText={emailError}
              error={emailError ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={passwordError ? true : false}
              helperText={passwordError}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loadingTestUser && (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                  mt: 2,
                }}
              >
                <CircularProgress />
                Please wait a moment while we create a test user for you...
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              style={{
                backgroundColor: "#38bdf8",
                color: "white",
              }}
              onClick={handleTestDrive}
              disabled={loadingTestUser ? true : false}
            >
              Test Service as Guest
            </Button>
            <FacebookLogin
              appId="412944714298001"
              fields="first_name,last_name,email,picture"
              onSuccess={(response) => {
                console.log("Login Success!", response);
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
                handleFBLogin(response);
              }}
              render={({ onClick }) => (
                <Button
                  onClick={onClick}
                  variant="contained"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  sx={{ mb: 2 }}
                >
                  Log in with Facebook
                </Button>
              )}
            />
            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={() => navigate("/signup")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
