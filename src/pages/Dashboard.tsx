import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div id="dashboard">
      <Navbar />
      <div className=" tabs-underline">
        <div className="max-w-screen-xl  mx-auto tabs"></div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
