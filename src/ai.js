import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;
const anthropic = new Anthropic({
  // Make sure you set an environment variable in Scrimba
  // for ANTHROPIC_API_KEY
  apiKey: process.env.ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
export async function getRecipeFromChefClaude(ingredientsArr) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/get-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientsArr }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.recipe;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return "Error fetching recipe.";
    }
  }
