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
import Borrower from "./components/Borrower";
import Loan from "./components/Loan";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

export default function App() {
    return (
        <Router>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/login" element={<LoginAdmin />} />
                         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />                       <Route path="/fpo" element={<ProtectedRoute><FPO /></ProtectedRoute>} />
                        <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
                        <Route path="/farmers" element={<ProtectedRoute><Farmers /></ProtectedRoute>} />
                        <Route path="/agent" element={<ProtectedRoute><Agent /></ProtectedRoute>} />
                        <Route path="/bank-agent" element={<ProtectedRoute><BankAgent /></ProtectedRoute>} />
                        <Route path="/farmers_details/farmerId/:farmerId/applicationId/:applicationId" element={<ProtectedRoute><FarmerDetails /></ProtectedRoute>} />
                        <Route path="/farmers_applications/:id" element={<ProtectedRoute><FarmerApplication /></ProtectedRoute>} />
                        <Route path="/borrower" element={<ProtectedRoute><Borrower /></ProtectedRoute>} />
                        <Route path="/loan" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

