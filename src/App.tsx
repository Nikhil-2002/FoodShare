import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/components/system/ProtectedRoute';

import Landing from '@/pages/Landing';
import { Login, Register, ForgotPassword, ResetPassword, OtpVerification } from '@/pages/auth';
import NotFound from '@/pages/NotFound';

import RestaurantDashboard from '@/pages/restaurant/Dashboard';
import CreateDonation from '@/pages/restaurant/CreateDonation';
import DonationManagement from '@/pages/restaurant/DonationManagement';

import NgoDashboard from '@/pages/ngo/Dashboard';
import AvailableDonations from '@/pages/ngo/AvailableDonations';
import Requests from '@/pages/ngo/Requests';

import VolunteerDashboard from '@/pages/volunteer/Dashboard';
import AvailablePickups from '@/pages/volunteer/AvailablePickups';
import Achievements from '@/pages/volunteer/Achievements';
import ActiveDelivery from '@/pages/volunteer/ActiveDelivery';

import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/Users';
import AdminVerify from '@/pages/admin/Verifications';
import AdminDonations from '@/pages/admin/Donations';

import Leaderboard from '@/pages/shared/Leaderboard';
import Impact from '@/pages/shared/Impact';
import Community from '@/pages/shared/Community';
import Profile from '@/pages/shared/Profile';
import LiveTracking from '@/pages/shared/LiveTracking';

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/').slice(0, 3).join('/')}>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        {/* App (protected) */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Restaurant */}
          <Route path="restaurant" element={<ProtectedRoute roles={['restaurant']}><RestaurantDashboard /></ProtectedRoute>} />
          <Route path="restaurant/create" element={<ProtectedRoute roles={['restaurant']}><CreateDonation /></ProtectedRoute>} />
          <Route path="restaurant/donations" element={<ProtectedRoute roles={['restaurant']}><DonationManagement /></ProtectedRoute>} />

          {/* NGO */}
          <Route path="ngo" element={<ProtectedRoute roles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
          <Route path="ngo/available" element={<ProtectedRoute roles={['ngo']}><AvailableDonations /></ProtectedRoute>} />
          <Route path="ngo/requests" element={<ProtectedRoute roles={['ngo']}><Requests /></ProtectedRoute>} />

          {/* Volunteer */}
          <Route path="volunteer" element={<ProtectedRoute roles={['volunteer']}><VolunteerDashboard /></ProtectedRoute>} />
          <Route path="volunteer/pickups" element={<ProtectedRoute roles={['volunteer']}><AvailablePickups /></ProtectedRoute>} />
          <Route path="volunteer/achievements" element={<ProtectedRoute roles={['volunteer']}><Achievements /></ProtectedRoute>} />
          <Route path="volunteer/active" element={<ProtectedRoute roles={['volunteer']}><ActiveDelivery /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="admin/verify" element={<ProtectedRoute roles={['admin']}><AdminVerify /></ProtectedRoute>} />
          <Route path="admin/donations" element={<ProtectedRoute roles={['admin']}><AdminDonations /></ProtectedRoute>} />

          {/* Shared */}
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="impact" element={<Impact />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Tracking (protected, full screen) */}
        <Route
          path="/track/:id"
          element={
            <ProtectedRoute>
              <LiveTracking />
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
