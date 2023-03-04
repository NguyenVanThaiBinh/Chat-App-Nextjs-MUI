import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(async (req, res) => {
  // console.log(req.query.content);
  // console.log(req.query.id_chat_group);
  // console.log(req.query.from);
  try {
    await connectToDatabase();
    const chatData = await collections
      .chat!.find({
        content: req.query.content,
        id_chat_group: req.query.id_chat_group,
        from: req.query.from,
      })
      .sort({ send_at: -1 })
      .limit(1)
      .toArray();

    if (chatData.length != 0) {
      res.send({ nextAuthToken: chatData[0].nextAuthToken });
      return;
    }
    // the first time chat, can insert
    res.send({ nextAuthToken: false });
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
