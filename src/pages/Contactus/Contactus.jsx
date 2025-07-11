import React from "react";
import { Input, Button, Form, Card } from "antd";
import {
  IoCallOutline,
  IoMailOpenOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";

const { TextArea } = Input;

const Contact = () => {
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="px-4 sm:px-6 md:px-12 lg:px-20 py-40"
    >
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-600 py-7 text-center">
        Contact Us
      </h1>

      {/* Row 1 - Two Columns (Map & Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1 - Google Map */}
        <motion.iframe
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          title="Google Map"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[410px] rounded-lg border border-gray-300 shadow-md"
          src="https://www.google.com/maps/embed?pb=..."
          allowFullScreen
          loading="lazy"
        />

        {/* Column 2 - Contact Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-lg p-6">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter your message!" },
                ]}
              >
                <TextArea rows={4} placeholder="Write your message here..." />
              </Form.Item>
              <div className="flex justify-between mt-4">
                <Button
                  className="w-full font-bold sm:w-auto"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </motion.div>
      </div>

      {/* Row 2 - Contact Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center py-10 gap-6 mt-8">
        {[
          { icon: <IoCallOutline />, text: "+91 9403455116" },
          { icon: <IoMailOpenOutline />, text: "b9concept123@gmail.com" },
          {
            icon: <IoLocationOutline />,
            text: "123 Greenway Street, EcoCity, Earth.",
          },
          {
            icon: <IoTimeOutline />,
            text: "Monday - Saturday\nSunday - Closed",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center p-6 bg-white shadow-md hover:bg-gray-50 transition-all w-full h-[200px] rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-gray-900 text-xl sm:text-2xl border-2 border-[#a89899] rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-gray-500 hover:text-gray-500"
            >
              {item.icon}
            </motion.div>
            <span className="text-gray-700 mt-4 text-center whitespace-pre-wrap">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Contact;
