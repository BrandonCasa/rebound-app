import { Card, CardContent, CardHeader, Chip, Collapse, Divider, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "../helpers/usersContext";
import { TransitionGroup } from "react-transition-group";

function LandingPage(props) {
  const user = useContext(AuthContext);
  let theme = useTheme();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const TransitionGrid = styled(Grid)(({ theme }) => ({
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  return (
    <Grid container spacing={2} sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <TransitionGrid xs={12} sm={8} md={6} item>
        <Item sx={{ minHeight: "0px" }}>
          <Typography variant="h4" sx={{ color: `${theme.palette.text.primary}` }}>
            Introducing Rebound
          </Typography>
          <Typography variant="subtitle1" sx={{ color: `${theme.palette.text.primary}` }}>
            The social hub for gamers and friends.
          </Typography>
        </Item>
      </TransitionGrid>
      <TransitionGrid xs={12} item>
        <Divider sx={{ "&::after": { borderWidth: "2px" }, "&::before": { borderWidth: "2px" } }} variant="middle" textAlign="left">
          <Chip color="primary" label="Features" />
        </Divider>
      </TransitionGrid>
      <Grid
        item
        container
        spacing={2}
        sx={{
          display: "flex",
          width: "auto",
          justifyContent: "center",
          overflowY: "auto",
          height: "58%",
          "::-webkit-scrollbar": {
            width: "12px",
          },
          "::-webkit-scrollbar-button": {
            width: "6px",
            height: "6px",
          },
          "::-webkit-scrollbar-thumb": { background: "#262626", borderRadius: "12px", border: "2px solid #383838" },
          "::-webkit-scrollbar-thumb:hover": { background: "#262626", borderRadius: "12px", border: "3px solid #383838" },
          "::-webkit-scrollbar-track": { background: "#383838", borderRadius: "12px", width: "12px", mt: "-12px" },
          "::-webkit-scrollbar-track-piece": {},
          "::-webkit-scrollbar-corner": {},
          "::-webkit-resizer": {},
        }}
      >
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                Friend Footprints
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                Allows you to optionally share your activity trends with friends of your choosing.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                Theme Designer
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                Create the theme of your dreams with custom colors and more.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                The Hub
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                A place to view the activity of your friends and start new conversations.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                Noise suppression
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                Turn noise suppression on/off for someones mic on your end.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                Unique Profiles
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                Profile pages where you can showcase yourself in your way.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                Alt Profiles
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                Instead of making a new account, join servers with template profiles of your creation.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
        <TransitionGrid xs={12} sm={6} md={4}>
          <Card sx={{ height: "150px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: `${theme.palette.text.primary}` }}>
                Watch Together
              </Typography>
              <Typography variant="body2" sx={{ color: `${theme.palette.text.secondary}` }}>
                High quality screen sharing and video chat.
              </Typography>
            </CardContent>
          </Card>
        </TransitionGrid>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
