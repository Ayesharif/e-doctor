import React, { useState } from "react";

const AddVitals = () => {
  const [vitals, setVitals] = useState({
    bp: "",
    sugar: "",
    weight: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVitals({ ...vitals, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!vitals.bp || !vitals.sugar || !vitals.weight) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {

      const vitalData = {
        bloodPressure: vitals.bp,
        sugarLevel: Number(vitals.sugar),
        weight: Number(vitals.weight),
        notes: vitals.notes,
        date: new Date().toISOString().split("T")[0],
      };

      // 🌐 Send data to backend
      const response = await fetch("https://e-doctor-backend.vercel.app/addvitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vitalData),
        credentials:"include"
      });

      const data = await response.json();

      if (response.ok) {
        alert("Vitals added successfully!");
        setVitals({ bp: "", sugar: "", weight: "", notes: "" });
      } else {
        alert(`Error: ${data.message || "Failed to add vitals."}`);
      }
    } catch (error) {
      console.error("Error adding vitals:", error);
      alert("Something went wrong while saving vitals!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Manual Vitals
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Blood Pressure */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blood Pressure (mmHg)
          </label>
          <input
            type="text"
            name="bp"
            value={vitals.bp}
            onChange={handleChange}
            placeholder="e.g. 120/80"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Sugar Level */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Sugar Level (mg/dL)
          </label>
          <input
            type="number"
            name="sugar"
            value={vitals.sugar}
            onChange={handleChange}
            placeholder="e.g. 95"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={vitals.weight}
            onChange={handleChange}
            placeholder="e.g. 70"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={vitals.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any additional notes..."
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full border rounded py-2 font-medium ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "hover:bg-blue-950 hover:text-white"
          }`}
        >
          {loading ? "Saving..." : "Save Vitals"}
        </button>
      </form>
    </div>
  );
};

export default AddVitals;
