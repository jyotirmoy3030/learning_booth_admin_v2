import React, { useState, useEffect } from "react";
import { FaUserTie, FaUsers, FaGlobe, FaClipboardCheck, FaUserPlus, FaCog, FaLifeRing, FaChevronDown, FaTachometerAlt } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import "./nav.css"; // Make sure this CSS is included
import logo from '../../../../../assets/images/icons/logo.png';
// import logo from '/assets/images/icons/logo.png';
import { Link } from "react-router-dom";
import { checkAuth } from "../../../../../services/Auth/Login";
const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hiringOpen, setHiringOpen] = useState(false);
  const [talentOpen, setTalentOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    (async () => {
      let permission = await checkAuth();
      setPermission(permission.data.permissions)
    })();
  }, []);

  return (
    <nav className={`pc-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="navbar-wrapper">
        {/* Sidebar Header with Logo */}
        <div className="logo" style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/dashboard">
            <img src={logo} alt="logo" style={{ width: "90px" }} />
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="navbar-content">
          <ul className="pc-navbar">
            <li className="pc-item pc-caption">
              <label>Main</label>
            </li>

            {/* Dashboard (Always visible) */}
            <li className="pc-item">
              <Link to="/dashboard" className="pc-link">
                <span className="pc-micon"><FaTachometerAlt /></span>
                {!collapsed && <span className="pc-mtext">Dashboard</span>}
              </Link>
            </li>

            {/* Hiring Management */}
            {permission.includes("Jobs") || permission.includes("Job Roles") || permission.includes("Capabilities") ? (
              <li className="pc-item pc-dropdown">
                <div className="pc-link dropdown-toggle" onClick={() => setHiringOpen(!hiringOpen)}>
                  <span className="pc-micon"><FaUserTie /></span>
                  {!collapsed && <span className="pc-mtext">Hiring Management</span>}
                  {!collapsed && <span className="pc-arrow"><FaChevronDown /></span>}
                </div>
                {hiringOpen && (
                  <ul className="pc-submenu">
                    {permission.includes("Jobs") && <li><Link to="/dashboard/jobs">Open Roles</Link></li>}
                    {permission.includes("Jobs") && <li><Link to="/dashboard/new-jobs">New Role</Link></li>}
                    {permission.includes("Job Roles") && <li><Link to="/dashboard/job-roles">Existing Roles</Link></li>}
                    {permission.includes("Job Roles") && <li><Link to="/dashboard/new-job-roles">Role Competency</Link></li>}
                    {permission.includes("Capabilities") && <li><Link to="/dashboard/capabilities">Capabilities</Link></li>}
                  </ul>
                )}
              </li>
            ) : null}

            {/* Talent Management */}
            {permission.includes("Users") || permission.includes("Results") ? (
              <li className="pc-item pc-dropdown">
                <div className="pc-link dropdown-toggle" onClick={() => setTalentOpen(!talentOpen)}>
                  <span className="pc-micon"><FaUserTie /></span>
                  {!collapsed && <span className="pc-mtext">Talent Management</span>}
                  {!collapsed && <span className="pc-arrow"><FaChevronDown /></span>}
                </div>
                {talentOpen && (
                  <ul className="pc-submenu">
                    {permission.includes("Users") && <li><Link to="/dashboard/users">User List</Link></li>}
                    {permission.includes("New Users") && <li><Link to="/dashboard/new-users">New User</Link></li>}
                    {permission.includes("Results") && <li><Link to="/dashboard/results">Results</Link></li>}
                  </ul>
                )}
              </li>
            ) : null}

            {/* Assessment Management */}
            {permission.includes("Assessments") ? (
              <li className="pc-item pc-dropdown">
                <div className="pc-link dropdown-toggle" onClick={() => setAssessmentOpen(!assessmentOpen)}>
                  <span className="pc-micon"><FaUserTie /></span>
                  {!collapsed && <span className="pc-mtext">Assessment Management</span>}
                  {!collapsed && <span className="pc-arrow"><FaChevronDown /></span>}
                </div>
                {assessmentOpen && (
                  <ul className="pc-submenu">
                    <li><Link to="/dashboard/assessments">Existing Assessment</Link></li>
                    <li><Link to="/dashboard/new-assessments">New Assessment</Link></li>
                  </ul>
                )}
              </li>
            ) : null}

            {/* Other Individual Links */}
            {permission.includes("New Users") && (
              <li className="pc-item">
                <Link to="/dashboard/newUsers" className="pc-link">
                  <span className="pc-micon"><FaTachometerAlt /></span>
                  {!collapsed && <span className="pc-mtext">Create New Organization</span>}
                </Link>
              </li>
            )}

            {/* Inbox
            <li className="pc-item">
              <a href="../dashboard/index.html" className="pc-link">
                <span className="pc-micon"><FaUserPlus /></span>
                {!collapsed && <span className="pc-mtext">Inbox</span>}
              </a>
            </li> */}

            {/* <li className="pc-item pc-caption">
              <label>Others</label>
            </li> */}
            {/* Support */}
            {/* <li className="pc-item">
              <a href="" className="pc-link">
                <span className="pc-micon"><FaLifeRing /></span>
                {!collapsed && <span className="pc-mtext">Support</span>}
              </a>
            </li> */}


            {/* AI++ Section */}
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

            {/* Book a Demo */}
            <div className="card-nav text-center">
              <a
                href="https://codedthemes.com/item/berry-bootstrap-5-admin-template/"
                target="_blank"
                className="btn btn-secondary"
              >
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
