import React, { useState, useEffect } from "react";
import axios from "axios";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "http://localhost:8000/api/testimonials",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          setTestimonials(response.data.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error loading testimonials"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="h-24 bg-gray-200 rounded mb-6"></div>
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Patient Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from those who've experienced healing through our therapy
            programs
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <blockquote className="text-lg text-gray-700 mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center mt-auto">
                  <div className="flex-shrink-0 mr-4">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
              <p className="text-gray-500 text-lg">
                No testimonials available at this time. Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;
