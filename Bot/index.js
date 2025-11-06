require('dotenv').config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");

// --- Discord Client Setup ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// --- AI Setup ---
const ai = new GoogleGenAI({});
async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

// --- Discord Events ---
client.on("clientReady", () => {
  console.log("✅ Bot is ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    const content = await generateContent(message.content);
    if (content) {
      await message.channel.send(content);
    }
    console.log(`📩 Message received: ${message.content}`);
  } catch (error) {
    console.error("Error generating response:", error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

// --- Express server to keep Render alive ---
const app = express();
app.get("/", (req, res) => res.send("✅ Discord bot is alive and running on Render!"));
app.listen(3000, () => console.log("🌐 Web server running on port 3000"));
