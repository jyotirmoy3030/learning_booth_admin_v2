// assets
import {
  UserOutlined,
  UserAddOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

// icons />
const icons = {
  UserOutlined,
  UserAddOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-master',
  title: 'Master',
  type: 'group',
  children: [
    {
      id: 'capabilies',
      title: 'Capabilities',
      type: 'item',
      url: '/dashboard/capabilities',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },

    {
      id: 'jobRole',
      title: 'Job Role',
      type: 'item',
      url: '/dashboard/job-roles',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },

    {
      id: 'jobs',
      title: 'Jobs',
      type: 'item',
      url: '/dashboard/jobs',
      icon: icons.UserAddOutlined,
      breadcrumbs: false,
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'item',
      url: '/dashboard/courses',
      icon: icons.SnippetsOutlined,
      breadcrumbs: false,
    },
    {
      id: 'assessments',
      title: 'Assessments',
      type: 'item',
      url: '/dashboard/assessments',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false,
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: 'results',
      title: 'Results',
      type: 'item',
      url: '/dashboard/results',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false,
    },
    {
      id: 'newUsers',
      title: 'New Users',
      type: 'item',
      url: '/dashboard/newUsers',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false,
    },
    {
      id: 'websiteContent',
      title: 'Website Content',
      type: 'item',
      url: '/dashboard/websiteContent',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false,
    },
    {
      id: 'demos',
      title: 'Demo Requests',
      type: 'item',
      url: '/dashboard/demo-requests',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
