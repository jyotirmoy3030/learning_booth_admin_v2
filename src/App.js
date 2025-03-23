// Project imports
import AppRoutes from 'routes'; // Ensure this is correctly defined
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { ToastContainer } from 'react-toastify';

// Styles
import 'react-toastify/dist/ReactToastify.css';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

const App = () => (
  <ThemeCustomization>
    <ToastContainer />
    <ScrollTop>
      <AppRoutes /> {/* Ensure `routes.js` correctly exports `Routes` */}
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
