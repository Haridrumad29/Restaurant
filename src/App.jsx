import React from 'react';
import "./App.css"
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { NotificationProvider } from './Context/NotificationContext';
import { CartProvider } from './Context/CartContext';
import { router } from './router';


function App() {
  return (
    <div className="app">
      <div id='container'></div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
