import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/api";

const AddQuestions = () => {
  const { questionnaireId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { text: "", type: "short_answer", choices: [""] },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    if (field === "type" && value !== "multiple_choice") {
      updated[index].choices = [""];
    }
    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", type: "short_answer", choices: [""] },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const addChoice = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.push("");
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosInstance.post(`/questions/create`, {
        questions,
      });
      alert("Questions added successfully!");
      navigate("/dashboard/manageQuestions"); // ✅ Updated redirect
    } catch (error) {
      console.error("Error submitting questions:", error);
      alert("Error submitting questions.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Add Questions</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <div key={index} className="border p-4 rounded space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <label className="block font-medium">Question {index + 1}</label>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(index, "text", e.target.value)
              }
              placeholder="Enter question text"
              required
              className="w-full border rounded px-3 py-2"
            />

            {question.type === "multiple_choice" && (
              <div className="space-y-2">
                {question.choices.map((choice, cIndex) => (
                  <input
                    key={cIndex}
                    type="text"
                    value={choice}
                    onChange={(e) =>
                      handleChoiceChange(index, cIndex, e.target.value)
                    }
                    placeholder={`Choice ${cIndex + 1}`}
                    className="w-full border rounded px-3 py-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addChoice(index)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Add Choice
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Add Question
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
          >
            {submitting ? "Submit" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestions;
