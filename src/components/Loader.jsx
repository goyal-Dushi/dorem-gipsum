import { CircularProgress, Container } from "@material-ui/core";
import React from "react";

function Loader() {
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      maxWidth={"md"}>
      <CircularProgress color={"secondary"} />
    </Container>
  );
}

export default Loader;
