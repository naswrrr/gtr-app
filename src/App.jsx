import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Static Components
import MainLayout from './layouts/MainLayout';
import CustomerLayout from './layouts/CustomerLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import { Toaster } from 'sonner';

// Context
import { CustomerProvider } from './context/CustomerContext';

// Lazy Loaded Admin Pages
const Home = lazy(() => import('./pages/Home'));
const Customers = lazy(() => import('./pages/Customers'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Payment = lazy(() => import('./pages/Payment'));
const Marketing = lazy(() => import('./pages/Marketing'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));

// Lazy Loaded Guest Pages
const Landing = lazy(() => import('./pages/guest/Landing'));
const About = lazy(() => import('./pages/guest/About'));
const Services = lazy(() => import('./pages/guest/Services'));
const Promos = lazy(() => import('./pages/guest/Promos'));

// Lazy Loaded Customer Pages
const CustomerDashboard = lazy(() => import('./pages/customer/Dashboard'));
const CustomerLogin = lazy(() => import('./pages/customer/Login'));
const Booking = lazy(() => import('./pages/customer/Booking'));
const Tracking = lazy(() => import('./pages/customer/Tracking'));
const Loyalty = lazy(() => import('./pages/customer/Loyalty'));
const CustomerVouchers = lazy(() => import('./pages/customer/Vouchers'));
const History = lazy(() => import('./pages/customer/History'));
const Journey = lazy(() => import('./pages/customer/Journey'));

function ProtectedAdminRoute() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const loggedUser = localStorage.getItem('loggedUser');
  const isLoggedIn = Boolean(token || user || loggedUser);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
}

function App() {
  return (
    <CustomerProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors closeButton />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* AUTH ROUTES */}
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot" element={<Forgot />} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route index element={<Home />} />
              <Route path="customers" element={<Customers />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="payment" element={<Payment />} />
              <Route path="inventory" element={<Inventory />} />
              
              {/* Redirect legacy path */}
              <Route path="appointments" element={<Navigate to="/admin/customers" replace />} />
            </Route>

            {/* GUEST & CUSTOMER ROUTES */}
            <Route path="/" element={<CustomerLayout />}>
              {/* Guest / Public Pages */}
              <Route index element={<Landing />} />
              <Route path="tentang-kami" element={<About />} />
              <Route path="layanan" element={<Services />} />
              <Route path="promo" element={<Promos />} />
              
              {/* Customer Area Pages */}
              <Route path="customer/login" element={<CustomerLogin />} />
              <Route path="customer/dashboard" element={<CustomerDashboard />} />
              <Route path="customer/booking" element={<Booking />} />
              <Route path="customer/tracking" element={<Tracking />} />
              <Route path="customer/loyalty" element={<Loyalty />} />
              <Route path="customer/vouchers" element={<CustomerVouchers />} />
              <Route path="customer/history" element={<History />} />
              <Route path="customer/journey" element={<Journey />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CustomerProvider>
  );
}

export default App;