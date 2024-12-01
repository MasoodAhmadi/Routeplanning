import React, { useState } from 'react';
import { AuthProvider } from './AuthProvider';
import { Navbars, Sidebar } from "./components";
import { Register, RoutePlans, WeatherPage } from './pages';
import PrivateRoute from './components/privateRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, HelpPage, HistoryPanel, LoginPage, ProfilePage } from './pages';
import './App.css';

function App() {
  const [sidebarOpen] = useState(false);
  const [showRoutePlanning, setShowRoutePlanning] = useState(false);

  const handleAddNewPlan = () => {
    setShowRoutePlanning(true);
  };
  return (
    <AuthProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Router>
          <Sidebar />
          <div
            style={{
              flexGrow: 1,
              padding: "20px",
              transition: "margin-left 0.3s ease",
              marginLeft: sidebarOpen ? "250px" : "70px",
              marginTop: "-20px",
            }}
          >
            <Navbars onAddNewPlan={handleAddNewPlan} />
            <div style={{ paddingTop: "70px" }}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/help" element={<HelpPage />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Dashboard showRoutePlanning={showRoutePlanning} />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/routeplan" element={<RoutePlans />} />
                <Route path="/history" element={<HistoryPanel />} />

                {/* Protected routes */}
                {/*
                    <Route
                  path="/history"
                  element={
                    <PrivateRoute>
                      <HistoryPanel />
                    </PrivateRoute>
                  }
                /> */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
