import { useState } from "react";

export default function ServiceSelection() {
  const services = [
    {
      name: "Acupuncture",
      image: "http://localhost:5173/src/assets/Images/b91.jpg",
      title: "Acupuncture Therapy",
      description:
        "Acupuncture involves the insertion of very thin needles guided relaxation, guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused guided relaxation, intense concentration, and focused intense concentration, and focused guided relaxation, intense concentration, and focused intense concentration, and focused guided relaxation, intense concentration, and focused  through your skin at strategic points on your body. Acupuncture involves the insertion of very thin needles through your skin at strategic points on your Acupuncture involves the insertion of very thin needles through your skin at strategic points on your body  body",
    },
    {
      name: "Hypnotherapy",
      image: "http://localhost:5173/src/assets/Images/b91.jpg",
      title: "Hypnotherapy Treatment",
      description:
        "Hypnotherapy uses guided relaxation, intense concentration, and focused attention to achieve a heightened state of awareness.Acupuncture involves the insertion of very thin needles through your skin at strategic points Acupuncture involves the insertion of very thin needles through your skin at strategic points on your bodyAcupuncture involves the insertion of very thin needles through your skin at strategic points on your body on your body",
    },
    {
      name: "Chiropractic",
      image: "http://localhost:5173/src/assets/Images/b91.jpg",
      title: "Chiropractic Care",
      description:
        "Chiropractic is a hands-on therapy focusing on spinal adjustments to relieve pain and improve function. Acupuncture involves the insertion of very thin needles through your skin at strategic points on your Acupuncture involves the insertion of very thin needles through your skin at strategic points on your bodyAcupuncture involves the insertion of very thin needles through your skin at strategic points on your body body",
    },
    {
      name: "Massage",
      image: "http://localhost:5173/src/assets/Images/b91.jpg",
      title: "Massage Therapy",
      description:
        "Massage therapy involves manipulating the body's soft tissues to enhance a person's health and well-being. Acupuncture involves the insertion of very thin needles through your skin at strategic points on your Acupuncture involves the insertion of very thin needles through your skin at strategic points on your bodyAcupuncture involves the insertion of very thin needles through your skin at strategic points on your body body",
    },
    {
      name: "Physiotherapy",
      image: "http://localhost:5173/src/assets/Images/b91.jpg",
      title: "Physiotherapy Treatment",
      description:
        "Physiotherapy helps restore movement and function when someone is affected by injury, illness, or disability. Acupuncture involves the insertion of very thin needles through your skin at strategic points on your bodyAcupuncture involves the insertion of very thin needles through your skin at strategic points on your body Acupuncture involves the insertion of very thin needles through your skin at strategic points on your body",
    },
    {
      name: "Reflexology",
      image: "http://localhost:5173/src/assets/Images/b91.jpg",
      title: "Reflexology Is Pressure Zone Therapy",
      description:
        "Application Acupuncture involves the insertion of very thin needles through your skin at strategic points on your bodyAcupuncture involves the insertion of very thin needles through your skin at strategic points on your body of pressure to the feet and hands with specific thumb, finger, and hand techniques without the use of oil or lotion.Acupuncture involves the insertion of very thin needles through your skin at strategic points on your body",
    },
  ];

  const [selectedService, setSelectedService] = useState(services[5]);

  return (
    <div className="min-h-screen mb-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-700">Select a Service</h2>
      <div className="border-b-2 border-gray-300 mt-1 w-16 mb-6"></div>

      {/* Service Tabs */}
      <div className="bg-white shadow-md rounded-lg p-3 flex flex-wrap gap-3 md:gap-13">
        {services.map((service) => (
          <button
            key={service.name}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
              selectedService.name === service.name
                ? "bg-orange-400 text-white"
                : "text-blue-500 hover:text-orange-700"
            }`}
            onClick={() => setSelectedService(service)}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="mt-10 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        <img
          src={selectedService.image}
          alt={selectedService.name}
          className="w-full md:w-2/5 rounded-lg" // Set image width to 2/6 (one-third)
        />

        <div className="md:w-4/6 flex flex-col justify-center">
          {" "}
          {/* Set text width to 4/6 */}
          <h3 className="text-2xl font-bold text-gray-700">
            {selectedService.title}
          </h3>
          <p className="text-gray-600 mt-3">{selectedService.description}</p>
        </div>
      </div>
    </div>
  );
}
