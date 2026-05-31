import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Static Components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';
import NotFound from './components/NotFound';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Customers = lazy(() => import('./pages/Customers'));
const Inventory = lazy(() => import('./pages/Inventory'));
const RepairTracker = lazy(() => import('./pages/RepairTracker'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Staff = lazy(() => import('./pages/Staff'));
const Components = lazy(() => import('./pages/Components'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<Forgot />} />
          </Route>

          {/* MAIN LAYOUT ROUTES */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="repair" element={<RepairTracker />} />
            <Route path="customers" element={<Customers />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="staff" element={<Staff />} />
            <Route path="components" element={<Components />} />
            {/* Redirect jika user nyasar ke path lama */}
            <Route path="appointments" element={<Navigate to="/customers" replace />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;