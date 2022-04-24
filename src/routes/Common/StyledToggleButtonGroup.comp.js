import { ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "&": {
    border: `2px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default StyledToggleButtonGroup;
