import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/HomePage';
import AppLayout from './AppLayout';
import { AdminGuard } from './shared/guards/AdminGuard';
import AdminDashboardLayout from './pages/admin/AdminDashBoard';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<AdminGuard />}>
        <Route path="/admin" element={<AdminDashboardLayout />}>
          {/* default dashboard home */}
          <Route index element={<div>Admin Dashboard Home</div>} />

          {/* pages we will implement next */}
          <Route path="pending-brokers" element={<div>Pending brokers</div>} />
          <Route path="agencies" element={<div>Agencies list</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
