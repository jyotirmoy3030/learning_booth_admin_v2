// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { checkAuth } from "services/Auth/Login";
import React, { useEffect, useState } from 'react';
import {
  UserOutlined,
  UserAddOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
const icons = {
  UserOutlined,
  UserAddOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
};

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call here
        const response = await checkAuth();
        const data = response.data.permissions;
        setDataArray(data); // Assuming data is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
   
  let masterMenuChild = [];
  dataArray.forEach(function(data) {
      console.log(data);
      if(data === 'Capabilities') {
        masterMenuChild.push(
          {
            id: 'capabilies',
            title: 'Capabilities',
            type: 'item',
            url: '/dashboard/capabilities',
            icon: icons.UserOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Job Role') {
        masterMenuChild.push(
          {
            id: 'jobRole',
            title: 'Job Role',
            type: 'item',
            url: '/dashboard/job-roles',
            icon: icons.UserOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Jobs') {
        masterMenuChild.push(
          {
            id: 'jobs',
            title: 'Jobs',
            type: 'item',
            url: '/dashboard/jobs',
            icon: icons.UserAddOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Courses') {
        masterMenuChild.push(
          {
            id: 'courses',
            title: 'Courses',
            type: 'item',
            url: '/dashboard/courses',
            icon: icons.SnippetsOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Assessments') {
        masterMenuChild.push(
          {
            id: 'assessments',
            title: 'Assessments',
            type: 'item',
            url: '/dashboard/assessments',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Users') {
        masterMenuChild.push(
          {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/dashboard/users',
            icon: icons.UserOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Results') {
        masterMenuChild.push(
          {
            id: 'results',
            title: 'Results',
            type: 'item',
            url: '/dashboard/results',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'New Users') {
        masterMenuChild.push(
          {
            id: 'newUsers',
            title: 'New Users',
            type: 'item',
            url: '/dashboard/newUsers',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Website Content') {
        masterMenuChild.push(
          {
            id: 'websiteContent',
            title: 'Website Content',
            type: 'item',
            url: '/dashboard/websiteContent',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false,
          }
        );
      } else if (data === 'Demo Requests') {
        masterMenuChild.push(
          {
            id: 'demos',
            title: 'Demo Requests',
            type: 'item',
            url: '/dashboard/demo-requests',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false,
          }
        );
      }
  });

  let masterMenu = {
    id: 'group-master',
    title: 'Master',
    type: 'group',
    children: masterMenuChild
  };
  let dashboardMenu = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: icons.DashboardOutlined,
        breadcrumbs: false,
      },
    ],
  };
  let totalMenuItem = {
    items: [dashboardMenu, masterMenu ],
  };
  const navGroups = totalMenuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
