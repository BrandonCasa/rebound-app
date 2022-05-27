import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography, Divider } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../server/index";

function ProfileEditComponent(props: any) {
  const params = useParams();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} xs={12}>
          <Avatar sx={{ width: "48px", height: "48px" }} src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : undefined} />
        </Grid>
        <Grid item md={6} xs={12}></Grid>
      </Grid>
    </div>
  );
}

function ProfilePage(props: any) {
  const params = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px 16px 0px 16px" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={9} xs={12}>
            <Paper style={{ width: "100%", height: "100%", margin: "auto", padding: "16px" }}>
              <Typography textAlign={"center"} variant="h5" fontWeight={400} sx={{ height: "32px", marginBottom: "8px", marginTop: "-8px" }}>
                {params.userId === auth.currentUser?.uid && "Your Profile"}
                {
                  // If not, get their username
                }
              </Typography>
              {params.userId === auth.currentUser?.uid && <ProfileEditComponent />}
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper style={{ width: "100%", height: "100%", margin: "auto", padding: "16px" }}>
              <Typography textAlign={"center"} variant="h5" fontWeight={400} sx={{ height: "32px", marginBottom: "8px", marginTop: "-8px" }}>
                Preview
              </Typography>
              <Card sx={{ width: 300, margin: "auto" }} variant="outlined">
                <CardMedia component="img" alt="profile banner" height="172" image={process.env.PUBLIC_URL + "/images/prof1.gif"} />
                <CardContent sx={{}}>
                  <div style={{ display: "flex", flexDirection: "row", marginBottom: "16px" }}>
                    <Avatar src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : undefined} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ margin: "auto 0 auto 16px" }}>
                      {auth.currentUser && auth.currentUser.displayName}
                    </Typography>
                  </div>
                  <Typography variant="h6" color="text.secondary" style={{ marginTop: "0" }}>
                    Bio:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is someone's profile.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="small">Message</Button>
                  <div style={{ flexGrow: 1 }} />
                  <Button size="small">Add Friend</Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProfilePage;
