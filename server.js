const dotenv = require("dotenv");
dotenv.config();

// Load environment variables from .env
dotenv.config();
const Anthropic = require("@anthropic-ai/sdk");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Allows requests from your frontend

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Make sure this is in your .env file
});

app.post("/api/get-recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid ingredients list" });
  }

  try {
    const ingredientsString = ingredients.join(", ");
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: `
        You are an assistant that receives a list of ingredients that a user has 
        and suggests a recipe they could make. Format your response in markdown.
      `,
      messages: [
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe!`,
        },
      ],
    });

    res.json({ recipe: response.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
