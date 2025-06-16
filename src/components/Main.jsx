import { useState } from "react";
import { getRecipeFromChefClaude, getRecipeFromMistral } from "../ai.js";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";

/** "all the main spices",
    "pasta",
    "ground beef",
    "tomato paste"*/
export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [recipeShown, setRecipeShown] = useState(false);
 

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function toggleRecipe(prop) {
    setRecipeShown((prevRecipe) => !prevRecipe);
  }
  async function fetchRecipe() {
    const aiRecipe = await getRecipeFromChefClaude(ingredients);
    // console.log(aiRecipe);
    setRecipe(aiRecipe);
    console.log("this is recipe:", recipe);
    // setRecipeShown(true);
  }
  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"dasdwdaw
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          
          fetchRecipe={fetchRecipe}
          recipeShown={recipeShown}
        />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
