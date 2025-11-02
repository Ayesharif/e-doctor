import React, { useState } from "react";
import { handleError, handleSuccess } from "../component/tosters";

const UploadReport = () => {
  const [reports, setReports] = useState([]);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setReports(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reports.length === 0 || !date || !type) {
      alert("Please fill all fields before submitting!");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    reports.forEach((file) => formData.append("files", file)); // same name as in backend multer
    formData.append("date", date);
    formData.append("type", type);

    try {
      setLoading(true);
      const response = await fetch("https://e-doctor-backend.vercel.app/upload-reports", {
        method: "POST",
        body: formData,
        credentials:"include"
      });

      const data = await response.json();
      if (response.ok) {
handleSuccess(data?.message)
        setReports([]);
        setDate("");
        setType("");
      } else {
        handleError(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading reports. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Reports
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Files
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
          {reports.length > 0 && (
            <ul className="text-sm text-green-600 mt-2 space-y-1">
              {reports.map((file, index) => (
                <li key={index}>📄 {file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Report Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Report Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Type</option>
            <option value="Lab Report">Lab Report</option>
            <option value="Prescription">Prescription</option>
            <option value="X-Ray">X-Ray</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Uploading..." : "Upload Reports"}
        </button>
      </form>
    </div>
  );
};

export default UploadReport;
