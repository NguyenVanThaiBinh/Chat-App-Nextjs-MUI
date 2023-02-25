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
  return (
    <>
      <Box
        sx={{
          marginTop: 2,
        }}
      >
        <Grid container>
          <Grid xs={11}>
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
          <Grid xs={1}>
            <Button sx={{ marginTop: 1 }} color="primary">
              <FavoriteRoundedIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
