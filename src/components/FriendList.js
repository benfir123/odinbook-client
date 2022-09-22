import {
  Avatar,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const FriendList = ({
  friends,
  friendRequests,
  handleAcceptRequest,
  handleDeclineRequest,
}) => {
  return (
    <div>
      <List
        component="nav"
        aria-label="friend requests list"
        subheader={<ListSubheader>Friend Requests</ListSubheader>}
      >
        <div>
          {friendRequests.length > 0
            ? friendRequests.map((friend) => {
                return (
                  <ListItem key={friend._id}>
                    <ListItemIcon>
                      <Avatar
                        alt={friend.full_name}
                        src={friend.profile_pic_url}
                      />
                    </ListItemIcon>
                    <ListItemText primary={friend.full_name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={() => handleAcceptRequest(friend._id)}
                      >
                        <CheckCircleIcon sx={{ color: "#15803d" }} />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={() => handleDeclineRequest(friend._id)}
                      >
                        <CancelIcon sx={{ color: "#991b1b" }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            : "No friend requests yet"}
          <Divider />
        </div>
      </List>
      <List
        component="nav"
        aria-label="[top] friends list"
        subheader={<ListSubheader>Friends</ListSubheader>}
      >
        <div>
          {friends.length > 0
            ? friends.map((friend) => {
                return (
                  <ListItem key={friend._id}>
                    <ListItemIcon>
                      <Avatar
                        alt={friend.full_name}
                        src={friend.profile_pic_url}
                      />
                    </ListItemIcon>
                    <ListItemText primary={friend.full_name} />
                  </ListItem>
                );
              })
            : "No friends yet"}
          <Divider />
        </div>
      </List>
    </div>
  );
};

export default FriendList;
