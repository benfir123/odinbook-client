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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/benfir123/odinbook-client">
        Ben Chanapai
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({ token, setToken, navigation }) {
  let navigate = useNavigate();
  const { message } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/auth/login", {
        username: data.get("email"),
        password: data.get("password"),
      })
      .then((result) => {
        axios.defaults.headers.common["Authorization"] = result.data.token;
        setToken(result.data.token);
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
          setError(error.response.request.statusText);
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
          {message && <Alert severity="success">{message}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            >
              Test Service as Guest
            </Button>
            <FacebookLogin
              appId="412944714298001"
              onSuccess={(response) => {
                console.log("Login Success!", response);
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
              }}
              render={({ onClick }) => (
                <Button
                  onClick={onClick}
                  variant="contained"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  sx={{ mb: 2 }}
                >
                  Login with Facebook
                </Button>
              )}
            />
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
