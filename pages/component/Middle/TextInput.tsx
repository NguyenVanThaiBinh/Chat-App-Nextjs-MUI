import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

export default function TextInput({ props }: { props: any }) {
  const [text, setText] = useState("");
  useEffect(() => {
    setText("");
  }, [props]);

  const updateChatData = (chatData: any) => {
    props(chatData);
  };

  const keyPress = (e: any) => {
    if ((e.keyCode === 13 && !e.shiftKey) || (e.which === 13 && !e.shiftKey)) {
      e.preventDefault();
      if (e.target.value != "") {
        updateChatData(e.target.value);
        setText("");
      }
    }
  };
  const buttonClick = (e: any) => {
    e.preventDefault();
    if (e.currentTarget.value != "") {
      updateChatData("❤️");
    }
  };
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={10}>
            <FormControl size="small" fullWidth>
              <TextField
                value={text ? text : ""}
                inputRef={(input) => input && input.focus()}
                id="outlined-password-input"
                label="Message"
                type="text"
                multiline={true}
                maxRows={3}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={keyPress}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{ marginTop: 1, color: "red" }}
              value={"AAA"}
              onClick={buttonClick}
            >
              <FavoriteRoundedIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
