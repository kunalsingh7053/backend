const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt  = require("jsonwebtoken");
const userModel = require("../models/user.model")
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model")
const {createMemory,queryMemory} = require("../services/vector.service");
const { chat } = require("@pinecone-database/pinecone/dist/assistant/data/chat");


function initSocketServer(httpServer)
{   
    const io = new Server(httpServer,{});
    io.use(async(socket,next)=>{
const cookies = cookie.parse(socket.handshake.headers.cookie || "");
console.log("socket connection cookies:",cookies)
if(!cookies.token)
{
    next(new Error("Authentication error:No token provided"))
}
try {
    const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    socket.user = user;
    next()
} catch (error){
    next(new Error("Authenticaation error:Invalid token"))
}
    })
    io.on("connection",(socket)=>{
        socket.on("ai-message",async(messagePayload)=>{
            console.log(messagePayload)
          const message =   await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user" 
            }) 
            const vectors = await aiService.generateVector(messagePayload.content);
      await createMemory({
  messageId: message._id,
  vector: vectors,   // ✅ corrected
  metadata: {
    chat: messagePayload.chat,
    user: socket.user._id,
    text:messagePayload.content
  }
})
 
 const memory = await queryMemory({
    queryVector:vectors,
    limit:3,
    metadata:{
            user: socket.user._id  // 👈 filter by user

    }
 })
 console.log("memory",memory)

            
            const chatHistory = (await messageModel.find({
                chat:messagePayload.chat
            }).sort({createdAt:-1}).limit(20).lean()).reverse();
           
          const stm = chatHistory.map(item=>{
                return {
                    role:item.role,
                    parts:[{  
                        text:item.content
                    }]
                }
        })        

        const ltm = [
            {
                role:"user",
                parts:[{
                    text:`
                   these are some previous messages from the chat history that are relevant to the current conversation:
                ${memory.map(item=>item.metadata.text).join("\n")}
                    `
                }]
            }
        ]
        console.log("chat history=>");
        console.log(ltm);
        console.log(stm);
        
        
            const response = await aiService.generateResponse([...ltm,...stm]);
         const  responseMessage =    await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:response,
                role:"model"
            })
            const responseVector = await aiService.generateVector(response);
                await createMemory({
  messageId:  responseMessage._id,
  vector: responseVector,   // ✅ corrected
  metadata: {
    chat: messagePayload.chat,
    user: socket.user._id,
    text:response
  }
})

            socket.emit("ai-response",{
                content:response,
                chat:messagePayload.chat
            })
        })
    })

}

module.exports = initSocketServer 