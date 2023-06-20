import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UsersTable from "@/components/UsersTable";

const Dashboard = () => {
  return (
    <div id="dashboard">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <UsersTable />
      </div>
    </div>
  );
};

export default Dashboard;
