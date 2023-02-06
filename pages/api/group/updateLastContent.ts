import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  try {
    if (req.body != null) {
      const group = await collections.chatgroup?.updateOne(
        { group_id: req.body.group_id.toString() },
        { $set: { last_chat_content: req.body.last_chat_content.toString() } }
      );
      res.send(group);
    } else {
      console.warn("Nothing to insert!");
    }
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
