import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Static Components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import { Toaster } from 'sonner';

// Lazy Loaded Pages yang Baru 
const Home = lazy(() => import('./pages/Home'));
const Customers = lazy(() => import('./pages/Customers'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Payment = lazy(() => import('./pages/Payment'));
const Marketing = lazy(() => import('./pages/Marketing'));   // Baru
const Analytics = lazy(() => import('./pages/Analytics'));   // Baru
const Feedback = lazy(() => import('./pages/Feedback'));     // Baru
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" richColors closeButton />
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
            <Route path="customers" element={<Customers />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="payment" element={<Payment />} />
            <Route path="inventory" element={<Inventory />} />
            
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