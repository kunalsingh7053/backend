import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

config();

const model  = new ChatGoogleGenerativeAI({
    model:"gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY
})

const promptTemplate = PromptTemplate.fromTemplate(
    `
    explain {topic} in a single sentence suitable for a 11 year old.
    `
)

const chain = promptTemplate.pipe(model);
chain.invoke({topic:"Quantum Computing"}).then(console.log);