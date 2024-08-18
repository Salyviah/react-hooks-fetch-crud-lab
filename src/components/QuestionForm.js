import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    
    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then(onAddQuestion);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>

      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
          />
        </label>
      ))}

      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
