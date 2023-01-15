import React from "react";
import { TextInput } from "./TextInput";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Conversation } from "./Conversation";
import { server } from "../index";
import { useSession } from "next-auth/react";
const io = require("socket.io-client");

export default function ChatMsg({ props: groupData }: { props: any }) {
  const { data: session } = useSession();

  const [ChatDataProps, setChatDataProps] = useState(groupData);

  useEffect(() => {
    setChatDataProps(groupData);
  }, [groupData]);

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

  const handleChangDataTextInput = (chatsData: any) => {
    if (chatsData != null) {
      groupData.ChatData = chatsData;
      setChatDataProps(groupData);
    }
    // TODO: Add socketio

    fetch(server + "/api/socketio").finally(() => {
      const socket = io();

      socket.on("connect", () => {
        console.log("connected");
        socket.emit("on-chat", {
          content: chatsData,
          from: session?.user?.email,
          id_chat_group: groupData.groupId,
        });
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    });

    const saveChatData = {
      id_chat_group: groupData.groupId,
      from: session?.user?.email,
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
      content: chatsData,
    };
    // insertChatToDB(saveChatData);
    // setChatData(saveChatData);
  };

  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <Conversation props={ChatDataProps}></Conversation>
        </Grid>
        <Grid item xs={12}>
          <TextInput props={handleChangDataTextInput}></TextInput>
        </Grid>
      </Grid>
    </>
  );
}
