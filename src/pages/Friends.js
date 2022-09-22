import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Paper, Avatar } from "@mui/material";
import axios from "../utils/axios";
import { PersonAdd } from "@mui/icons-material";

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

const Friends = ({ user }) => {
  let navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      axios.get("/users").then((results) => {
        const usersExcSelf = results.data.users.filter(
          (item) => item.id !== user.id
        );
        const usersExcSelfAndFriends = usersExcSelf.filter(
          (item) => !item.friends.includes(user._id)
        );
        setUsers(usersExcSelfAndFriends);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios.get(`/users/${user.id}`).then((results) => {
        setFriends(results.data.user.friends);
      });
    }
  }, [user]);

  const handleFriendReq = (profileId) => {
    axios
      .post(`/friends/req`, {
        targetUserId: profileId,
      })
      .then((result) => {
        const updatedUser = result.data.user;
        const updatedUsers = [...users];
        const relIndex = updatedUsers.findIndex(
          (item) => item.id === updatedUser.id
        );
        updatedUsers[relIndex].friend_requests.push(user._id);
        setUsers(updatedUsers);
      });
  };

  const handleCancelFriendReq = (profileId) => {
    axios
      .delete(`/friends/cancel`, {
        data: {
          targetUserId: profileId,
        },
      })
      .then((result) => {
        const updatedUser = result.data.user;
        const updatedUsers = [...users];
        const relIndex = updatedUsers.findIndex(
          (item) => item.id === updatedUser.id
        );
        const updatedRequests = updatedUsers[relIndex].friend_requests.filter(
          (item) => item != user.id
        );
        updatedUsers[relIndex].friend_requests = updatedRequests;
        setUsers(updatedUsers);
      });
  };

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

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Friends
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {friends.length > 0
            ? friends.map((user, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Avatar alt={user.full_name} src={user.profile_pic_url} />
                    <div>
                      <Typography variant="body1">{user.full_name}</Typography>
                    </div>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Users
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          {users.length > 0
            ? users.map((relUser, index) => (
                <Grid item xs={4} sm={8} md={6} lg={4} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Avatar
                      alt={relUser.full_name}
                      src={relUser.profile_pic_url}
                    />
                    <div>
                      <Typography variant="body1">
                        {relUser.full_name}
                      </Typography>
                    </div>
                    {!relUser.friend_requests.includes(user.id) ? (
                      <Button
                        variant="outlined"
                        startIcon={<PersonAdd />}
                        onClick={() => handleFriendReq(relUser.id)}
                      >
                        Add Friend
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        startIcon={<PersonAdd />}
                        onClick={() => handleCancelFriendReq(relUser.id)}
                      >
                        Cancel Request
                      </Button>
                    )}
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default Friends;
