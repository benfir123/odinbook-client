import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Copyright from "../components/Copyright";

const theme = createTheme();

export default function SignUp({ user }) {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/auth/signup", {
        first_name: data.get("first_name"),
        last_name: data.get("last_name"),
        email: data.get("email"),
        password: data.get("password"),
        password_confirmation: data.get("password_confirmation"),
      })
      .then((result) => {
        navigate("/signin", { state: { message: result.data.message } });
      })
      .catch(function (error) {
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setPasswordConfirmationError("");
        setError("");
        if (error.response.data.errors) {
          if (error.response.data.errors.first_name) {
            setFirstNameError(error.response.data.errors.first_name.msg);
          }
          if (error.response.data.errors.last_name) {
            setLastNameError(error.response.data.errors.last_name.msg);
          }
          if (error.response.data.errors.email) {
            setEmailError(error.response.data.errors.email.msg);
          }
          if (error.response.data.errors.password) {
            setPasswordError(error.response.data.errors.password.msg);
          }
          if (error.response.data.errors.password_confirmation) {
            setPasswordConfirmationError(
              error.response.data.errors.password_confirmation.msg
            );
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  helperText={firstNameError}
                  error={firstNameError ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  helperText={lastNameError}
                  error={lastNameError ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  helperText={emailError}
                  error={emailError ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  error={passwordError ? true : false}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                  error={passwordConfirmationError ? true : false}
                  helperText={passwordConfirmationError}
                />
              </Grid>
              <Grid item xs={12}>
                {error && <Alert severity="error">{error}</Alert>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => navigate("/signin")}>
                  Already have an account? Sign in
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
