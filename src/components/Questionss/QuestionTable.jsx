import { Table, Tag, Space, Button } from "antd";
import { Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export const QuestionTable = ({ data, onEdit, onDelete, loading }) => {
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        ),
    },
    {
      title: "Question",
      dataIndex: "question_text",
      key: "question_text",
    },
    {
      title: "Options",
      dataIndex: "dropdown_options",
      key: "dropdown_options",
      render: (options) => (
        <Space size={[0, 8]} wrap>
          {options.map((option, i) => (
            <Tag key={i}>{option}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Order",
      dataIndex: "display_order",
      key: "display_order",
      sorter: (a, b) => a.display_order - b.display_order,
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<Edit2 size={16} />} onClick={() => onEdit(record)} />
          <Button
            danger
            icon={<Trash2 size={16} />}
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};
