import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import {App} from './components/App';
import COFFEE_DATA_IMPORT from './data/coffee_analysis.csv';


import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={COFFEE_DATA_IMPORT}/>
  </React.StrictMode>
);

