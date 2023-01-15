import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  try {
    await connectToDatabase();
    await collections.chat?.insertOne(req.body);
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
