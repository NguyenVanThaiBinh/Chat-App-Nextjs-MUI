import styledMe from "styled-components";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import React from "react";
import DefaultAvatar from "../../../asset/group_avatar.png";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { server } from "../../index";
import ChatObject from "../../../Object/ChatObject";
import { debounce } from "@mui/material";

const StyleBox = styledMe(Box)`
  height: 95vh;
  min-height: 50px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  width: "100%";
  margin-top: 2em;
  background-color: #f0f0f0;
  
`;
export default function CreateConversation() {
  const [text, setText] = useState("");

  const debounceSearchUsers = useCallback(
    debounce((nextValue) => {
      fetch(server + `/api/users/findUser?searchKey=${nextValue}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.length > 0) {
            console.log(data);
          }
        });
    }, 2000),
    []
  );
  const keyPress = (e: any) => {
    if ((e.keyCode === 13 && !e.shiftKey) || (e.which === 13 && !e.shiftKey)) {
      e.preventDefault();
      if (e.target.value != "") {
        // console.log(e.target.value);
        //call API here
        debounceSearchUsers(e.target.value);
        // updateChatData(e.target.value);

        setText("");
      }
    }
  };
  return (
    <StyleBox>
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: "2em" }}>
          <Typography
            sx={{
              marginBottom: "2em",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            Add friend and Enjoy!!!
          </Typography>
          <FormControl sx={{ width: "500px" }}>
            <TextField
              value={text ? text : ""}
              inputRef={(input) => input && input.focus()}
              label="Input your friend Name or Email"
              type="text"
              multiline={false}
              maxRows={1}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={keyPress}
            />
          </FormControl>
        </Grid>
      </Grid>
    </StyleBox>
  );
}
