import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  try {
    if (req.body != null) {
      await connectToDatabase();
      await collections.chat?.insertMany(req.body);
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
