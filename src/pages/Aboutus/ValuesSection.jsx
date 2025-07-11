import React, { useState, useEffect } from "react";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/values");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-white text-center">Loading testimonials...</div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <blockquote className="text-lg text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                      {testimonial.avatar}
                    </div>
                  </div>
                )}
                <div>
                  {testimonial.author && (
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                  )}
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
