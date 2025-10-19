import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Public Pages
import UserHome from './Pages/Public/UserHome';
import StaffLogin from './Pages/Public/StaffLogin';
import AdminLogin from './Pages/Public/AdminLogin';

// Admin Pages
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CategoriesManager from './Pages/Admin/CategoriesManager';
import ItemsManager from './Pages/Admin/ItemsManager';
import QRGenerator from './Pages/Admin/QRGenerator';

// Staff Pages
import StaffDashboard from './Pages/Staff/StaffDashboard';
import OrderQueue from './Pages/Staff/OrderQueue';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            {/* Public Routes - No Navbar */}
            <Route path="/" element={<UserHome />} />
            <Route path="/Staff-login" element={<StaffLogin />} />
            <Route path="/Admin-login" element={<AdminLogin />} />

            {/* Admin Protected Routes - With Navbar */}
            <Route
              path="/Admin/*"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <div>
                    <Navbar />
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="categories" element={<CategoriesManager />} />
                      <Route path="items" element={<ItemsManager />} />
                      <Route path="qr-generator" element={<QRGenerator />} />
                    </Routes>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Staff Protected Routes - With Navbar */}
            <Route
              path="/Staff/*"
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <div>
                    <Navbar />
                    <Routes>
                      <Route path="dashboard" element={<StaffDashboard />} />
                      <Route path="orders" element={<OrderQueue />} />
                    </Routes>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
