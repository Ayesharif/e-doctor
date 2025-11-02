import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
const tips = [
  "Stay hydrated and check your BP regularly 💧",
  "Consistency is the key to better health 💪",
  "Upload your reports to track your progress 📈",
];
const randomTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    const savedVitals = JSON.parse(localStorage.getItem("vitals") || "[]");
    setReports(savedReports);
    setVitals(savedVitals);
  }, []);

  const hasData = reports.length > 0 || vitals.length > 0;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      {!hasData ? (
        // Empty State for New User
        <div className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">HealthMate</span> 👋
          </h2>
          <p className="text-gray-600">
            Let’s get started by uploading your first health report or adding your daily vitals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              onClick={() => navigate("/uploadreport")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              📤 Upload Report
            </button>
            <button
              onClick={() => navigate("/addvitals")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              ➕ Add Vitals
            </button>
          </div>
        </div>
      ) : (
        // Dashboard with data
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Dashboard</h2>


          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Reports</h3>
            {reports.length === 0 ? (
              <p className="text-gray-500">No reports uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="border rounded-xl p-4 shadow hover:shadow-md cursor-pointer"
                    onClick={() => navigate(`/report/${r.id}`)}
                  >
                    <p className="font-semibold text-gray-800">{r.name}</p>
                    <p className="text-sm text-gray-500">{r.type}</p>
                    <p className="text-sm text-gray-400">{r.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>


          <div className="mt-8">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Recent Vitals</h3>
            {vitals.length === 0 ? (
              <p className="text-gray-500">No vitals recorded yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vitals.map((v) => (
                  <div key={v.id} className="border rounded-xl p-4 shadow hover:shadow-md">
                    <p className="font-semibold text-gray-800">{v.date}</p>
                    <p className="text-sm text-gray-600">BP: {v.bp}</p>
                    <p className="text-sm text-gray-600">Sugar: {v.sugar} mg/dL</p>
                    <p className="text-sm text-gray-600">Weight: {v.weight} kg</p>
                    {v.notes && <p className="text-sm italic text-gray-500 mt-1">{v.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* <p className="text-sm text-gray-500 italic mt-2">{randomTip}</p> */}

    </div>
  );
};

export default Dashboard;
