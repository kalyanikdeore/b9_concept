import useAuthStore from "../../store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log("Login Response:", response);

      if (response.success && response.user) {
        const role = response.user.role?.toLowerCase(); // toLowerCase for safety
        console.log("User Role:", role);

        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "user") {
          navigate("/appointment");
        } else {
          console.warn("Unknown user role:", role);
        }
      } else {
        console.error("Login failed: Invalid credentials or server error.");
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 px-4">
      <div className="flex w-full max-w-4xl h-120 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://t4.ftcdn.net/jpg/04/24/30/93/240_F_424309320_UkOxg2z3sq7yXwGnWCO6xBXkRI4byhnI.jpg"
            alt="Girl"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-10 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">
              Welcome to B9 CONCEPT
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-gray-900 font-extrabold mb-6 text-center">
              B9 CONCEPT
            </h1>

            <div className="mb-4 text-sm text-center">
              <a href="/signup" className="text-gray-700">
                Don't have an account?{" "}
                <span className="text-gray-800 font-semibold hover:underline">
                  Sign Up Now
                </span>
              </a>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">
                Email*
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-semibold text-gray-700">
                Password*
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-gray-300 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold w-full py-2 rounded-md transition duration-300"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
