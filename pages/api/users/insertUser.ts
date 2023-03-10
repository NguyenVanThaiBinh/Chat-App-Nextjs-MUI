import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";
import { server } from "../../index";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
  let isRegisteredUser = false;
  const user = req.body;
  if (user.email != null || user.email != undefined) {
    await fetch(`${server}/api/users/isRegisteredUser?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result == true) isRegisteredUser = true;
      });
  }
  if (isRegisteredUser) {
    res.send("User is insist!!!");
    return;
  }
  try {
    await connectToDatabase();
    let userData = {
      email: user?.email,
      fullname: user?.name,
      nickname: user?.name,
      last_active: new Date(),
      isOnline: true,
      photoUserUrl: user?.image,
    };
    await collections.user?.insertOne(userData);
    res.send("User insert done!!!");
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
