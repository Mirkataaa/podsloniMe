import { Outlet } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeaderComponent />

      <main className="flex-1">
        <div className="container mx-auto px-2 py-15">
          <Outlet />
        </div>
      </main>

      <FooterComponent />
    </div>
  );
}
