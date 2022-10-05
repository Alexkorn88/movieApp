import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';
import './components/servises/swapiServis';
// import "./components/app/app.css";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
// import "./img/Rectangle.png";

const container = document.getElementById('moviesapp');
const root = createRoot(container);
root.render(<App />);
