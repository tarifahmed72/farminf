import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Staff from "./components/Staff";
import LoginAdmin from "./components/LoginAdmin";
import Farmers from "./components/Farmers";
import Agent from "./components/Agent";
import BankAgent from "./components/BankAgent";
import "./App.css";
import FarmerDetails from "./components/FarmerDetails";
import FPO from "./components/FPO";
import FarmerApplication from "./components/FarmerApplication";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginAdmin />} />
          <Route path="/" element={<ProtectedRoute>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 overflow-auto">
                 <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/fpo" element={<FPO />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/farmers" element={<Farmers />} />
                    <Route path="/agent" element={<Agent />} />
                    <Route path="/bank-agent" element={<BankAgent />} />
                    <Route
                      path="/farmers_details/farmerId/:farmerId/applicationId/:applicationId"
                      element={<FarmerDetails />}
                    />
                    <Route path="/farmers_applications/:id" element={<FarmerApplication />}/>
                  </Routes>
              </div>
            </div>
          </ProtectedRoute>} />

        </Routes>
    </Router>
  );
}

export default App;
