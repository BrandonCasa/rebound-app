import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

function StatusBadge(props: any) {
  let statusColor = "";
  if (props.status === "online") {
    statusColor = "#44b700";
  } else if (props.status === "offline") {
    statusColor = "#525252";
  } else if (props.status === "afk") {
    statusColor = "#ffc107";
  }

  const ActualBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: statusColor,
      color: statusColor,
      boxShadow: `0 0 4px 2px ${theme.palette.background.paper}95`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <ActualBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" sx={{ marginRight: "10px" }}>
      {props.children}
    </ActualBadge>
  );
}

export default StatusBadge;
