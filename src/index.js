import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';
import './index2.css';
// import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
// import theme from './toolbox/theme';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
