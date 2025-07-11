import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Upload } from "antd";
import { UploadOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import AwardAchievement from "./AwardAchievement";
import MediaFeatures from "./MediaFeatures";
import CommunityImpact from "./CommunityImpact";
import CallToAction from "./CallToAction";
import axios from "axios";

const ProjectsSection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/patient-stories"
        );
        if (response.data.success) {
          setStories(response.data.data);
        } else {
          setError("Failed to fetch stories");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 mt-25 text-center">
        <p>Loading patient stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 mt-25 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto p-8 mt-25"
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-palanquin text-center text-lg m-2 md:text-4xl font-bold"
      >
        Patients Share Their Incredible Recovery Stories
      </motion.h1>
      {/* <p className="text-md md:text-lg text-center text-gray-600">
        Inspiring Journeys of Recovery and Success
      </p> */}
      <p className="text-center text-md font-extralight md:text-lg text-gray-700 max-w-2xl mx-auto mt-2">
        Hear from our patients as they share their incredible stories of
        resilience, healing, and transformation. Their experiences inspire hope
        and highlight the impact of our dedicated care.
      </p>
      {/* Stories Section */}
      {/* <h2 className="text-xl font-semibold mt-10 text-center text-gray-600">
        Our Patient's Stories
      </h2> */}
      {stories.length === 0 ? (
        <div className="text-center mt-10">
          <p>No patient stories available yet.</p>
        </div>
      ) : (
        <Row gutter={[24, 24]} className="mt-6 font-palanquin">
          {stories.map((story, index) => (
            <Col xs={24} sm={12} md={6} key={story.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  bordered={false}
                  className="shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 p-3 h-full"
                  cover={
                    story.image ? (
                      <img
                        // src={story.image}
                        src={`http://localhost:8000/storage/${story.image}`}
                        alt={story.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )
                  }
                >
                  <h3 className="font-palanquin font-bold text-gray-700 text-lg">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 font-extralight">
                    {story.description}
                  </p>
                  {story.is_featured && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                      Featured
                    </span>
                  )}
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
      <MediaFeatures />
      <CommunityImpact />
      <AwardAchievement />
    </motion.div>
  );
};

export default ProjectsSection;
