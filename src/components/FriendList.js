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

const FriendList = () => {
  return (
    <div>
      <List
        component="nav"
        aria-label="friend requests list"
        subheader={<ListSubheader>Friend Requests</ListSubheader>}
      >
        <div>
          <ListItem>
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary="Ben Chanapai" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CheckCircleIcon sx={{ color: "#15803d" }} />
              </IconButton>
              <IconButton edge="end" aria-label="comments">
                <CancelIcon sx={{ color: "#991b1b" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      </List>
      <List
        component="nav"
        aria-label="[top] friends list"
        subheader={<ListSubheader>Friends</ListSubheader>}
      >
        <div>
          <ListItem>
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary="Ben Chanapai" />
          </ListItem>
          <Divider />
        </div>
      </List>
    </div>
  );
};

export default FriendList;
