require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateprompt = require('./src/service/ai.service');
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
  console.log("a user connected");
  socket.on("disconnect",()=>{
    console.log("a user disconnected");
  })
  socket.on("message",async(data)=>{
    console.log("received message:",data.prompt);
    const response = await generateprompt(data.prompt);
    console.log("response:",response);
    socket.emit("message-response",{response})
  })
});

httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000");
})