import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography, Divider, IconButton } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../server/index";
import * as IconSvgs from "@mui/icons-material";
import { useFilePicker } from "use-file-picker";
import { useAppDispatch } from "../redux/store";
import { openDialog } from "../redux/Dialogs/dialogs.slice";
import { useSelector } from "react-redux";
import { userstuffSelector } from "../redux/Userstuff/userstuff.slice";

function ProfileEditComponent(props: any) {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [canChange, setCanChange] = React.useState(true);

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
                startIcon={
                  <Avatar
                    sx={[
                      {
                        "&": {
                          height: "26px",
                          width: "26px",
                          backgroundColor: "#919191",
                          borderRadius: "5px",
                          border: "2px solid rgba(0, 0, 0, 0.5)",
                        },
                        svg: {
                          width: "22px",
                          height: "22px",
                        },
                      },
                    ]}
                  />
                }
                variant="contained"
                sx={{ height: "38px" }}
                onClick={() => props.openFileSelector()}
              >
                Change
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
            <form style={{ display: "flex" }}>
              <Button
                startIcon={<IconSvgs.Colorize sx={{ height: "26px", width: "26px", fontSize: "26px", backgroundColor: "#919191", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.5)" }} />}
                variant="contained"
                sx={{ height: "38px" }}
              >
                Change
                <input
                  type="color"
                  onChange={(event: React.ChangeEvent) => {
                    event.preventDefault();
                    if (canChange) {
                      props.setColor((event.target as HTMLInputElement).value);
                      setCanChange(false);
                      setTimeout(() => {
                        setCanChange(true);
                      }, 50);
                    }
                  }}
                  style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                />
              </Button>
              <Button variant="outlined" sx={{ marginLeft: "8px", height: "38px" }} onClick={() => props.setColor("#ffffff")}>
                Auto
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper variant="outlined" sx={{ padding: "8px" }}>
            <Typography variant="subtitle1" fontWeight={400} sx={{ margin: "-8px 0px 0px 0px" }} color="textSecondary">
              Display Name
            </Typography>
            <div style={{ display: "flex" }}>
              <Button
                startIcon={<IconSvgs.Edit sx={{ height: "26px", width: "26px", fontSize: "26px", backgroundColor: "#919191", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.5)" }} />}
                variant="contained"
                sx={{ height: "38px" }}
              >
                Change
              </Button>
              <Button variant="outlined" sx={{ marginLeft: "8px", height: "38px" }}>
                Random
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper variant="outlined" sx={{ padding: "8px" }}>
            <Typography variant="subtitle1" fontWeight={400} sx={{ margin: "-8px 0px 0px 0px" }} color="textSecondary">
              Bio
            </Typography>
            <div style={{ display: "flex" }}>
              <Button
                startIcon={<IconSvgs.Article sx={{ height: "26px", width: "26px", fontSize: "26px", backgroundColor: "#919191", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.5)" }} />}
                variant="contained"
                sx={{ height: "38px" }}
                onClick={() => dispatch(openDialog("changeBioDialog"))}
              >
                Change
              </Button>
              <Button variant="outlined" sx={{ marginLeft: "8px", height: "38px" }}>
                Clear
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
  const userState = useSelector(userstuffSelector);

  const [color, setColor] = React.useState("#ffffff");

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 2,
    imageSizeRestrictions: {
      maxHeight: 1024,
      maxWidth: 1024,
      minHeight: 32,
      minWidth: 32,
    },
  });

  const [profilePic, setProfilePic] = React.useState<undefined | string>(undefined);

  React.useEffect(() => {
    if (filesContent.length > 0) {
      setProfilePic(filesContent[0].content);
    } else if (auth.currentUser && auth.currentUser.photoURL) {
      setProfilePic(auth.currentUser.photoURL);
    } else {
      setProfilePic(undefined);
    }
  }, [filesContent]);

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
                <ProfileEditComponent setColor={setColor} color={color} openFileSelector={openFileSelector} profilePic={profilePic} />
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper style={{ width: "100%", height: "100%", margin: "auto", padding: "16px" }}>
                <Typography textAlign={"center"} variant="h5" fontWeight={400} sx={{ height: "32px", marginBottom: "8px", marginTop: "-8px" }} color="textSecondary">
                  Preview
                </Typography>
                <Card sx={{ width: 300, margin: "auto" }} variant="outlined">
                  <div style={{ height: "8px", width: "100%", backgroundColor: color, borderTopLeftRadius: "4px", borderTopRightRadius: "4px", display: "block" }} />
                  <CardMedia component="img" alt="profile banner" height="172" image={process.env.PUBLIC_URL + "/images/prof1.gif"} />
                  <CardContent sx={{}}>
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "16px" }}>
                      <Avatar src={profilePic} />
                      <Typography gutterBottom variant="h5" component="div" sx={{ margin: "auto 0 auto 16px" }}>
                        {auth.currentUser && auth.currentUser.displayName}
                      </Typography>
                    </div>
                    <Typography variant="h6" color="text.secondary" style={{ marginTop: "0" }}>
                      Bio:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userState.bio}
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
