import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/auth.store';

export function AdminGuard() {
  const isAdmin = useAuthStore((s) => s.isAdmin);

  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
