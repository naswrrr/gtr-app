import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import FloatingHelp from '@/components/FloatingHelp';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-surface overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sekarang PageHeader sudah tampil dengan desain baru */}
        <PageHeader /> 
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <FloatingHelp />
      </div>
    </div>
  );
}