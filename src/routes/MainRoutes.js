import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const JobRoleMaster = Loadable(
  lazy(() => import('pages/admin/Master/JobRoleMaster'))
);
const JobsMaster = Loadable(
  lazy(() => import('pages/admin/Master/JobsMaster'))
);
const EditJobMaster = Loadable(
  lazy(() => import('pages/admin/Master/EditJob'))
);
const CoursesMaster = Loadable(
  lazy(() => import('pages/admin/Master/CoursesMaster'))
);
const EditCourseMaster = Loadable(
  lazy(() => import('pages/admin/Master/EditCourse'))
);
const AddTestMaster = Loadable(
  lazy(() => import('pages/admin/Master/CreateTest'))
);
const AddQuestionMaster = Loadable(
  lazy(() => import('pages/admin/Master/AddQuestion'))
);
const EditQuestionMaster = Loadable(
  lazy(() => import('pages/admin/Master/EditQuestion'))
);
const UsersMaster = Loadable(
  lazy(() => import('pages/admin/Master/UsersMaster'))
);
const EditUserMaster = Loadable(
  lazy(() => import('pages/admin/Master/EditUser'))
);
const ResultsMaster = Loadable(
  lazy(() => import('pages/admin/Master/ResultsMaster'))
);
const CapabilitiesMaster = Loadable(
  lazy(() => import('pages/admin/Master/CapabilitiesMaster'))
);
const NewUsers = Loadable(lazy(() => import('pages/admin/Master/NewUsers')));
const WebsiteContent = Loadable(
  lazy(() => import('pages/admin/Master/WebsiteContent'))
);

const MainRoutes = {
  path: '/dashboard',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />,
    },
    {
      path: 'job-roles',
      element: <JobRoleMaster />,
    },
    {
      path: 'jobs',
      element: <JobsMaster />,
    },
    {
      path: 'jobs/:id/edit',
      element: <EditJobMaster />,
    },
    {
      path: 'courses',
      element: <CoursesMaster />,
    },
    {
      path: 'courses/:id/edit',
      element: <EditCourseMaster />,
    },
    {
      path: 'assessments',
      element: <AddTestMaster />,
    },
    {
      path: 'capabilities',
      element: <CapabilitiesMaster />,
    },
    {
      path: 'tests/:id/questions',
      element: <AddQuestionMaster />,
    },
    {
      path: 'tests/:testId/questions/:questionId/edit',
      element: <EditQuestionMaster />,
    },
    {
      path: 'users',
      element: <UsersMaster />,
    },
    {
      path: 'users/:id/edit',
      element: <EditUserMaster />,
    },
    {
      path: 'results',
      element: <ResultsMaster />,
    },
    {
      path: 'newUsers',
      element: <NewUsers />,
    },
    {
      path: 'websiteContent',
      element: <WebsiteContent />,
    },
  ],
};

export default MainRoutes;
