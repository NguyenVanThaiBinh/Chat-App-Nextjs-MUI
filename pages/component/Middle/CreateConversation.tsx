import styledMe from "styled-components";

import Grid from "@mui/material/Grid";

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
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { server } from "../../index";
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

`;
export default function CreateConversation(props: any) {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(-1);
  const { data: session, status } = useSession<any | null>();
  const userEmail = session && session.user ? session.user.email : null;
  const userNickname = session && session.user ? session.user.name : null;
  const userUrl = session && session.user ? session.user.image : null;

  const debounceSearchUsers = useCallback(
    debounce((nextValue) => {
      fetch(server + `/api/users/findUser?searchKey=${nextValue}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const filteredData = data.filter(
              (group: any) => group.email != userEmail
            );
            setLoading(1);
            setSearchData(filteredData);
          }
          if (data.length == 0) {
            setSearchData(data);
            setLoading(0);
          }
        });
    }, 2000),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const keyPress = (e: any) => {
    e.preventDefault();
    const keySearch = e.target.value;
    if (keySearch.length <= 2 || keySearch.trim() == "") {
      setSearchData([]);
      setLoading(-1);
    }

    if (keySearch.trim() != "" && keySearch.length > 2) {
      debounceSearchUsers(keySearch);
    }
  };
  const handleDoubleClick = (
    newNickname: string,
    newEmail: string,
    newUrl: string
  ) => {
    const groupData = {
      group_id: "",
      chat_name: "",
      member: [
        { email: userEmail, nickname: userNickname, photoUserUrl: userUrl },
        { email: newEmail, nickname: newNickname, photoUserUrl: newUrl },
      ],
      last_chat_content: "",
      photoGroupChatUrl: "",
      validateGroup: {
        mixName1: userEmail + newEmail,
        mixName2: newEmail + userEmail,
      },
    };

    const memberData = [
      {
        email: newEmail,
        nickname: newNickname,
        photoUserUrl: newUrl,
      },
    ];
    try {
      fetch(server + "/api/groups/insertGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      })
        .then((response) => response.json())
        .then((new_group_id) => {
          // console.log("AAA: " + new_group_id);
          if (new_group_id != false) {
            props.handleDoubleClick(new_group_id, memberData, newUrl);
          }
        });
    } catch (error) {
      console.warn("Insert group fail!");
    }
  };
  return (
    <>
      <StyleBox>
        <Grid>
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
          {loading != -1 && loading == 0 ? (
            <Typography sx={{ textAlign: "center" }}>
              Nothing data...
            </Typography>
          ) : (
            <>
              {" "}
              {searchData.map((object: any) => (
                <Grid
                  item
                  xs={6}
                  sx={{
                    marginTop: "1em",
                    borderStyle: "groove",
                    borderWidth: "0.05px",
                  }}
                  key={object._id}
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
                      title="Click double to start chat!"
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
                      <ListItem
                        onDoubleClick={() =>
                          handleDoubleClick(
                            object.nickname,
                            object.email,
                            object.photoUserUrl
                          )
                        }
                      >
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
            </>
          )}
        </Grid>
      </StyleBox2>
    </>
  );
}
