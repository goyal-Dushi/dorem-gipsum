import React, { useState } from "react";
import "./loremSection.css";
import {
  Select,
  makeStyles,
  InputLabel,
  MenuItem,
  TextField,
  Container,
  FormControl,
  Typography,
  Button,
  Icon,
} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles({
  margin: {
    minWidth: 200,
    background: "#ffffff",
    // padding: "10px 15px",
  },
});

function LoremSection() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);
  const [type, setType] = useState("");
  const [dark, setDark] = useState("");
  const classes = useStyles();
  const switchLight = (theme) => {
    localStorage.setItem("theme", theme);
    setDark(theme);
  };

  const handleSubmit = async (e) => {
    if (type === "") {
      return;
    }
    const url = `https://hipsum.co/api/?type=${type}&paras=50`;
    e.preventDefault();
    let amount = parseInt(count);
    const response = await fetch(url);
    const newTexts = await response.json();

    //show atleast one paragraph if count == 0
    if (count <= 0) {
      amount = 1;
    }
    setText(newTexts.slice(0, amount));
    //condition if count goes above the total length of the data, it will show all the paragraphs inside your array
    if (count > text.length) {
      amount = text.length;
    }
  };
  return (
    <>
      <div
        className={
          (dark === "dark" ? "app__dark" : "app__light") + " app_basic"
        }>
        <Container maxWidth={"md"}>
          <Icon>
            <FileCopyIcon fontSize={"large"} color={"action"} />
          </Icon>
          {dark === "dark" ? (
            <Icon>
              <WbSunnyIcon
                fontSize='large'
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => switchLight("light")}
              />
            </Icon>
          ) : (
            <Icon>
              <Brightness2Icon
                fontSize='large'
                style={{ cursor: "pointer" }}
                onClick={() => {
                  switchLight("dark");
                }}
              />
            </Icon>
          )}
        </Container>
        <Container style={{ marginTop: "40px" }} maxWidth={"lg"}>
          <Typography
            variant={"h3"}
            className={dark === "dark" ? "head_dark" : "head_light"}>
            {"tired of lorem ipsum"}
          </Typography>
          <form
            className='lorem-form'
            onSubmit={handleSubmit}
            style={{ marginTop: 10 }}>
            <FormControl className={classes.margin} color={"primary"}>
              <TextField
                type={"number"}
                label={"Paragraphs"}
                variant={"filled"}
                name={"amount"}
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </FormControl>
            <FormControl
              className={classes.margin}
              variant={"filled"}
              color={"primary"}>
              <InputLabel htmlFor={"version-select"}>
                {"Choose version"}
              </InputLabel>
              <Select
                label={"choose version"}
                color={"primary"}
                value={type}
                labelId={"version-select"}
                onChange={(e) => setType(e.target.value)}>
                <MenuItem value={"hipster-latin"}>
                  {"Hipster Speak Only"}
                </MenuItem>
                <MenuItem value={"hipster-centric"}>
                  {"Hipster Speak with Latin"}
                </MenuItem>
              </Select>
            </FormControl>
            <Button type={"submit"} variant={"contained"} color={"primary"}>
              {"Generate"}
            </Button>
          </form>
          <article
            style={
              dark === "dark"
                ? { color: "#a9f1df" }
                : { color: "hsl(210, 22%, 49%)" }
            }
            className={"lorem-text"}>
            {text?.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </article>
        </Container>
      </div>
    </>
  );
}

export default LoremSection;
