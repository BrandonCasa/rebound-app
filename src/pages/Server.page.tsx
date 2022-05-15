import * as React from "react";
import { useParams } from "react-router-dom";

function ServerPage(props: any) {
  const params = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: "61px", padding: "16px" }}>
      <span>
        <span style={{ fontWeight: "bold" }}>Server ID: </span>
        {params.serverId}
      </span>
      <br />
      (NOT DONE)
    </div>
  );
}

export default ServerPage;
