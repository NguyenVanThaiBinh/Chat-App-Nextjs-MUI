import React from "react";
import TextInput from "./TextInput";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Conversation from "./Conversation";
import { server } from "../../index";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import styledMe from "styled-components";

const io = require("socket.io-client");

const StyleGrid = styledMe(Grid)`
  @media only screen and (max-width: 429px) { 
  height: 51em;
  }
  
`;
export default function ChatMsg({ props: groupData }: { props: any }) {
  const { data: session } = useSession();

  const [ChatDataProps, setChatDataProps] = useState(groupData);
  useEffect(() => {
    setChatDataProps(groupData);
  }, [groupData]);

  const handleChangDataTextInput = (chatsData: any) => {
    if (chatsData != null) {
      groupData.ChatData = chatsData;
      setChatDataProps(groupData);
    }
    // TODO: Add socketio
    fetch(server + "/api/socketio").finally(() => {
      const socket = io();

      socket.on("connect", () => {
        socket.emit("on-chat", {
          content: chatsData,
          from: session?.user?.email,
          id_chat_group: groupData.groupId,
          nickname: session?.user?.name,
          to: [
            {
              email: groupData.memberData[0].email,
              nickname: groupData.memberData[0].nickname,
              isSaw: false,
              seen_at: new Date(),
            },
          ],
          send_at: new Date(),
          type: "text",
          userExpires: session?.expires,
        });
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <StyleGrid item xs={12}>
            <Conversation props={ChatDataProps}></Conversation>
          </StyleGrid>
          <Grid item xs={12}>
            <TextInput props={handleChangDataTextInput}></TextInput>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
