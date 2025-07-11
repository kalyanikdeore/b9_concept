// src/components/admin/questions/QuestionList.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  IconButton,
  Chip,
  TableSortLabel,
  Box,
} from "@mui/material";
import { Edit, Delete, Visibility, VisibilityOff } from "@mui/icons-material";

const QuestionList = ({ questions, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        No questions found.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>
              <TableSortLabel>Category</TableSortLabel>
            </TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions?.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.id}</TableCell>
              <TableCell>
                <Chip label={question.category} variant="outlined" />
              </TableCell>
              <TableCell>{question.question_text}</TableCell>
              <TableCell>
                {question.dropdown_options?.join(", ") || "N/A"}
              </TableCell>
              <TableCell>{question.display_order}</TableCell>
              <TableCell>
                {question.is_active ? (
                  <Chip
                    icon={<Visibility />}
                    label="Active"
                    color="success"
                    size="small"
                  />
                ) : (
                  <Chip
                    icon={<VisibilityOff />}
                    label="Inactive"
                    color="default"
                    size="small"
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => onEdit(question)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(question.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionList;
