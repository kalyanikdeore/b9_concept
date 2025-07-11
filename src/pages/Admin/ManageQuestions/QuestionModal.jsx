import { Modal, Descriptions, Tag, Divider, List } from "antd";

const QuestionModal = ({ visible, mode, question, onClose }) => {
  const isViewMode = mode === "view";

  return (
    <Modal
      title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Question`}
      open={visible}
      onCancel={() => onClose(false)}
      footer={isViewMode ? null : undefined}
      width={800}
      destroyOnClose
    >
      {isViewMode && question ? (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Category">
              <Tag color="blue">{question.category}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Question Text">
              {question.question_text}
            </Descriptions.Item>
            <Descriptions.Item label="Display Order">
              {question.display_order}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={question.is_active ? "green" : "red"}>
                {question.is_active ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Dropdown Options</Divider>
          <List
            dataSource={question.dropdown_options}
            renderItem={(item) => <List.Item>{item}</List.Item>}
            bordered
          />
        </>
      ) : (
        <div>
          {/* Add your edit/create form here */}
          <p>Form for {mode} mode would go here</p>
        </div>
      )}
    </Modal>
  );
};

export default QuestionModal;
