import styledMe from "styled-components";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React from "react";
import DefaultAvatar from "../../asset/group_avatar.png";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { server } from "../index";
const io = require("socket.io-client");
// const io = require("socket.io-client")("https://chat-app-nextjs-mui.vercel.app", {
//   rejectUnauthorized: false // WARN: please do not do this in production
// });

const StyleBox = styledMe(Box)`
  height: 83vh;
  min-height: 50px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  width: "100%";
  margin-top: 2em;
  
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
  maxWidth: "40%",
}));
const ItemRight = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgb(0, 132, 255)",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: 30,
  maxWidth: "40%",
  marginRight: 12,
}));

export default function Conversation({ props: ChatDataProps }: { props: any }) {
  const { data: session } = useSession();
  const [chatData, setChatData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(true);
  const listChatData = useRef([]);

  //TODO: Waiting 1s to rending date then scroll down

  async function scrollDownAfter1s() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const boxElement = document?.getElementById("divElem");
    boxElement?.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  }

  // TODO: Add socketio

  useEffect(() => {
    setLoading(true);
    fetch(server + `/api/chats/${ChatDataProps?.groupId}`)
      .then((response) => response.json())
      .then((data) => {
        setChatData(data);
        setLoading(false);
        scrollDownAfter1s();
      });
    setIsScroll(true);

    fetch(server + "/api/socketio").finally(() => {
      const socket = io();

      socket.on("connect", () => {
        socket.on(ChatDataProps?.groupId, (chatData: never) => {
          listChatData.current.push(chatData);
          if (listChatData.current.length == 5) {
            // listChatData.current.forEach((element) => insertChatToDB(element));
            listChatData.current.length = 0;
          }

          setChatData((prev: any) => {
            const newChatData = [...prev, chatData] as any;
            setIsScroll(false);
            return newChatData;
          });
        });
      });

      socket.on("disconnect", () => {
        console.log(" socket disconnected");
      });

      return () => {
        socket.disconnect();
      };
    });
  }, [ChatDataProps?.groupId]);

  // TODO: insertChatToDB
  async function insertChatToDB(saveChatData: any) {
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
          <Grid
            container
            rowSpacing={1.5}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {chatData.map((data: any, index: any) => (
              <React.Fragment key={index}>
                {session?.user?.email != data.from ? (
                  <Grid item xs={12} container key={index}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        marginTop: "5px",
                        marginRight: "6px",
                      }}
                      alt="ChatAvatar"
                      imgProps={{ referrerPolicy: "no-referrer" }}
                      src={ChatDataProps.photoGroupChatUrl || DefaultAvatar.src}
                    />
                    <ItemLeft>{data.content}</ItemLeft>
                  </Grid>
                ) : (
                  <Grid
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
