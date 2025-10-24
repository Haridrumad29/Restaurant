import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import UserHome from './Pages/Public/UserHome';
import StaffLogin from './Pages/Public/StaffLogin';
import AdminLogin from './Pages/Public/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CategoriesManager from './Pages/Admin/CategoriesManager';
import ItemsManager from './Pages/Admin/ItemsManager';
import QRGenerator from './Pages/Admin/QRGenerator';
import StaffDashboard from './Pages/Staff/StaffDashboard';
import OrderQueue from './Pages/Staff/OrderQueue';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLayoutWrapper from './components/layouts/AdminLayout';
import StaffLayoutWrapper from './components/layouts/StaffLayout';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const AppLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
    </div>
  );
};

const AdminLayout = () => (
  <ProtectedRoute allowedRoles={['Admin']}>
    <Outlet />
  </ProtectedRoute>
);

const StaffLayout = () => (
  <ProtectedRoute allowedRoles={['Staff']}>
    <Outlet />
  </ProtectedRoute>
);

/** @type {import('@remix-run/router').RouterConfig} */
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <UserHome />,
      },
      {
        path: '/staff-login',
        element: <StaffLogin />,
      },
      {
        path: '/admin-login',
        element: <AdminLogin />,
      },
      {
        path: 'admin',
        element: <AdminLayoutWrapper />,
        children: [
          { 
            index: true,
            element: <Navigate to="dashboard" replace /> 
          },
          { 
            path: 'dashboard',
            element: <AdminDashboard />,
            errorElement: <ErrorBoundary />
          },
          { 
            path: 'categories',
            element: <CategoriesManager />,
            errorElement: <ErrorBoundary />
          },
          { 
            path: 'items',
            element: <ItemsManager />,
            errorElement: <ErrorBoundary />
          },
          { 
            path: 'qr-generator',
            element: <QRGenerator />,
            errorElement: <ErrorBoundary />
          },
        ],
      },
      {
        path: 'staff',
        element: <StaffLayoutWrapper />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />
          },
          { 
            path: 'dashboard',
            element: <StaffDashboard />,
            errorElement: <ErrorBoundary />
          },
          { 
            path: 'orders',
            element: <OrderQueue />,
            errorElement: <ErrorBoundary />
          },
        ],
      },
    ],
  },
], {
  basename: '/',
  future: {
    v7_relativeSplatPath: true
  }
});
