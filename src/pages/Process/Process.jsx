import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CallToAction from "../Process/CallToAction";
import ProcessAchievements from "./ProcessAchievements";
import VideoSection from "./VideoSection";
import Assessment from "./Assessments";
import Department from "./Department";
import AboutProcess from "./AboutProcess";
import Practiced from "./Practiced";

// Hero Section
const HeroSection = () => {
  return (
    <div
      className="relative  bg-cover bg-center h-130 py-44 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://static.wixstatic.com/media/0f53d6_18b94b7d38c94bceaef623698ea022fe~mv2.jpg/v1/fill/w_1701,h_691,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0f53d6_18b94b7d38c94bceaef623698ea022fe~mv2.jpg')",
      }}
    >
      <div className="bg-opacity-80 w-full h-full absolute top-0 left-0"></div>
      <div className="relative text-center text-white z-10">
        <h1 className="text-5xl mb-6 font-bold">Nature Informed Therapy</h1>
        <h3 className="italic  mt-1">
          Where Nature Meets Nurture: A New Approach to Mental Health
        </h3>
      </div>
    </div>
  );
};

// Main Process Component
function Process() {
  return (
    <div>
      <HeroSection />
      <AboutProcess />
      <Practiced />
      {/* <Department /> */}
      {/* <CallToAction /> */}
      {/* <ProcessAchievements /> */}
      <Assessment />
      {/* <VideoSection /> */}
    </div>
  );
}

export default Process;
