import axiosInstance from "../services/api";

export const getQuestions = async () => {
  return await axiosInstance.get("/questions");
};

export const getActiveQuestions = async () => {
  return await axiosInstance.get("/questions/active");
};

export const createQuestion = async (questionData) => {
  return await axiosInstance.post("/questions", questionData);
};

export const updateQuestion = async (id, questionData) => {
  return await axiosInstance.patch(`/questions/${id}`, questionData);
};

export const deleteQuestion = async (id) => {
  return await axiosInstance.delete(`/questions/${id}`);
};
