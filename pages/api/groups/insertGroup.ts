import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";
import { server } from "../../index";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  let isRegisteredUser = false;
  const groupData = req.body;
  await fetch(
    `${server}/api/groups/isRegisteredGroup?validateGroup=${groupData.validateGroup}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.result == true) isRegisteredUser = true;
    });
  if (isRegisteredUser) {
    res.send(false);
    return;
  }

  try {
    // insert and set group_id by _id
    await connectToDatabase();
    const groupChat = await collections.chatgroup?.insertOne(groupData);
    await collections.chatgroup?.updateOne(
      { _id: groupChat?.insertedId },
      { $set: { group_id: groupChat?.insertedId.toString() } }
    );
    res.send(groupChat?.insertedId);
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
