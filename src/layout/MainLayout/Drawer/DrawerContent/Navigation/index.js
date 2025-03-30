import React, { useState, useEffect } from "react";
import { FaUserTie, FaUsers, FaClipboardCheck, FaUserPlus, FaCog, FaLifeRing, FaChevronDown, FaTachometerAlt } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import "./nav.css"; // Make sure this CSS is included
import logo from '../../../../../assets/images/icons/logo.png';
// import logo from '/assets/images/icons/logo.png';
import { Link } from "react-router-dom";

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hiringOpen, setHiringOpen] = useState(false);
  const [talentOpen, setTalentOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);


  return (
    <nav className={`pc-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="navbar-wrapper">
        {/* Sidebar Header with Logo */}
        <div className="logo" style={{ display: 'flex', justifyContent: "center" }}>
          <Link to="/dashboard">{<img src={logo} alt="logo" style={{ width: '90px' }} />}</Link>
        </div>


        {/* Sidebar Content */}
        <div className="navbar-content">
          <ul className="pc-navbar">
            <li className="pc-item pc-caption">
              <label>Main</label>
            </li>
            <li className="pc-item">
              <Link to="/dashboard" className="pc-link">
                <span className="pc-micon"><FaTachometerAlt /></span>
                {!collapsed && <span className="pc-mtext">Dashboard</span>}
              </Link>
            </li>

            {/* Hiring Management Dropdown */}
            <li className="pc-item pc-dropdown">
              <div className="pc-link dropdown-toggle" onClick={() => setHiringOpen(!hiringOpen)}>
                <span className="pc-micon"><FaUserTie /></span>
                {!collapsed && <span className="pc-mtext" style={{ cursor: "pointer" }}>Hiring Management</span>}
                {!collapsed && <span className="pc-arrow"><FaChevronDown /></span>}
              </div>
              {hiringOpen && (
                <ul className="pc-submenu">
                  <li><Link to="/dashboard/jobs">Open Roles</Link></li>
                  <li><Link to="/dashboard/new-jobs">New Role</Link></li>
                  <li><Link to="/dashboard/job-roles">Existing Roles</Link></li>
                  <li><Link to="/dashboard/new-job-roles">Role Competency</Link></li>
                  <li><Link to="/dashboard/capabilities">Capabilities</Link></li>
                  {/* <li><a href="#">Offers</a></li> */}
                </ul>
              )}
            </li>

            <li className="pc-item pc-dropdown">
              <div className="pc-link dropdown-toggle" onClick={() => setTalentOpen(!talentOpen)}>
                <span className="pc-micon"><FaUserTie /></span>
                {!collapsed && <span className="pc-mtext" style={{ cursor: "pointer" }}>Talent Management</span>}
                {!collapsed && <span className="pc-arrow"><FaChevronDown /></span>}
              </div>
              {talentOpen && (
                <ul className="pc-submenu">
                  <li><Link to="/dashboard/users">User List</Link></li>
                  <li><Link to="/dashboard/new-users">New User</Link></li>
                  <li><Link to="/dashboard/results">Results</Link></li>
                  {/* <li><a href="#">Offers</a></li> */}
                </ul>
              )}
            </li>

            <li className="pc-item pc-dropdown">
              <div className="pc-link dropdown-toggle" onClick={() => setAssessmentOpen(!assessmentOpen)}>
                <span className="pc-micon"><FaUserTie /></span>
                {!collapsed && <span className="pc-mtext" style={{ cursor: "pointer" }}>Assessment Management</span>}
                {!collapsed && <span className="pc-arrow"><FaChevronDown /></span>}
              </div>
              {assessmentOpen && (
                <ul className="pc-submenu">
                  <li><Link to="/dashboard/assessments">Existing Assessment</Link></li>
                  <li><Link to="/dashboard/new-assessments">New Assessment</Link></li>
                  {/* <li><a href="#">Offers</a></li> */}
                </ul>
              )}
            </li>


            <li className="pc-item">
              <Link to="/dashboard/newUsers" className="pc-link">
                <span className="pc-micon"><FaTachometerAlt /></span>
                {!collapsed && <span className="pc-mtext">Create New Organization</span>}
              </Link>
            </li>
            <li className="pc-item">
              <a href="../dashboard/index.html" className="pc-link">
                <span className="pc-micon"><FaUserPlus /></span>
                {!collapsed && <span className="pc-mtext">Inbox</span>}
              </a>
            </li>

            {/* <li className="pc-item">
              <a href="../dashboard/index.html" className="pc-link">
                <span className="pc-micon"><LuBrainCircuit /></span>
                {!collapsed && <span className="pc-mtext"><Link to="https://admin-frontend-self-iota.vercel.app/">Ai++</Link></span>}
              </a>
            </li> */}

            {/* Others Section */}
            <li className="pc-item pc-caption">
              <label>Others</label>
            </li>
            {/* <li className="pc-item">
              <a href="../dashboard/index.html" className="pc-link">
                <span className="pc-micon"><FaCog /></span>
                {!collapsed && <span className="pc-mtext">Settings</span>}
              </a>
            </li> */}
            <li className="pc-item">
              <a href="../dashboard/index.html" className="pc-link">
                <span className="pc-micon"><FaLifeRing /></span>
                {!collapsed && <span className="pc-mtext">Support</span>}
              </a>
            </li>

            {/* Book a Demo Button */}
            <div className="card-nav text-center mb-[1rem]">
              <Link
                to="https://admin-frontend-self-iota.vercel.app/dashboard/ai-assessments"
                className="btn btn-secondary flex items-center justify-center gap-1 font-semibold"
              >
                <span className="pc-micon">
                  <LuBrainCircuit />
                </span>
                {!collapsed && <span>Ai++</span>}
              </Link>
            </div>

            <div className="card-nav text-center">
              <a href="https://codedthemes.com/item/berry-bootstrap-5-admin-template/" target="_blank" className="btn btn-secondary">
                {!collapsed && "Book a Demo"}
              </a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
