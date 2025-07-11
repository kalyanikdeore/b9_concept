import { FaUserInjured, FaUserMd, FaStethoscope } from "react-icons/fa";

const StatsSection = () => {
  return (
    <div className="bg-[#1f6572] text-white py-10 w-385">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {/* Patients Every Day */}
        <div className="flex items-center justify-center">
          <FaUserInjured size={50} />
          <div className="ml-4">
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="text-lg">Patients Every Day</p>
          </div>
        </div>

        {/* Qualified Doctors */}
        <div className="flex items-center justify-center">
          <FaUserMd size={50} />
          <div className="ml-4">
            <h2 className="text-4xl font-bold">600+</h2>
            <p className="text-lg">Qualified Doctors</p>
          </div>
        </div>

        {/* Years Experience */}
        <div className="flex items-center justify-center">
          <FaUserMd size={50} />
          <div className="ml-4">
            <h2 className="text-4xl font-bold">12+</h2>
            <p className="text-lg">Years Experience</p>
          </div>
        </div>

        {/* Diagnosis Verity */}
        <div className="flex items-center justify-center">
          <FaStethoscope size={50} />
          <div className="ml-4">
            <h2 className="text-4xl font-bold">350+</h2>
            <p className="text-lg">Diagnosis Verity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
