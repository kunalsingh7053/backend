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
  try {
    // Add instruction to always reply in ~50 words
    const finalPrompt = `Answer the following question in about 200 words:\n\n${prompt}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });
    console.log("AI response:", response.text);
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (err) {
    console.error("AI generation error:", err);
    return "Something went wrong while generating a response.";
  }
}

// --- Discord Events ---
client.once("ready", () => {
  console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
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
    console.error("Errors sending message:", error);
  }
});

// --- Login ---
client.login(process.env.DISCORD_BOT_TOKEN);

// --- Express server to keep Render alive ---
const app = express();
app.get("/", (req, res) => res.send("✅ Discord bot is alive and running on Render!"));
app.listen(3000, () => console.log("🌐 Web server running on port 3000"));
