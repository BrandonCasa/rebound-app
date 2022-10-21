import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    text: {
      primary: "#fff",
      secondary: "#B5B5B5",
    },
    primary: {
      main: "#b53f3f",
      light: "#ec6f6a",
      dark: "#7f0418",
    },
    secondary: {
      main: "#0099f5",
    },
    background: {
      paper: "#383838",
      default: "#262626",
    },
    error: {
      main: "#ad0000",
    },
    warning: {
      main: "#ffa700",
    },
    info: {
      main: "#21f3dc",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

export default darkTheme;
