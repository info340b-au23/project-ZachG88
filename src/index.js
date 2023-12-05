import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { App } from './components/App';
import COFFEE_DATA_IMPORT from './data/coffee_analysis.csv';
import './style.css';
import { BrowserRouter } from 'react-router-dom';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdPi1jpjr-PPnH-3k0OnQYTsRZozc1McU",
  authDomain: "icoffee-e298d.firebaseapp.com",
  projectId: "icoffee-e298d",
  storageBucket: "icoffee-e298d.appspot.com",
  messagingSenderId: "508110516583",
  appId: "1:508110516583:web:e3e7bb7280e47b0b8bbfc2",
  measurementId: "G-RWHZ9ZS5R9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App data={COFFEE_DATA_IMPORT}/>
  </BrowserRouter>
)