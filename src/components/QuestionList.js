import React, { useState, useEffect } from 'react';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== id)
      );
    });
  };

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    }).then(() => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === id ? { ...q, correctIndex } : q
        )
      );
    });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => handleUpdate(question.id, parseInt(e.target.value))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
