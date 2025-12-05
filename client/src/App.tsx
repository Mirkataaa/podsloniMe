import 'leaflet/dist/leaflet.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './app/pages/Home/HomePage';
import AppLayout from './app/AppLayout';
import { AdminGuard } from './app/shared/guards/AdminGuard';
import AdminDashboardLayout from './app/pages/admin/AdminDashBoard';
import AddProperty from './app/features/properties/pages/AddProperty';
import PropertiesList from './app/features/properties/pages/PropertiesList';
import PropertyDetailsPage from './app/features/properties/pages/PropertyDetailsPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
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
