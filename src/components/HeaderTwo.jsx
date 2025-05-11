import React, { useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { getAllStats } from "services/Master/Stats";

import dotsIcon from "../assets/new-dashboard-img/Icon.svg";
import plusIcon from "../assets/new-dashboard-img/Icon-1.svg";
import angleDown from "../assets/new-dashboard-img/arrow-down.svg";
import search from "../assets/new-dashboard-img/Search.svg";
import plussign from "../assets/new-dashboard-img/plussign.svg";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

import { getAllJobs } from "services/Master/Job";
import { getAllUsers } from "services/Master/Users";
import { deleteResult, getAllResults, getAllCandidateWithScore } from "services/Master/Results";
import { getAllTestsApi } from 'services/Master/Tests';
// import { GiSkills } from "react-icons/gi";
import { Table } from "antd";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import centerImage from "../assets/images/arrow.png";
import dots from "../assets/images/dots.png";
import card_icon from "../assets/images/card_icon1.png";
import briefcase from "../assets/images/briefcase.png";
import plus from "../assets/images/plus.png";
import skill from "../assets/images/skill.png";


const HeaderTwo = () => {

  return (
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-4 px-4 md:px-6 pb-6 gap-4">
        {/* Welcome Text */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[20px] md:text-[24px] text-[#141414]">Hello, Admin! 👋</span>
          <span className="font-medium text-[12px] text-[#989ca0]">
            Welcome back, track your team progress here!
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
          {/* Post New Job */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-solid border-[#dcdddf] cursor-pointer w-full md:w-auto">
            <div className="justify-center items-center w-5 h-5">
              <img src={briefcase} alt="briefcase" />
            </div>
            <span className="font-bold text-[14px] text-[#141414]">
              <Link to="/dashboard/jobs">Post New Job</Link>
            </span>
          </div>

          {/* Add Employee */}
          <div className="flex items-center gap-2 bg-[#263238] px-4 py-3 rounded-lg cursor-pointer w-full md:w-auto">
            <div className="justify-center items-center w-5 h-5">
              <img src={plus} alt="plus" />
            </div>
            <span className="font-bold text-[14px] text-white">
              <Link to="/dashboard/users">Add Employee</Link>
            </span>
          </div>

          {/* Skills To Hire */}
          <div className="flex items-center gap-2 bg-[#ffc727] px-4 py-3 rounded-lg cursor-pointer w-full md:w-auto">
            <div className="justify-center items-center w-5 h-5">
              <img src={skill} alt="skill" />
            </div>
            <span className="font-bold text-[14px] text-white">
              <Link to="/dashboard/road_to_content">Skills To Hire</Link>
            </span>
          </div>
        </div>
      </div>
  );
};

export default HeaderTwo;
