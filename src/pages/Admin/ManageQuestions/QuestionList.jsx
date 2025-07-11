import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Tag, message, Popconfirm } from "antd";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import AddQuestionForm from "./AddQuestionForm"; // Your existing add form component
import EditQuestionForm from "./EditQuestionForm"; // The edit form we created earlier
import axiosInstance from "../../../services/api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/question");
      setQuestions(response.data);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to fetch questions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/question/${id}`);
      message.success("Question deleted successfully");
      fetchQuestions(); // Refresh the list
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to delete question"
      );
    }
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (question) => {
    setSelectedQuestion(question);
    setIsEditModalVisible(true);
  };

  const showViewModal = (question) => {
    setSelectedQuestion(question);
    setIsViewModalVisible(true);
  };

  const handleAddSuccess = () => {
    setIsAddModalVisible(false);
    fetchQuestions(); // Refresh the list
    message.success("Question added successfully");
  };

  const handleEditSuccess = () => {
    setIsEditModalVisible(false);
    fetchQuestions(); // Refresh the list
    message.success("Question updated successfully");
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Question Text",
      dataIndex: "question_text",
      key: "question_text",
      ellipsis: true,
    },
    {
      title: "Options Count",
      key: "options_count",
      render: (_, record) => record.dropdown_options?.length || 0,
    },
    {
      title: "Order",
      dataIndex: "display_order",
      key: "display_order",
      width: 80,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<Eye size={16} />}
            onClick={() => showViewModal(record)}
            className="text-blue-600"
          />
          <Button
            icon={<Edit size={16} />}
            onClick={() => showEditModal(record)}
            className="text-yellow-600"
          />
          <Popconfirm
            title="Are you sure to delete this question?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<Trash2 size={16} />} className="text-red-600" />
          </Popconfirm>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Questions</h2>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={showAddModal}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Question
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={questions}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      {/* Add Question Modal */}
      <Modal
        title="Add New Question"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        width={800}
      >
        <AddQuestionForm onSuccess={handleAddSuccess} />
      </Modal>

      {/* Edit Question Modal */}
      <Modal
        title="Edit Question"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedQuestion && (
          <EditQuestionForm
            question={selectedQuestion}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>

      {/* View Question Modal */}
      <Modal
        title="Question Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedQuestion && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Category:</h3>
              <Tag color="blue">{selectedQuestion.category}</Tag>
            </div>
            <div>
              <h3 className="font-semibold">Question Text:</h3>
              <p>{selectedQuestion.question_text}</p>
            </div>
            <div>
              <h3 className="font-semibold">Display Order:</h3>
              <p>{selectedQuestion.display_order}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status:</h3>
              <Tag color={selectedQuestion.is_active ? "green" : "red"}>
                {selectedQuestion.is_active ? "Active" : "Inactive"}
              </Tag>
            </div>
            <div>
              <h3 className="font-semibold">Dropdown Options:</h3>
              <ul className="list-disc pl-5">
                {selectedQuestion.dropdown_options?.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuestionList;
