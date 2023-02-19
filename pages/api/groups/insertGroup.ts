import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";
import { server } from "../../index";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  const groupData = req.body;
  try {
    // insert and set group_id by _id
    await connectToDatabase();
    const groupChat = await collections.chatgroup?.insertOne(groupData);
    await collections.chatgroup?.updateOne(
      { _id: groupChat?.insertedId },
      { $set: { group_id: groupChat?.insertedId.toString() } }
    );
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
