import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Navbar from '../Navbar';

export default function StaffLayout() {
  return (
    <ProtectedRoute allowedRoles={['Staff']}>
      <div className="staff-layout">
        <Navbar />
        <main className="staff-content">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}