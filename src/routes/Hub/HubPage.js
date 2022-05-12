// @ts-nocheck
import * as React from "react";
import { useDispatch } from "react-redux";

function HubPage(props) {
  const dispatch = useDispatch();

  return <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px" }}>Welcome back!</div>;
}

export default HubPage;
