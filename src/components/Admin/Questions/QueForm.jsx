import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Chip,
  Box,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";

const QuestionForm = ({
  question = null,
  onSubmit = () => {},
  onCancel = () => {},
  fetchQuestions,
  open = false, // Added open prop
}) => {
  const [formData, setFormData] = useState({
    category: "",
    question_text: "",
    dropdown_options: ["Other"],
    display_order: 0,
    is_active: true,
  });
  const [newOption, setNewOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (question) {
      setFormData({
        category: question.category || "",
        question_text: question.question_text || "",
        dropdown_options: question.dropdown_options?.length
          ? [...question.dropdown_options]
          : ["Other"],
        display_order: question.display_order || 0,
        is_active: question.is_active !== false,
      });
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOption = () => {
    if (
      newOption.trim() &&
      !formData.dropdown_options.includes(newOption.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        dropdown_options: [...prev.dropdown_options, newOption.trim()],
      }));
      setNewOption("");
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    if (optionToRemove !== "Other") {
      setFormData((prev) => ({
        ...prev,
        dropdown_options: prev.dropdown_options.filter(
          (option) => option !== optionToRemove
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = question
        ? `http://localhost:9099/api/v1/question/update/${question.id}`
        : "http://localhost:9099/api/v1/question";
      const method = question ? "put" : "post";

      const response = await axios[method](url, formData);

      setSnackbar({
        open: true,
        message: question
          ? "Question updated successfully!"
          : "Question created successfully!",
        severity: "success",
      });

      if (typeof onSubmit === "function") {
        onSubmit(response.data);
      }

      if (typeof fetchQuestions === "function") {
        fetchQuestions();
      }

      if (!question) {
        setFormData({
          category: "",
          question_text: "",
          dropdown_options: ["Other"],
          display_order: 0,
          is_active: true,
        });
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "An error occurred",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog open={open} onClose={onCancel} fullWidth maxWidth="md">
        <DialogTitle>
          {question ? "Edit Question" : "Create New Question"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Display Order"
                  name="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={handleChange}
                  required
                  margin="normal"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Question Text"
                  name="question_text"
                  value={formData.question_text}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Dropdown Options (must include "Other")
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    label="Add new option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddOption}
                    disabled={!newOption.trim()}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {formData.dropdown_options.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      onDelete={
                        option !== "Other"
                          ? () => handleRemoveOption(option)
                          : undefined
                      }
                      color={option === "Other" ? "primary" : "default"}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          is_active: e.target.checked,
                        }))
                      }
                      name="is_active"
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="secondary" disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Processing..." : question ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

QuestionForm.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    question_text: PropTypes.string,
    dropdown_options: PropTypes.arrayOf(PropTypes.string),
    display_order: PropTypes.number,
    is_active: PropTypes.bool,
  }),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func,
  open: PropTypes.bool, // added open prop type
};

export default QuestionForm;
