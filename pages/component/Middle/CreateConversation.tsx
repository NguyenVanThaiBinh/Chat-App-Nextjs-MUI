import styledMe from "styled-components";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import React from "react";
import DefaultAvatar from "../../../asset/group_avatar.png";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { server } from "../../index";
import ChatObject from "../../../Object/ChatObject";
import { debounce } from "@mui/material";

const StyleBox = styledMe(Box)`
  height: 22vh;
  min-height: 50px;
  width: "100%";
  background-color: #f0f0f0;
  
`;
const StyleBox2 = styledMe(Box)`
  height: 78vh;
  min-height: 50px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  width: "100%";
  background-color: #f0f0f0;
  padding-left: 16px;

`;
export default function CreateConversation() {
  const [searchData, setSearchData] = useState([]);

  const debounceSearchUsers = useCallback(
    debounce((nextValue) => {
      fetch(server + `/api/users/findUser?searchKey=${nextValue}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchData(data);
        });
    }, 2000),
    []
  );
  const keyPress = (e: any) => {
    e.preventDefault();
    if (e.target.value != "") {
      debounceSearchUsers(e.target.value);
    }
  };
  return (
    <>
      <StyleBox>
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: "1em" }}>
            <Typography
              sx={{
                marginBottom: "1em",
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
                label="Input your friend Name or Email"
                type="text"
                multiline={false}
                maxRows={1}
                onChange={keyPress}
              />
            </FormControl>
          </Grid>
        </Grid>
      </StyleBox>
      <StyleBox2>
        <Grid container>
          {searchData.map((object: any) => (
            <Grid
              item
              xs={6}
              sx={{
                marginTop: "1em",
                borderStyle: "groove",
                borderWidth: "0.05px",
              }}
            >
              <List
                id={object._id}
                key={object._id}
                sx={{
                  bgcolor: "background.paper",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <ListItemButton
                  sx={{
                    ":hover": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                    },
                    ":focus": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                    },
                    color: "#1976d2",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt="UserAvatar"
                        imgProps={{ referrerPolicy: "no-referrer" }}
                        src={object.photoUserUrl || DefaultAvatar.src}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        color: "black",
                      }}
                      primary={object.nickname}
                      secondary={
                        <React.Fragment>{object.email}</React.Fragment>
                      }
                    />
                  </ListItem>
                </ListItemButton>
              </List>
            </Grid>
          ))}
        </Grid>
      </StyleBox2>
    </>
  );
}
