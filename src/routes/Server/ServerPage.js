// @ts-nocheck
import * as React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function ServerPage(props) {
  const dispatch = useDispatch();
  const params = useParams();

  return <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px" }}>{params.serverId}</div>;
}

export default ServerPage;
