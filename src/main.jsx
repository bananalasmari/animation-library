import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// استيراد المكونات
import App from './App.jsx';
import Home from './Home.jsx';
import AnimationLibrary from './AnimationLibrary.jsx';
import AnimationLibraryText from './AnimationLibraryText.jsx';


// إنشاء الراوتر
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "animations",
        element: <AnimationLibrary />
      },
      {
        path: "animations-text",
        element: <AnimationLibraryText />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);