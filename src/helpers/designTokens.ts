import { grey } from "@mui/material/colors";

const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default getDesignTokens;
