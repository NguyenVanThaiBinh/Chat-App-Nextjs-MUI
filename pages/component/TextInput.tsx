import React from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const inputProps = {
  minwidth: 350,
  maxwidth: 430,
};

export const TextInput = ({ props }: { props: any }) => {
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
  return (
    <>
      <Box
        sx={{
          flexGrow: 2,
          position: "fixed",
          bottom: 0,
          width: "95%",
          marginBottom: 5,
        }}
      >
        <Grid container>
          <Grid item xs={6} md={6}>
            <FormControl size="small" fullWidth>
              <TextField
                value={text ? text : ""}
                inputRef={(input) => input && input.focus()}
                id="outlined-password-input"
                label="Message"
                type="text"
                inputProps={inputProps}
                multiline={true}
                maxRows={3}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={keyPress}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              color="primary"
              sx={{ bottom: 0, position: "fixed", marginBottom: 6.5 }}
            >
              <FavoriteRoundedIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
