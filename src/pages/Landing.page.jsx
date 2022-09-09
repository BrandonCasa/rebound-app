import { Divider, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

function LandingPage(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: "60px",
  }));

  return (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <Item>
          <Typography variant="h3">Introducing Rebound</Typography>
          <Typography variant="subtitle1">The social hub for gamers and friends.</Typography>
        </Item>
      </Grid>
      <Grid xs={12} />
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={12} />
      <Grid xs={12}>
        <Item>
          <Typography variant="h4">Features:</Typography>
        </Item>
      </Grid>
      <Grid xs={2}>
        <Item>
          <Typography variant="h5">Friend Footprints</Typography>
        </Item>
      </Grid>
      <Grid xs={10}>
        <Item>
          <Typography variant="subtitle1" sx={{ textAlign: "center", justifyContent: "center" }}>
            See when your friends usually play their favorite games and plan game time together!
          </Typography>
        </Item>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
