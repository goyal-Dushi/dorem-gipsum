import React, { useEffect } from "react";
import "./cover.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
function Cover() {
  useEffect(() => {
    document.title = "Dorem Ipsum";
  });

  return (
    <div className='landing-section'>
      <div className='container'>
        <h3>copy more type less</h3>
        <Button color={"inherit"} variant={"contained"}>
          <Link to='/lorem'>let's copy</Link>
        </Button>
      </div>
    </div>
  );
}

export default Cover;
