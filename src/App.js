// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssessmentReport from 'pages/AssessmentReport/AssessmentReport';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ToastContainer />
    <ScrollTop>
      {/* <Routes /> */}
      <AssessmentReport />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
