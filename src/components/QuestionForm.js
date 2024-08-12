import React, { useState } from 'react';

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      .then((response) => response.json())
      .then((data) => {
        onAddQuestion(data); // Pass the new question to the parent component
        setPrompt(""); // Reset the form fields
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <label>
          Answers:
          {answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ))}
        </label>
        <label>
          Correct Answer:
          <select
            value={correctIndex}
            onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
          >
            {answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer || `Answer ${index + 1}`}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
