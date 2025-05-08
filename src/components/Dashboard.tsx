import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [farmerCount, setFarmerCount] = useState<number | null>(25);
  const [fpoCount, setFpoCount] = useState<number | null>(null);
  const [agentCount, setAgentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
        }
        // Fetch counts
        const [farmers, fpos, agents] = await Promise.all([
          fetch(
            "https://dev-api.farmeasytechnologies.com/api/farmers/?page=1&limit=1",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ).then((res) => res.json()),

          fetch(
            "https://dev-api.farmeasytechnologies.com/api/fpos/?skip=0&limit=1000",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ).then((res) => res.json()),

          fetch(
            "https://dev-api.farmeasytechnologies.com/api/field_agents/?skip=0&limit=1000",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ).then((res) => res.json()),
        ]);

        setFarmerCount(farmers.total || 0);
        setFpoCount(fpos.length || 0);
        setAgentCount(agents.length || 0);
      } catch (error) {
        console.error("Failed to initialize Keycloak or fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

   initKeycloak()
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, Admin 👋
          </h1>
          <p className="text-gray-500 mt-2">Glad to see you back!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Total Farmers</h2>
            <p className="text-3xl font-bold">{farmerCount ?? "N/A"}</p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Total FPOs</h2>
            <p className="text-3xl font-bold">{fpoCount ?? "N/A"}</p>
          </div>

          <div className="bg-purple-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Total Field Agents</h2>
            <p className="text-3xl font-bold">{agentCount ?? "N/A"}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
        
        </div>
      </div>
    </div>
  );
};
export default Dashboard;