import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
//http://localhost:3000/api/users/findByEmail?email=binh@gmail.com
handler.get(async (req, res, next) => {
  try {
    await connectToDatabase();
    const user = await collections.user?.findOne(req!.query);
    if (user != null && user !== undefined) {
      res.send({ result: true });
      return;
    }
    res.send({ result: false });
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
