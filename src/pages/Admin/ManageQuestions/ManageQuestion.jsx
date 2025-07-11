import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import QuestionList from "../../../components/Admin/Questions/QueList";
// import QuestionForm from "./QuestionForm";
// import QuestionList from "./QuestionList";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/question");
      setQuestions(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCreate = async (questionData) => {
    try {
      const response = await axios.post("/api/question", questionData);
      setQuestions([...questions, response.data]);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create question");
    }
  };

  const handleUpdate = async (id, questionData) => {
    try {
      const response = await axios.put(`/api/question/${id}`, questionData);
      setQuestions(questions.map((q) => (q.id === id ? response.data : q)));
      setEditingQuestion(null);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update question");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/question/${id}`);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete question");
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Questions
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingQuestion(null);
            setShowForm(true);
          }}
          sx={{ mb: 3 }}
        >
          Add New Question
        </Button>

        {showForm && (
          <QuestionForm
            question={editingQuestion}
            onSubmit={
              editingQuestion
                ? (data) => handleUpdate(editingQuestion.id, data)
                : handleCreate
            }
            onCancel={() => setShowForm(false)}
            isEditing={!!editingQuestion}
          />
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <QuestionList
            questions={questions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Box>
    </Container>
  );
};

export default ManageQuestions;
