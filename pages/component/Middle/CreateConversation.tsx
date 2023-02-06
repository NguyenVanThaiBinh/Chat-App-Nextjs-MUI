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
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { server } from "../../index";
import ChatObject from "../../../Object/ChatObject";

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
              inputRef={(input) => input && input.focus()}
              id="outlined-password-input"
              label="Input your friend Name or Email"
              type="text"
              multiline={false}
              maxRows={1}
            />
          </FormControl>
        </Grid>
      </Grid>
    </StyleBox>
  );
}
