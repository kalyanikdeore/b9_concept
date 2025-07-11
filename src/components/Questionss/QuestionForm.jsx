import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  InputNumber,
  Card,
  Tag,
} from "antd";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";

export const QuestionForm = ({ onSubmit, initialData, isEditing }) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState(
    initialData?.dropdown_options || ["Other"]
  );

  const onFinish = (values) => {
    onSubmit({ ...values, dropdown_options: options });
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Card title={isEditing ? "Edit Question" : "Add New Question"}>
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialData || {
            category: "",
            question_text: "",
            display_order: 0,
            is_active: true,
          }
        }
        onFinish={onFinish}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Question Text"
          name="question_text"
          rules={[
            { required: true, message: "Please input the question text!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Dropdown Options">
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  disabled={option === "Other"}
                />
                {option !== "Other" && (
                  <Button
                    type="text"
                    danger
                    icon={<Minus size={16} />}
                    onClick={() => removeOption(index)}
                  />
                )}
              </div>
            ))}
            <Button
              type="dashed"
              onClick={addOption}
              icon={<Plus size={16} />}
              block
            >
              Add Option
            </Button>
          </div>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Display Order"
            name="display_order"
            rules={[{ required: true, message: "Please input display order!" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item name="is_active" valuePropName="checked">
            <Checkbox>Active</Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Update Question" : "Create Question"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
