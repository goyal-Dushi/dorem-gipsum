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
  Snackbar,
} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CopyToClipboard from "react-copy-to-clipboard";

const useStyles = makeStyles({
  margin: {
    minWidth: 180,
    margin: "12px 0px",
    background: "#ffffff",
  },
  iconStyle: {
    cursor: "pointer",
  },
  heading: {
    textTransform: "uppercase",
  },
  flexCenterBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

function LoremSection() {
  const [formValues, setFormValues] = useState({
    count: 0,
    type: "",
  });
  const [open, setOpen] = useState(false);
  const [text, setText] = useState([]);
  const [dark, setDark] = useState("");
  const classes = useStyles();
  const switchLight = (theme) => {
    localStorage.setItem("theme", theme);
    setDark(theme);
  };

  const handleSubmit = async (e) => {
    if (formValues.type === "") {
      return;
    }
    const url = `https://hipsum.co/api/?type=${formValues.type}&paras=50`;
    e.preventDefault();
    let amount = parseInt(formValues.count);
    const response = await fetch(url);
    const newTexts = await response.json();

    //show atleast one paragraph if count == 0
    if (formValues.count <= 0) {
      amount = 1;
    }
    setText(newTexts.slice(0, amount));
    //condition if count goes above the total length of the data, it will show all the paragraphs inside your array
    if (formValues.count > text.length) {
      amount = text.length;
    }
  };
  const handleSnackClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={
          (dark === "dark" ? "app__dark" : "app__light") + " app_basic"
        }>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={handleSnackClose}
          autoHideDuration={2500}
          message={"Copied to Clipboard!"}
        />
        <Container style={{ marginTop: "40px" }} maxWidth={"lg"}>
          <Container maxWidth={"lg"} className={classes.flexCenterBetween}>
            <Typography
              variant={"h3"}
              className={
                classes.heading +
                " " +
                (dark === "dark" ? "head_dark" : "head_light")
              }>
              {"tired of lorem ipsum"}
            </Typography>
            <Icon fontSize={"large"}>
              {dark === "dark" ? (
                <WbSunnyIcon
                  fontSize={"large"}
                  className={classes.iconStyle}
                  style={{ color: "white" }}
                  onClick={() => switchLight("light")}
                />
              ) : (
                <Brightness2Icon
                  fontSize={"large"}
                  className={classes.iconStyle}
                  onClick={() => {
                    switchLight("dark");
                  }}
                />
              )}
            </Icon>
          </Container>
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
                value={formValues.count}
                onChange={(e) =>
                  setFormValues({ ...formValues, count: e.target.value })
                }
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
                value={formValues.type}
                labelId={"version-select"}
                onChange={(e) =>
                  setFormValues({ ...formValues, type: e.target.value })
                }>
                <MenuItem value={"hipster-latin"}>
                  {"Hipster Speak Only"}
                </MenuItem>
                <MenuItem value={"hipster-centric"}>
                  {"Hipster Speak with Latin"}
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              size={"large"}
              type={"submit"}
              variant={"contained"}
              color={"primary"}>
              {"Generate"}
            </Button>
          </form>
          <Container
            maxWidth={"lg"}
            style={
              dark === "dark"
                ? { color: "#a9f1df" }
                : { color: "hsl(210, 22%, 49%)" }
            }>
            {text?.length ? (
              <Container maxWidth={"lg"} className={classes.flexCenterBetween}>
                <CopyToClipboard text={text}>
                  <Icon
                    fontSize={"large"}
                    color={"primary"}
                    className={classes.iconStyle}>
                    <FileCopyIcon
                      onClick={() => setOpen(true)}
                      fontSize={"large"}
                    />
                  </Icon>
                </CopyToClipboard>
              </Container>
            ) : null}
            <div className={"lorem-text"}>
              {text?.map((item, index) => {
                return (
                  <p style={{ marginTop: "20px" }} key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default LoremSection;
