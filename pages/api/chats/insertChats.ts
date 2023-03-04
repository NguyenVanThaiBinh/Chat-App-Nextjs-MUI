import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";
import { server } from "../../index";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  let isInsertedChat = false;
  const chatData = req.body;
  let nextAuthToken = Object.values(req.cookies)[0];
  // add para nextAuthToken for each object
  chatData.forEach((element: any) => (element.nextAuthToken = nextAuthToken));
  await fetch(
    `${server}/api/chats/isInsertedChat?content=${chatData[0].content}&id_chat_group=${chatData[0].id_chat_group}&from=${chatData[0].from}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.nextAuthToken != nextAuthToken) isInsertedChat = true;
      if (data.nextAuthToken == false) isInsertedChat = false;
    });
  if (isInsertedChat) {
    res.send("Already inserted chat!!!");
    return;
  }
  try {
    if (chatData != null) {
      await connectToDatabase();
      await collections.chat?.insertMany(chatData);
      res.send("Insert correctly!");
    } else {
      res.send("Nothing to insert!");
      console.warn("Nothing to insert!");
    }
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
