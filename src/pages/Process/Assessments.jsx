import { useState } from "react";

export default function TherapyPlatform() {
  const [activeTab, setActiveTab] = useState("methods");
  const [selectedMethod, setSelectedMethod] = useState(null);

  const TherapyMethods = [
    {
      name: "Cognitive Behavioral Therapy (CBT)",
      description:
        "A structured, goal-oriented psychotherapy that addresses negative thought patterns to change unwanted behavior patterns.",
      icon: "🧠",
      benefits: [
        "Effective for anxiety/depression",
        "Short-term focused",
        "Skill-building approach",
      ],
    },
    {
      name: "EMDR",
      description:
        "Eye Movement Desensitization and Reprocessing therapy helps process traumatic memories through bilateral stimulation.",
      icon: "👀",
      benefits: [
        "Trauma treatment",
        "Memory processing",
        "Somatic integration",
      ],
    },
    {
      name: "Somatic Therapy",
      description:
        "Focuses on bodily sensations to release trauma stored in the body and regulate the nervous system.",
      icon: "💆",
      benefits: [
        "Body awareness",
        "Trauma release",
        "Nervous system regulation",
      ],
    },
    {
      name: "Mindfulness-Based",
      description:
        "Incorporates meditation practices to develop present-moment awareness and reduce reactivity.",
      icon: "🧘",
      benefits: ["Stress reduction", "Emotional regulation", "Present-focused"],
    },
  ];

  const techFeatures = [
    {
      name: "Telehealth Integration",
      description:
        "Secure video sessions with screen sharing and virtual whiteboard capabilities.",
    },
    {
      name: "AI Progress Analytics",
      description:
        "Machine learning tracks treatment progress and suggests protocol adjustments.",
    },
    {
      name: "Digital Journaling",
      description:
        "Client journal with sentiment analysis and pattern detection.",
    },
    {
      name: "VR Exposure Therapy",
      description:
        "Virtual reality environments for controlled exposure scenarios.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl text-center font-bold mb-2">
          Evidence-Based Therapy Platform
        </h1>
        <p className="text-lg text-center text-gray-700">
          Combining proven therapeutic methods with modern technology for
          optimal outcomes
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("methods")}
            className={`px-6 py-3 font-medium ${
              activeTab === "methods"
                ? "text-gray-600 border-b-2 border-gray-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Therapeutic Methods
          </button>
          <button
            onClick={() => setActiveTab("technology")}
            className={`px-6 py-3 font-medium ${
              activeTab === "technology"
                ? "text-gray-600 border-b-2 border-gray-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Technology Integration
          </button>
        </div>

        {activeTab === "methods" && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TherapyMethods.map((method) => (
              <div
                key={method.name}
                onClick={() =>
                  setSelectedMethod(
                    selectedMethod?.name === method.name ? null : method
                  )
                }
                className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedMethod?.name === method.name
                    ? "ring-2 ring-gray-500 scale-105"
                    : "hover:shadow-lg"
                }`}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {method.name}
                  </h3>
                  <p className="text-black-600 mb-4">{method.description}</p>

                  {selectedMethod?.name === method.name && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Key Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {method.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-black-500 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-black-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "technology" && (
          <div className="grid gap-6 md:grid-cols-2">
            {techFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg mr-4">
                      <svg
                        className="h-6 w-6 text-black-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-14">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
