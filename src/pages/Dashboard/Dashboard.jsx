import React from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Listing from "../DashboardPages/Listing";
import ManageQuestions from "../DashboardPages/ManageQuestions";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Listing />
      <ManageQuestions />
    </div>
  );
}

export default Dashboard;
