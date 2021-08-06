import React, { useState } from "react";
import styled from "styled-components";
import { Select, MenuItem, TextField, makeStyles } from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import "../darkStyles/DarkStyles.css";

const ThemeIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px;
`;

const useStyles = makeStyles({
  inputStyle: {
    backgroundColor: "white",
    border: "none",
    outline: "none",
  },
  paraInputStyle: {
    "& input": {
      width: "3rem",
    },
  },
});

function LoremSection() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);
  const [type, setType] = useState("hipster-latin");
  const [dark, setDark] = useState("");
  const classes = useStyles();

  const switchLight = (theme) => {
    localStorage.setItem("theme", theme);
    setDark(theme);
  };

  // console.log(dark);

  const handleSubmit = async (e) => {
    // external api : fetching lorem-ipsum
    const url = `https://hipsum.co/api/?type=${type}&paras=50`;
    e.preventDefault();

    let amount = parseInt(count);

    const response = await fetch(url);
    const newTexts = await response.json();
    // console.log(newTexts);

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
    <React.Fragment>
      <div
        className={
          (dark === "dark" ? "app__dark" : "app__light") + " app_basic"
        }>
        {dark === "dark" ? (
          <ThemeIcons>
            <WbSunnyIcon
              fontSize='large'
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => switchLight("light")}
            />
          </ThemeIcons>
        ) : (
          <ThemeIcons>
            <Brightness2Icon
              fontSize='large'
              style={{ cursor: "pointer" }}
              onClick={() => {
                switchLight("dark");
              }}
            />
          </ThemeIcons>
        )}
        <section
          id='lorem-section'
          className='section-center'
          style={{ marginTop: -30 }}>
          <h3
            style={{ fontSize: "35px" }}
            className={dark === "dark" ? "head_dark" : "head_light"}>
            tired of lorem ipsum
          </h3>
          <form
            className='lorem-form'
            onSubmit={handleSubmit}
            style={{ marginTop: 10 }}>
            <label htmlFor='amount' className={"lorem-type"}>
              paragraphs:
            </label>
            <TextField
              style={{ margin: "0px 15px" }}
              className={classes.paraInputStyle + " " + classes.inputStyle}
              type={"number"}
              variant={"outlined"}
              name={"amount"}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <label htmlFor='types' className={" lorem-type"}>
              Choose a version:
            </label>
            <Select
              style={{ margin: "0px 15px" }}
              className={classes.inputStyle}
              variant={"outlined"}
              color={"primary"}
              defaultValue={"hipster-latin"}
              name={"types"}
              id={"types"}
              onChange={(e) => setType(e.target.value)}>
              <MenuItem value={"hipster-latin"}>
                {"Hipster Speak Only"}
              </MenuItem>
              <MenuItem value={"hipster-centric"}>
                {"Hipster Speak with Latin"}
              </MenuItem>
            </Select>
            <button className='btn'>generate</button>
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
        </section>
      </div>
    </React.Fragment>
  );
}

export default LoremSection;
