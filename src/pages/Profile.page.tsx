import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography, Divider, IconButton } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../server/index";
import * as IconSvgs from "@mui/icons-material";

function ProfileEditComponent(props: any) {
  const params = useParams();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} xs={12}>
          <Paper variant="outlined" sx={{ padding: "8px" }}>
            <Typography variant="subtitle1" fontWeight={400} sx={{ margin: "-8px 0px 0px 0px" }} color="textSecondary">
              Avatar
            </Typography>
            <div style={{ display: "flex" }}>
              <Button
                startIcon={<IconSvgs.Person sx={{ height: "26px", width: "26px", fontSize: "26px", backgroundColor: "#919191", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.5)" }} />}
                variant="contained"
                sx={{ height: "38px" }}
              >
                Edit
              </Button>
              <Button variant="outlined" sx={{ marginLeft: "8px", height: "38px" }}>
                Default
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper variant="outlined" sx={{ padding: "8px" }}>
            <Typography variant="subtitle1" fontWeight={400} sx={{ margin: "-8px 0px 0px 0px" }} color="textSecondary">
              Color
            </Typography>
            <div style={{ display: "flex" }}>
              <Button
                startIcon={<div style={{ height: "26px", width: "26px", backgroundColor: "red", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.5)" }} />}
                variant="contained"
                sx={{ height: "38px" }}
              >
                Edit
              </Button>
              <Button variant="outlined" sx={{ marginLeft: "8px", height: "38px" }}>
                Default
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function ProfilePage(props: any) {
  const params = useParams();

  if (params.userId === auth.currentUser?.uid) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px 16px 0px 16px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={8} xs={12}>
              <Paper style={{ width: "100%", height: "100%", margin: "auto", padding: "16px" }}>
                <Typography textAlign={"center"} variant="h5" fontWeight={400} sx={{ height: "32px", marginBottom: "8px", marginTop: "-8px" }} color="textSecondary">
                  Your Profile
                </Typography>
                <ProfileEditComponent />
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper style={{ width: "100%", height: "100%", margin: "auto", padding: "16px" }}>
                <Typography textAlign={"center"} variant="h5" fontWeight={400} sx={{ height: "32px", marginBottom: "8px", marginTop: "-8px" }} color="textSecondary">
                  Preview
                </Typography>
                <Card sx={{ width: 300, margin: "auto" }} variant="outlined">
                  <div style={{ height: "8px", width: "100%", backgroundColor: "red", borderTopLeftRadius: "4px", borderTopRightRadius: "4px", display: "block" }} />
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
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px 16px 0px 16px" }}>
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
      </div>
    );
  }
}

export default ProfilePage;
