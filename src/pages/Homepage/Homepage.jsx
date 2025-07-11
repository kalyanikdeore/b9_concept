import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ab92, ab91, ab93, b992, video3 } from "../../assets";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServicesSection from "./ServicesSection";
import FeatureSection from "./FeatureSection";
import Accordion from "./Accordion";
import DepartmentSection from "./DepartmentSection";
import NewsletterSection from "./NewsletterSection";
import ReliableServices from "./ReliableServices";
import ClientCarousel from "./ClientCarousel";
import Appointment from "./Appointment";
import PopupModal from "../Model/PopupModel";
import Aboutb9 from "./Aboutb9";
import CallToAction from "../Process/CallToAction";
import axios from "axios";
import HeroSection from "./Herosection/Herosection";
import WhyB9Concept from "./WhyB9Concept";

// export const HeroSection = () => {
//   const [heroContent, setHeroContent] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHeroContent = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/hero-sections",
//           {
//             headers: {
//               Accept: "application/json",
//             },
//             timeout: 5000, // 5 second timeout
//           }
//         );

//         if (response.data.success && response.data.data.length > 0) {
//           setHeroContent(response.data.data);
//         } else {
//           setError("No hero content available");
//         }
//       } catch (error) {
//         console.error("Error fetching hero content:", error);
//         setError(
//           error.response?.data?.message || "Failed to load hero content"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHeroContent();
//   }, []);

//   useEffect(() => {
//     if (heroContent.length > 1) {
//       // Only auto-rotate if we have multiple items
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % heroContent.length);
//       }, 5000); // 5 seconds
//       return () => clearInterval(interval);
//     }
//   }, [heroContent]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[560px] md:h-[700px] bg-gray-100">
//         <div className="animate-pulse text-gray-500">
//           Loading hero content...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-[560px] md:h-[700px] bg-gray-100 text-red-500">
//         {error}
//       </div>
//     );
//   }

//   if (heroContent.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-[560px] md:h-[700px] bg-gray-100 text-gray-500">
//         No hero content available
//       </div>
//     );
//   }

//   const currentHero = heroContent[currentIndex];
//   const { title, description, video_path } = currentHero;

//   return (
//     <div className="relative shadow-2xl w-full h-[560px] md:h-[700px] flex items-center justify-center text-white overflow-hidden rounded-bl-[40%] md:rounded-bl-[20%] rounded-tr-[40%] md:rounded-tr-[20%]">
//       {/* Background Video */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden">
//         <video
//           className="w-full h-full object-cover"
//           src={`http://localhost:8000/storage/${video_path}`}
//           autoPlay
//           muted
//           loop
//           playsInline
//         />
//         <div className="absolute inset-0 bg-black/20"></div>
//       </div>

//       {/* Content */}
//       <motion.div
//         key={currentIndex}
//         className="relative z-10 text-center max-w-4xl mx-auto px-4"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <motion.h1
//           className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white drop-shadow-lg"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//         >
//           {title}
//         </motion.h1>

//         <motion.p
//           className="mt-4 text-lg sm:text-xl text-gray-200"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//         >
//           {description}
//         </motion.p>
//       </motion.div>

//       {/* Navigation dots if multiple items */}
//       {heroContent.length > 1 && (
//         <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
//           {heroContent.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentIndex ? "bg-white" : "bg-white/50"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

function Homepage() {
  return (
    <div>
      <HeroSection />
      <Aboutb9 />
      <PopupModal />

      {/* <Appointment /> */}
      <ServicesSection />
      <CallToAction />
      <DepartmentSection />
      <NewsletterSection />
      <WhyB9Concept />
      {/* <ReliableServices /> */}
      <ClientCarousel />
      {/* <FeatureSection /> */}
      <Accordion />
    </div>
  );
}

export default Homepage;
