import * as React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Button variant="contained" component={Link} to="/open-collective">
        Hello World
      </Button>
    </div>
  );
}

export default App;
