import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PostContainer from "../components/PostContainer";
import FriendList from "../components/FriendList";
import NewPostForm from "../components/NewPostForm";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

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

const Newsfeed = ({ user }) => {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [postTextError, setPostTextError] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    setLoadingPosts(true);
    axios
      .get("/posts")
      .then((results) => {
        setLoadingPosts(false);
        setPosts(results.data.posts);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [user, navigate]);

  useEffect(() => {
    axios.get(`/users/${user.id}`).then((results) => {
      setFriends(results.data.user.friends);
      setFriendRequests(results.data.user.friend_requests);
    });
  }, [user]);

  const sortPosts = (arr) => {
    const sortedArr = arr.sort((a, b) => new Date(b.added) - new Date(a.added));
    return sortedArr;
  };

  const handlePostSubmit = async (postText) => {
    axios
      .post("/posts", { text: postText })
      .then((result) => {
        console.log(result.data);
        const updatedPosts = [...posts, result.data.post];
        setPostText("");
        setPosts(sortPosts(updatedPosts));
      })
      .catch((error) => {
        setPostTextError("");
        if (error.response.data.errors) {
          if (error.response.data.errors.text) {
            setPostTextError(error.response.data.errors.text.msg);
          }
        } else {
          setPostTextError(error.response.request.statusText);
        }
      });
  };

  const handlePostLike = (postId) => {
    axios.put(`/posts/${postId}/like`).then((result) => {
      const updatedPosts = [...posts];
      const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
      if (!updatedPosts[relPostInd].likes.includes(user.id)) {
        updatedPosts[relPostInd].likes.push(user.id);
      } else {
        updatedPosts[relPostInd].likes = updatedPosts[relPostInd].likes.filter(
          (id) => id != user.id
        );
      }
      setPosts(sortPosts(updatedPosts));
    });
  };

  const handleCommentSubmit = (postId, commentText) => {
    axios
      .post(`/posts/${postId}/comments`, {
        comment: commentText,
      })
      .then((result) => {
        const updatedPosts = [...posts];
        const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
        updatedPosts[relPostInd].comments = [
          ...updatedPosts[relPostInd].comments,
          result.data.comment,
        ];
        setPosts(sortPosts(updatedPosts));
      });
  };

  const handleCommentLike = (postId, commentId) => {
    axios.put(`/posts/${postId}/comments/${commentId}/like`).then((result) => {
      const updatedPosts = [...posts];
      const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
      const relCommInd = updatedPosts[relPostInd].comments.findIndex(
        (comm) => comm._id == commentId
      );
      if (
        !updatedPosts[relPostInd].comments[relCommInd].likes.includes(user.id)
      ) {
        updatedPosts[relPostInd].comments[relCommInd].likes.push(user.id);
      } else {
        updatedPosts[relPostInd].comments[relCommInd].likes = updatedPosts[
          relPostInd
        ].comments[relCommInd].likes.filter((id) => id != user.id);
      }
      setPosts(sortPosts(updatedPosts));
    });
  };

  const handleAcceptRequest = (id) => {
    axios
      .put(`/friends/accept`, {
        targetUserId: id,
      })
      .then((result) => {
        setFriends(result.data.user.friends);

        const updatedFriendReqs = friendRequests.filter(
          (item) => item._id != id
        );
        setFriendRequests(updatedFriendReqs);
      });
  };

  const handleDeclineRequest = (id) => {
    axios
      .delete(`/friends/decline`, {
        data: {
          targetUserId: id,
        },
      })
      .then((result) => {
        const updatedFriendReqs = friendRequests.filter(
          (item) => item._id != id
        );
        setFriendRequests(updatedFriendReqs);
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={8.5}>
            <NewPostForm
              user={user}
              postText={postText}
              setPostText={setPostText}
              postTextError={postTextError}
              setPostTextError={setPostTextError}
              handlePostSubmit={handlePostSubmit}
              postText={postText}
            />
            <PostContainer
              posts={posts}
              loadingPosts={loadingPosts}
              user={user}
              handlePostLike={handlePostLike}
              handleCommentSubmit={handleCommentSubmit}
              handleCommentLike={handleCommentLike}
            />
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3.5}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FriendList
                friends={friends}
                friendRequests={friendRequests}
                handleAcceptRequest={handleAcceptRequest}
                handleDeclineRequest={handleDeclineRequest}
              />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default Newsfeed;
