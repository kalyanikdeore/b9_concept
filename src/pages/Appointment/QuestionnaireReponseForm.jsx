import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  message,
  Row,
  Col,
  Pagination,
} from "antd";
import {
  CheckCircle2,
  ArrowLeft as ArrowLeftIcon,
  ChevronDown as ChevronDownIcon,
  Send as PaperAirplaneIcon,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import axiosInstance from "../../services/api";
import useAuthStore from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const { TextArea } = Input;

const QuestionnaireResponseForm = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedNotes, setExpandedNotes] = useState({});
  const questionsPerPage = 5;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/question/active");
        setQuestions(response.data);

        const initialExpandedState = {};
        response.data.forEach((question) => {
          if (question.dropdown_options?.length > 0) {
            initialExpandedState[question.id] = false;
          }
        });
        setExpandedNotes(initialExpandedState);
      } catch (error) {
        message.error("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const toggleNotes = (questionId) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const onFinish = async (values) => {
    try {
      setSubmitting(true);

      const responses = questions.map((question) => {
        const questionId = question.id.toString();
        const isDropdownQuestion = question.dropdown_options?.length > 0;

        return {
          questionId: question.id,
          dropdown_answer: isDropdownQuestion ? values[questionId] || "" : "",
          text_answer: isDropdownQuestion
            ? values[`${questionId}_text`] || ""
            : values[questionId] || "",
          userId: user.id,
          appointment_id: appointmentId ? parseInt(appointmentId) : null,
        };
      });

      const validResponses = responses.filter(
        (response) => response.dropdown_answer || response.text_answer
      );

      await axiosInstance.post(`/responses/appointment/${appointmentId}`, {
        responses: validResponses,
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to submit responses"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Spin size="large" />
      </div>
    );
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Responses Submitted Successfully!
        </h2>
        <p className="text-gray-600">
          Thank you for completing the questionnaire.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <div className="bg-gray-600 p-6 shadow-md sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Patient Questionnaire
            </h2>
            <p className="text-gray-100 text-center mt-2 max-w-2xl mx-auto">
              Your feedback helps us improve our services. Please share your
              experience.
            </p>
          </div>

          <div className="p-4 sm:p-6 space-y-4 bg-white">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{}}
              className="space-y-5"
            >
              {currentQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-5 rounded-lg border shadow-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-gray-200`}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Form.Item
                        name={question.id.toString()}
                        label={
                          <span className="text-gray-900 font-semibold text-base block mb-2">
                            {question.question_text}
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        {question.dropdown_options?.length > 0 ? (
                          <>
                            <Select
                              placeholder="Select an option"
                              className="w-full mb-4"
                              suffixIcon={
                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                              }
                              dropdownStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                              }}
                            >
                              {question.dropdown_options.map((option) => (
                                <Select.Option key={option} value={option}>
                                  {option}
                                </Select.Option>
                              ))}
                            </Select>

                            <div className="mt-2">
                              <Button
                                type="text"
                                icon={
                                  expandedNotes[question.id] ? (
                                    <MinusCircle className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <PlusCircle className="h-4 w-4 text-gray-500" />
                                  )
                                }
                                onClick={() => toggleNotes(question.id)}
                                className="flex items-center p-0 text-gray-600 hover:text-gray-800"
                              >
                                <span className="ml-1 text-gray-600 font-medium">
                                  Additional Notes
                                </span>
                              </Button>

                              {expandedNotes[question.id] && (
                                <Form.Item name={`${question.id}_text`} noStyle>
                                  <TextArea
                                    rows={3}
                                    placeholder="Optional details..."
                                    className="border-gray-300 hover:border-gray-400 focus:border-gray-500 mt-2"
                                    style={{ resize: "vertical" }}
                                    maxLength={300}
                                    showCount
                                  />
                                </Form.Item>
                              )}
                            </div>
                          </>
                        ) : (
                          <TextArea
                            rows={3}
                            placeholder="Type your response..."
                            className="border-gray-300 hover:border-gray-400 focus:border-gray-500"
                            style={{ resize: "vertical" }}
                            maxLength={500}
                            showCount
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="flex justify-center my-6">
                  <Pagination
                    current={currentPage}
                    total={questions.length}
                    pageSize={questionsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="ant-pagination-item-active:bg-gray-600 ant-pagination-item-active:border-gray-600"
                  />
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
                <Button
                  onClick={() => navigate(-1)}
                  className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    type="default"
                    className="px-5 py-2.5 rounded-lg border-gray-300 hover:bg-gray-100 w-full sm:w-auto"
                    onClick={() => form.resetFields()}
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    className="px-6 py-2.5 rounded-lg bg-gray-600 hover:bg-gray-700 text-white w-full sm:w-auto transition-colors flex items-center justify-center"
                    icon={<PaperAirplaneIcon className="h-4 w-4 ml-1" />}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireResponseForm;
