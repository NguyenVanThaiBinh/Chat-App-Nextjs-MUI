import styledMe from "styled-components";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React from "react";
import DefaultAvatar from "../../../asset/group_avatar.png";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { server } from "../../index";
import ChatObject from "../../../Object/ChatObject";

const io = require("socket.io-client");

const StyleBox = styledMe(Box)`
  height: 89vh;
  min-height: 50px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  width: 100%;
  margin-top: 0em;
  
`;
// CSS scroll is down when loading page
// display: flex;
// flex-direction: column-reverse;
const ItemLeft = styled(Paper)(({ theme }) => ({
  backgroundColor: "#3e4042b5",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: 30,
  maxWidth: "50%",
  wordWrap: "break-word",
}));
const ItemRight = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgb(0, 132, 255)",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: 30,
  maxWidth: "50%",
  marginRight: 12,
  wordWrap: "break-word",
}));

export default function Conversation(props: any) {
  const { data: session } = useSession();
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(true);
  const listChatData = useRef<ChatObject[]>([]);
  const userSession = session?.expires;

  //TODO: Waiting 1s to rending date then scroll down

  async function scrollDownAfter1s() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const boxElement = document?.getElementById("divElem");
    boxElement?.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  }
  // TODO: Auto save chat  and update last content after 5s
  useEffect(() => {
    let intervalForSaveChat = setInterval(() => {
      if (listChatData.current.length > 0) {
        insertChatAndUpdateLastContentToDB(listChatData.current);
        listChatData.current.length = 0;
      }
    }, 5 * 1000);
    return () => {
      clearInterval(intervalForSaveChat);
    };
  }, []);

  useEffect(() => {
    const userEmail = session && session.user ? session.user.email : null;
    // TODO: Add socketio and render data
    const socket = io();
    socket.on("connect", () => {
      socket.on(props.ChatDataProps?.groupId, (chatData: ChatObject) => {
        // just save chat data from 1 side
        if (chatData.from == userEmail && userSession == session?.expires) {
          listChatData.current.push(chatData);
        }
        setChatData((prev: any) => {
          const newChatData = [...prev, chatData] as any;
          setIsScroll(false);
          return newChatData;
        });
      });
    });

    // socket.on("disconnect", () => {
    //   console.log(" socket disconnected");
    // });

    //save chat  and update last content before change conversation
    if (listChatData.current.length > 0) {
      insertChatAndUpdateLastContentToDB(listChatData.current);
      listChatData.current.length = 0;
    }
    setLoading(true);
    //get Chat from group_id
    fetch(server + `/api/chats/${props.ChatDataProps?.groupId}`)
      .then((response) => response.json())
      .then((data) => {
        setChatData(data);
        setLoading(false);
        scrollDownAfter1s();
      });
    setIsScroll(true);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ChatDataProps?.groupId]);

  // TODO: insertChatToDB and update last chat content
  function insertChatAndUpdateLastContentToDB(saveChatData: any) {
    const last_length = saveChatData.length - 1;
    const group_id = saveChatData[last_length].id_chat_group;
    const last_chat_content = saveChatData[last_length].content;
    try {
      fetch(server + "/api/chats/insertChats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveChatData),
      });
    } catch (error) {
      console.warn("Insert chat fail!");
    }

    const changeData = { group_id, last_chat_content };
    try {
      fetch(server + "/api/groups/updateLastContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeData),
      });
    } catch (error) {
      console.warn("update Last Chat Content fail!");
    }
  }

  return (
    <StyleBox
      id="divElem"
      sx={
        isScroll
          ? {}
          : {
              display: "flex",
              flexDirection: "column-reverse",
            }
      }
    >
      {loading ? (
        <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
      ) : (
        <>
          <Grid sx={{ marginBottom: 2 }}>
            {chatData.map((data: any, index: any) => (
              <React.Fragment key={index}>
                {session?.user?.email != data.from ? (
                  <Grid
                    sx={{ marginTop: 1 }}
                    item
                    xs={12}
                    container
                    key={index}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        marginTop: "5px",
                        marginRight: "6px",
                      }}
                      alt="ChatAvatar"
                      imgProps={{ referrerPolicy: "no-referrer" }}
                      src={
                        props.ChatDataProps.photoGroupChatUrl ||
                        DefaultAvatar.src
                      }
                    />
                    <ItemLeft>{data.content}</ItemLeft>
                  </Grid>
                ) : (
                  <Grid
                    sx={{ marginTop: 1 }}
                    item
                    xs={12}
                    container
                    justifyContent="flex-end"
                    key={index}
                  >
                    <ItemRight>{data.content}</ItemRight>
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </>
      )}
    </StyleBox>
  );
}
