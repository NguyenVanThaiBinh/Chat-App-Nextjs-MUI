import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(async (req, res) => {

  try {
    await connectToDatabase();
    const groupChat = await collections
      .chatgroup!.find({
        $or: [
          { "validateGroup.mixName1": req.query.mixName1 },
          { "validateGroup.mixName2": req.query.mixName1 },
        ],
      })
      .toArray();

    if (groupChat.length != 0) {
      res.send({ result: true });
      return;
    }
    res.send({ result: false });
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;