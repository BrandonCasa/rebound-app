import * as IconSvgs from "@mui/icons-material";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, styled, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CommunitiesCard() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "20vw", minWidth: "200px", maxWidth: "300px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.mode === "light" ? "cadetblue" : "#780078" }}>
            <IconSvgs.Dashboard sx={{ color: "white" }} />
          </Avatar>
        }
        title="Community"
        subheader="Groups built to scale"
      />
      <CardMedia component="img" image="/images/Servers.png" alt="Chat" sx={{ height: "65%", width: "65%", margin: "auto" }} />
      <br />
      <Divider variant="middle" />
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <IconSvgs.ExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            - From 3 to 10,000 members, your server can be a powerful platform for your community.
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            - Seamless communication with Discord and Twitch allows anyone in your Rebound server to see your Discord/Twitch chats all in one place.
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            - Built in management tools keep moderation logs and actions in check.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CommunitiesCard;
