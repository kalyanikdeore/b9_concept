import { useState } from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const Signup = () => {
  const [formData, setFormData] = useState({});
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await signup(formData);
    if (response.success) navigate("/appointment");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#9ea4af",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "900px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* Left Column - Image & Welcome */}
        <div
          style={{
            flex: 1,
            backgroundImage:
              "url('https://t4.ftcdn.net/jpg/04/24/30/93/240_F_424309320_UkOxg2z3sq7yXwGnWCO6xBXkRI4byhnI.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Welcome to B9 CONCEPT
        </div>

        {/* Right Column - Form */}
        <div className="text-center" style={{ flex: 1.2, padding: "3rem" }}>
          <h1 className="2xl font-bold text-gray-900">B9 CONCEPT</h1>
          <p style={{ marginBottom: "1.5rem" }}>
            Already have an account?{" "}
            <a href="/login" className="text-gray-800 font-semibold">
              Login
            </a>
          </p>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Full Name"
              name="username"
              rules={[
                { required: true, message: "Please enter your FullName" },
              ]}
            >
              <Input
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="Enter Your Full Name "
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input onChange={(e) => handleChange("email", e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Select
                onChange={(value) => handleChange("gender", value)}
                placeholder="Select gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              ]}
            >
              <Input
                onChange={(e) => handleChange("phone", e.target.value)}
                maxLength={10}
                placeholder="Enter phone number"
              />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please select your date of birth" },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                onChange={(date, dateString) => handleChange("dob", dateString)}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="City / Country"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please enter your city and country",
                },
              ]}
            >
              <Input onChange={(e) => handleChange("city", e.target.value)} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#323232",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
