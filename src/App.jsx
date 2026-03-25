import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreCareers from './pages/ExploreCareers';
import Counseling from './pages/Counseling';
import AdminDashboard from './pages/AdminDashboard';
import AdminResources from './pages/AdminResources';
import AdminApplicants from './pages/AdminApplicants';
import CareerDetails from './pages/CareerDetails';
import MyBookings from './pages/MyBookings';
import MyStudents from './pages/MyStudents';
import MyAppointments from './pages/MyAppointments';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Account from './pages/Account';
import PendingVerification from './pages/PendingVerification';
import CyberMatrixBackground from './components/ui/cyber-matrix-background';
import { initializeMockData } from './utils/mockData';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthStatus from './components/AuthStatus';
import './index.css';

// Admin route protector
const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

// Counselor route protector
const CounselorRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (!user || user.role === 'student') return <Navigate to="/" replace />;

  return children;
};

// Private route protector
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <CyberMatrixBackground>
            <div className="app-container">
              <AuthStatus />
              <Navbar />

              <main>
                <Routes>
                  <Route path="/" element={<Hero />} />
                  
                  {/* Public Auth Routes */}
                  <Route path="/login" element={<div className="container"><Login /></div>} />
                  <Route path="/register" element={<div className="container"><Register /></div>} />
                  <Route path="/forgot-password" element={<div className="container"><ForgotPassword /></div>} />
                  <Route path="/pending-verification" element={<div className="container"><PendingVerification /></div>} />

                  {/* Protected Common Routes */}
                  <Route path="/explore" element={<PrivateRoute><div className="container"><ExploreCareers /></div></PrivateRoute>} />
                  <Route path="/career/:id" element={<PrivateRoute><div className="container"><CareerDetails /></div></PrivateRoute>} />
                  <Route path="/counseling" element={<PrivateRoute><div className="container"><Counseling /></div></PrivateRoute>} />
                  <Route path="/my-bookings" element={<PrivateRoute><div className="container"><MyBookings /></div></PrivateRoute>} />
                  <Route path="/account" element={<PrivateRoute><div className="container"><Account /></div></PrivateRoute>} />

                  {/* Protected Counselor Routes */}
                  <Route path="/counselor/students" element={<CounselorRoute><div className="container"><MyStudents /></div></CounselorRoute>} />
                  <Route path="/counselor/appointments" element={<CounselorRoute><div className="container"><MyAppointments /></div></CounselorRoute>} />

                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={<AdminRoute><div className="container"><AdminDashboard /></div></AdminRoute>} />
                  <Route path="/admin/resources" element={<AdminRoute><div className="container"><AdminResources /></div></AdminRoute>} />
                  <Route path="/admin/appointments" element={<AdminRoute><div className="container"><AdminDashboard /></div></AdminRoute>} />
                  <Route path="/admin/applicants" element={<AdminRoute><div className="container"><AdminApplicants /></div></AdminRoute>} />
                </Routes>
              </main>
            </div>
          </CyberMatrixBackground>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
