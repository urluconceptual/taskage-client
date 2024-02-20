import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from 'axios';

const token = localStorage.getItem('access_token');

if (token) {
  console.log("setting token")
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common['Authorization'];
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
