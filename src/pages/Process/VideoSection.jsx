import React from "react";

const VideoGallery = () => {
  // Sample video data with dummy links
  const videos = [
    {
      id: 1,
      title: "Behind the Treatment",
      src: "https://www.youtube.com/embed/MaFv-SMgHb0?si=2TElVBOxuafm9y2K",
      type: "youtube",
    },
    {
      id: 2,
      title: "Patient Care Process",
      src: "https://www.youtube.com/embed/q6aAQgXauQw?si=FrK5cJKFtHPNJ_-C",
      type: "youtube",
    },
    {
      id: 3,
      title: "Step-by-Step Healing",
      src: "https://www.youtube.com/embed/9c_Bv_FBE-c?si=GZWlNew2botc2mKp",
      type: "youtube",
    },
    {
      id: 4,
      title: "Inside the Procedure",
      src: "https://www.youtube.com/embed/9bZkp7q19f0",
      type: "youtube",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header with Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 ">
            Explore Our Therapy Video's
          </h2>
          <div className="w-20 h-1  mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert-guided sessions, real-life healing stories, and
            tools to support your mental well-being.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 , md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group">
              {/* Video Container */}
              <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="pt-[56.25%] relative">
                  {" "}
                  {/* 16:9 aspect ratio */}
                  {video.type === "youtube" ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white text-sm font-medium">
                      {video.views}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Title and Info */}
              <div className="mt-4">
                <h3 className="text-lg text-center font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
