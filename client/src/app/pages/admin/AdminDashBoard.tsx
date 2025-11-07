import { NavLink, Outlet } from 'react-router-dom';

export default function AdminDashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/pending-brokers"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Pending Brokers
          </NavLink>

          <NavLink
            to="/admin/agencies"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Agencies
          </NavLink>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
