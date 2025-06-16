import React from "react";
import ReactDom from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ClaudeRecipe(props) {
  const markdown = props.recipe;

  return (
    <div className="suggested-recipe-container" aria-live="polite">
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
      
    </div>
  );
}
