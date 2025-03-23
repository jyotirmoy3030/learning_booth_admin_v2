import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Redux & Store
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'store';

// Styles
import 'simplebar/src/simplebar.css';
import 'assets/third-party/apex-chart.css';
import './index.css';
import './App.css';

// App Component
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);

// Performance monitoring
reportWebVitals();
