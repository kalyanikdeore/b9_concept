import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Space, Divider } from "antd";
import { Plus, Trash2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import axiosInstance from "../../../services/api";

const { Option } = Select;
const { TextArea } = Input;

const EditQuestionForm = ({ question, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(["Other"]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (question) {
      form.setFieldsValue({
        category: question.category,
        question_text: question.question_text,
        display_order: question.display_order,
        is_active: question.is_active,
      });

      const questionOptions = question.dropdown_options || [];
      const allOptions = [...new Set([...questionOptions, "Other"])];
      setOptions(allOptions);
    }
  }, [question, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        dropdown_options: [...new Set(options)],
      };

      await axiosInstance.put(`/question/${question.id}`, payload);

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        onSuccess?.();
      }, 2000);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle2 className="text-green-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Question Updated!
                </h3>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Current Situation">Current Situation</Option>
            <Option value="Desired Outcome">Desired Outcome</Option>
            <Option value="Emotional Triggers">Emotional Triggers</Option>
            <Option value="Thought Patterns">Thought Patterns</Option>
            <Option value="Sensory Preferences">Sensory Preferences</Option>
            <Option value="Support Systems">Support Systems</Option>
            <Option value="Overcoming Obstacles">Overcoming Obstacles</Option>
            <Option value="Action Plan">Action Plan</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="question_text"
          label="Question Text"
          rules={[{ required: true, message: "Please enter question text" }]}
        >
          <TextArea rows={3} placeholder="Enter the question text" />
        </Form.Item>

        <Divider orientation="left" className="font-medium">
          Dropdown Options
        </Divider>

        <Form.Item
          name="dropdown_options"
          rules={[
            { required: true, message: "At least one option is required" },
          ]}
        >
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="flex-1"
                />
                {index > 0 && (
                  <Button
                    type="text"
                    danger
                    icon={<Trash2 size={16} />}
                    onClick={() => removeOption(index)}
                  />
                )}
              </div>
            ))}
            <Button
              type="dashed"
              onClick={addOption}
              icon={<Plus size={16} />}
              className="mt-2"
            >
              Add Option
            </Button>
          </div>
        </Form.Item>

        <Form.Item name="display_order" label="Display Order">
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item name="is_active" valuePropName="checked">
          <div className="flex items-center">
            <input type="checkbox" id="is_active" className="mr-2" />
            <label htmlFor="is_active">Active</label>
          </div>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<Save size={16} />}
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Question
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditQuestionForm;
