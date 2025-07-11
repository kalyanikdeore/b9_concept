import React, { useEffect, useState } from "react";

const ProcessResilience = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    title: "",
    description: "",
    videos: [],
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/process-resilience"
        );
        const data = await response.json();

        // Create videos array from video1 and video2 fields
        const videos = [];
        if (data.video1) videos.push(data.video1);
        if (data.video2) videos.push(data.video2);

        setContent({
          title: data.title,
          description: data.description,
          videos: videos,
        });
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-200 text-center py-16 px-4">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 text-center py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{content.title}</h2>
      <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-800 mb-10 leading-relaxed">
        {content.description}
      </p>

      <div className="flex flex-col justify-center gap-6 p-4">
        {content.videos.length > 0 ? (
          content.videos.map((video, index) => (
            <video
              key={index}
              controls
              className="w-full md:w-2/3 mx-auto rounded-md shadow-lg"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))
        ) : (
          <p className="text-gray-500">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default ProcessResilience;
