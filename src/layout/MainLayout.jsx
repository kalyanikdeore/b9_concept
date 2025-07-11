// import React from "react";
// import { Outlet, useLocation, useSearchParams } from "react-router-dom";

// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import Contentwrapper from "../components/Contentwrapper/Contentwrapper";
// function Layout() {
//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   const isHomePageLogin =
//     location.pathname === "/" ||
//     location.pathname === "/Login" ||
//     location.pathname === "/Signup";

//   return (
//     <>
//       <Navbar />

//       <Outlet />

//       <Footer />
//     </>
//   );
// }
// export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase(); // Ensure lowercase for comparison

  const hideNavbar =
    path === "/login" ||
    path === "/signup" ||
    path === "/appointment" ||
    path === "/adminlogin" ||
    path === "/admindashboard" ||
    path === "/user-dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Outlet />
      {!hideNavbar && <Footer />}
    </>
  );
}
export default Layout;
