import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreCareers from './pages/ExploreCareers';
import Counseling from './pages/Counseling';
import AdminDashboard from './pages/AdminDashboard';
import AdminResources from './pages/AdminResources';
import CareerDetails from './pages/CareerDetails';
import MyBookings from './pages/MyBookings';
import CyberMatrixBackground from './components/ui/cyber-matrix-background';
import { initializeMockData } from './utils/mockData';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <CyberMatrixBackground>
          <div className="app-container">
            <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

            <main>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/explore" element={<div className="container"><ExploreCareers /></div>} />
                <Route path="/career/:id" element={<div className="container"><CareerDetails /></div>} />
                <Route path="/counseling" element={<div className="container"><Counseling /></div>} />
                <Route path="/my-bookings" element={<div className="container"><MyBookings /></div>} />
                <Route path="/admin" element={<div className="container"><AdminDashboard /></div>} />
                <Route path="/admin/resources" element={<div className="container"><AdminResources /></div>} />
                <Route path="/admin/appointments" element={<div className="container"><AdminDashboard /></div>} />
              </Routes>
            </main>
          </div>
        </CyberMatrixBackground>
      </Router>
    </ThemeProvider>
  );
}

export default App;
