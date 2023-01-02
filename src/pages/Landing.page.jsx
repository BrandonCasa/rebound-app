import { Box, Card, CardContent, CardHeader, Chip, Collapse, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "../helpers/usersContext";
import { TransitionGroup } from "react-transition-group";

function LandingPage(props) {
  const user = useContext(AuthContext);
  let theme = useTheme();

  const ItemPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const ItemBox = styled(Box)(({ theme }) => ({
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
    <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
      <Stack spacing={2} sx={{ height: "100%", width: "100%" }}>
        <ItemPaper>
          <Typography variant="h4" sx={{ color: `${theme.palette.text.primary}` }}>
            Introducing Rebound
          </Typography>
          <Typography variant="subtitle1" sx={{ color: `${theme.palette.text.primary}` }}>
            The social hub for gamers and friends.
          </Typography>
        </ItemPaper>
        <ItemBox>
          <Divider sx={{ "&::after": { borderWidth: "2px" }, "&::before": { borderWidth: "2px" } }} variant="middle" textAlign="left">
            <Chip color="primary" label="Features" />
          </Divider>
        </ItemBox>
        <ItemBox sx={{ height: "100%", width: "100%", flexGrow: 1, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,

              overflowX: "hidden",
              overflowY: "auto",
              "::-webkit-scrollbar": {
                width: "14px",
              },
              "::-webkit-scrollbar-button": {
                display: "none",
              },
              "::-webkit-scrollbar-thumb": {
                boxShadow: "inset 0 0 14px 14px #585859",
                border: "solid 4px transparent",
                borderRadius: "14px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#262626",
                boxShadow: "inset 0 0 14px 14px #89898B",
                border: "solid 4px transparent",
                borderRadius: "14px",
              },
              "::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 14px 14px transparent",
                border: "solid 4px transparent",
              },
              "::-webkit-scrollbar-track-piece": {},
              "::-webkit-scrollbar-corner": {},
              "::-webkit-resizer": {},
            }}
          >
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
              <TransitionGrid xs={12} sm={6} md={4} alignItems="stretch" maxHeight={200} display="flex" justifyContent="center">
                <Card sx={{ pl: 2, pr: 2, width: "100%" }}>
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
          </Box>
        </ItemBox>
      </Stack>
    </Box>
  );
}

export default LandingPage;
