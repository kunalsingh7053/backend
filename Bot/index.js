require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenAI }  = require("@google/genai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});



const ai = new GoogleGenAI({});
async function generateContent(prompt){
     const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

   return response.text;
}



client.once("ready",()=>{
    console.log("Bot is ready!");
})

client.on("messageCreate",async(message)=>{
   
     const isBot = message.author.bot

     if(isBot){
         return;
         
    }
   const   content = await generateContent(message.content);
   if(content)
   {
    message.channel.send(content);
   }

  console.log(`Message received!:${message.content}`)

})
client.login(process.env.DISCORD_BOT_TOKEN);