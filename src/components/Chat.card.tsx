import * as IconSvgs from "@mui/icons-material";
import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, styled, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ChatCard() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.mode === "light" ? "cadetblue" : "#007878" }}>
            <IconSvgs.Chat sx={{ color: "white" }} />
          </Avatar>
        }
        title="Text Chat"
        subheader="Innovative messaging"
      />
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
            - With swippable and contextual actions, interacting with others' messages has never been easier.
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            - Our spam resistant notification system will only notify you once, even if you have multiple messages from the same person.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ChatCard;
