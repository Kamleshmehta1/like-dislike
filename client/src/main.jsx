import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoTiStackProvider from './HOC/NoTiStackProvider.jsx';
import './index.css';
import MuiThemeProvider from './HOC/MuiThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NoTiStackProvider>
      <MuiThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </NoTiStackProvider>
  </Provider>
);
