import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../server/index";

function ProfilePage(props: any) {
  const params = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt="profile banner" height="172" image={process.env.PUBLIC_URL + "/images/prof1.gif"} />
        <CardContent sx={{ paddingBottom: "0px" }}>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: "16px" }}>
            <Avatar src={auth.currentUser ? (auth.currentUser.photoURL ? auth.currentUser.photoURL : undefined) : undefined} />
            <Typography gutterBottom variant="h5" component="div" sx={{ margin: "auto 0 auto 16px" }}>
              {auth.currentUser && auth.currentUser.displayName}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            This is someone's profile.
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "72px" }}>
          <Button size="small">Message</Button>
          <div style={{ flexGrow: 1 }} />
          <Button size="small">Add Friend</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProfilePage;
