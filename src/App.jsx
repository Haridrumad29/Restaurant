import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { NotificationProvider } from './Context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

// Public Pages
import Login from './Pages/Public/Login';
import UserHome from './Pages/Public/UserHome';
import StaffLogin from './Pages/Public/StaffLogin';
import AdminLogin from './Pages/Public/AdminLogin';
import OrderConfirmation from './Pages/Public/OrderConfirmation';
import OrderHistory from './Pages/Public/OrderHistory';
import Error404 from './Pages/Public/Error404';
import UserDashboard from './Pages/Public/UserDasboard';

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
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="app-container">
                <Routes>
                  {/* Public Routes - No Navbar */}
                  <Route path="/" element={<Login />} />
                  <Route path="/Staff-login" element={<StaffLogin />} />
                  <Route path="/Admin-login" element={<AdminLogin />} />
                  <Route
                    path="/menu"
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <div>
                          <Navbar />
                          <UserHome />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-confirmation"
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <div>
                          <Navbar />
                          <OrderConfirmation />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-history"
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <div>
                          <Navbar />
                          <OrderHistory />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <div>
                          <Navbar />
                          <UserDashboard />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  {/* 404 Route - Must be last */}
                  <Route path="*" element={<Error404 />} />

                  {/* Admin Protected Routes - With Navbar */}
                  <Route
                    path="/Admin/*"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
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
                      <ProtectedRoute allowedRoles={['staff']}>
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
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </ErrorBoundary>
  );
}

export default App;
