import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, AdminRoute } from "./components/RouteGuards";

import Landing from "./pages/Landing";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import OfferingDetail from "./pages/OfferingDetail";
import Terms from "./pages/Terms";

import DashboardLayout from "./pages/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import SubmitReferral from "./pages/SubmitReferral";
import ReferralHistory from "./pages/ReferralHistory";
import Materials from "./pages/Materials";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";
import Support from "./pages/Support";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminReferrals from "./pages/admin/AdminReferrals";
import AdminReferrers from "./pages/admin/AdminReferrers";
import AdminMaterials from "./pages/admin/AdminMaterials";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/products-services" element={<Catalog />} />
          <Route path="/products-services/:slug" element={<OfferingDetail />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:slug" element={<OfferingDetail />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<Catalog />} />
            <Route path="products/:slug" element={<OfferingDetail />} />
            <Route path="refer" element={<SubmitReferral />} />
            <Route path="history" element={<ReferralHistory />} />
            <Route path="materials" element={<Materials />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="referrals" element={<AdminReferrals />} />
            <Route path="referrers" element={<AdminReferrers />} />
            <Route path="materials" element={<AdminMaterials />} />
          </Route>

          <Route path="*" element={<Landing />} />
        </Routes>
        <BottomNav />
      </AuthProvider>
    </BrowserRouter>
  );
}

