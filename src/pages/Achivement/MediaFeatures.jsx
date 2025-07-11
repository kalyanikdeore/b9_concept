import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoPlayer = ({ youtubeUrl, title, description }) => {
  // Validate YouTube URL
  const isValidYoutubeUrl = (url) => {
    if (!url) return false;
    const pattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  if (!isValidYoutubeUrl(youtubeUrl)) {
    return (
      <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
        <p className="text-gray-500">No video available</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
        <iframe
          className="w-full h-full shadow"
          src={youtubeUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      {title && (
        <h3 className="text-xl font-semibold mt-4 text-gray-800">{title}</h3>
      )}
      {description && <p className="text-gray-600 mt-2">{description}</p>}
    </>
  );
};

const HealthTherapyFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuresResponse = await axios.get(
          "http://localhost:8000/api/therapy-features"
        );

        const activeFeatures = featuresResponse.data
          .filter((feature) => feature.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);

        setFeatures(activeFeatures);

        // Find the first active feature with a video
        const videoFeature = activeFeatures.find(
          (feature) => feature.has_video && feature.youtube_url
        );

        if (videoFeature) {
          setVideoData({
            youtube_url: videoFeature.youtube_url,
            video_title: videoFeature.video_title || "",
            video_description: videoFeature.video_description || "",
          });
        }
        // No else case - we'll let the VideoPlayer handle no video case

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching therapy features:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 h-[400px] bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="w-full lg:w-1/2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full h-10 w-10 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2s-2 .896-2 2s.896 2 2 2zM2 12c0 5.523 4.478 10 10 10s10-4.477 10-10s-4.478-10-10-10S2 6.477 2 12zm10 4c-1.104 0-2 .896-2 2v2h4v-2c0-1.104-.896-2-2-2z"
      />
    </svg>
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Video Player */}
          <div className="w-full lg:w-1/2">
            <VideoPlayer
              youtubeUrl={videoData?.youtube_url}
              title={videoData?.video_title}
              description={videoData?.video_description}
            />
          </div>

          {/* Right Column - Features List */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-full text-gray-600 flex-shrink-0">
                      {feature.icon ? (
                        <img
                          src={feature.icon}
                          alt={feature.title}
                          className="h-6 w-6"
                          loading="lazy"
                        />
                      ) : (
                        defaultIcon
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No therapy features available at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTherapyFeatures;
