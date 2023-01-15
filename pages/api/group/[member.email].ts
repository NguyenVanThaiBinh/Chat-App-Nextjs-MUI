import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    await connectToDatabase();
    const group = await collections.chatgroup?.find(req.query).toArray();
    res.send(group);
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
