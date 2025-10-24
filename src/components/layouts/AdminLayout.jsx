import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Navbar from '../Navbar';

export default function AdminLayout() {
  return (
    <ProtectedRoute allowedRoles={['Admin']}>
      <div className="admin-layout">
        <Navbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}