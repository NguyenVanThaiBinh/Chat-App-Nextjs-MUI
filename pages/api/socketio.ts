import { Server } from "socket.io";

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("on-chat", (msg) => {
        console.log("Got message: " + msg.id_chat_group);
        io.emit(msg.id_chat_group, msg);
      });
    });
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
