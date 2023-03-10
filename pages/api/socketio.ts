import { Server } from "socket.io";

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      cors: {
        origin: "https://chat-app-binh-hu.herokuapp.com",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("on-chat", (msg) => {
        io.emit(msg.id_chat_group, msg);
      });
    });
  } else {
    // console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
