// @ts-nocheck
import * as React from "react";
import { useDispatch } from "react-redux";

function HubPage(props) {
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px" }}>
      <span>
        <span style={{ fontWeight: "bold" }}>Page: </span>
        The Hub
      </span>
      <br />
      (NOT DONE)
    </div>
  );
}

export default HubPage;
