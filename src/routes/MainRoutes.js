import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
 
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const RoadtoContent = Loadable(
  lazy(() => import('../pages/admin/Master/RoadToContent'))
);
const JobRoleMaster = Loadable(
  lazy(() => import('../pages/admin/Master/JobRoleMaster'))
);
const NewJobRoleMaster = Loadable(
  lazy(() => import('../pages/admin/Master/NewJobRoleMaster'))
);
const JobsMaster = Loadable(
  lazy(() => import('../pages/admin/Master/JobsMaster'))
);
const NewJobsMaster = Loadable(
  lazy(() => import('../pages/admin/Master/NewJobsMaster'))
);
const JobsApplicationMaster = Loadable(
  lazy(() => import('../pages/admin/Master/JobsApplication'))
);
const EditJobMaster = Loadable(
  lazy(() => import('../pages/admin/Master/EditJob'))
);
const CoursesMaster = Loadable(
  lazy(() => import('../pages/admin/Master/CoursesMaster'))
);
const EditCourseMaster = Loadable(
  lazy(() => import('../pages/admin/Master/EditCourse'))
);
const AddTestMaster = Loadable(
  lazy(() => import('../pages/admin/Master/CreateTest'))
);
const AddNewTestMaster = Loadable(
  lazy(() => import('../pages/admin/Master/CreateNewTest'))
);
const AddQuestionMaster = Loadable(
  lazy(() => import('../pages/admin/Master/AddQuestion'))
);
const EditQuestionMaster = Loadable(
  lazy(() => import('../pages/admin/Master/EditQuestion'))
);
const UsersMaster = Loadable(
  lazy(() => import('../pages/admin/Master/UsersMaster'))
);
const NewUsersMaster = Loadable(
  lazy(() => import('../pages/admin/Master/NewUserMaster'))
);
const EditUserMaster = Loadable(
  lazy(() => import('../pages/admin/Master/EditUser'))
);
const ResultsMaster = Loadable(
  lazy(() => import('../pages/admin/Master/ResultsMaster'))
);
const ProctorMaster = Loadable(
  lazy(() => import('../pages/admin/Master/ProctoringView'))
);
const CapabilitiesMaster = Loadable(
  lazy(() => import('../pages/admin/Master/CapabilitiesMaster'))
);
const CompetencyMaster = Loadable(
  lazy(() => import('../pages/admin/Master/CompetencyMaster'))
);
const NewUsers = Loadable(lazy(() => import('../pages/admin/Master/NewUsers')));
// const OrganizationList = Loadable(lazy(() => import('../pages/admin/Master/')));
const WebsiteContent = Loadable(
  lazy(() => import('../pages/admin/Master/WebsiteContent'))
);
const DemoRequests = Loadable(
  lazy(() => import('../pages/admin/Master/DemoRequests'))
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
      path: 'road_to_content',
      element: <RoadtoContent />,
    },
    {
      path: 'job-roles',
      element: <JobRoleMaster />,
    },
    {
      path: 'new-job-roles',
      element: <NewJobRoleMaster />,
    },
    {
      path: 'jobs',
      element: <JobsMaster />,
    },
    {
      path: 'new-jobs',
      element: <NewJobsMaster />,
    },
    {
      path: 'jobs-application',
      element: <JobsApplicationMaster />,
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
      path: 'new-assessments',
      element: <AddNewTestMaster />,
    },
    {
      path: 'capabilities',
      element: <CapabilitiesMaster />,
    },
    {
      path: 'competency',
      element: <CompetencyMaster />,
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
      path: 'new-users',
      element: <NewUsersMaster />,
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
      path: 'proctoring-view/:id',
      element: <ProctorMaster />,
    },
    {
      path: 'newUsers',
      element: <NewUsers />,
    },
    // {
    //   path: 'organization-list',
    //   element: <OrganizationList />,
    // },
    {
      path: 'websiteContent',
      element: <WebsiteContent />,
    },
    {
      path: 'demo-requests',
      element: <DemoRequests />,
    },
  ],
};

export default MainRoutes;
