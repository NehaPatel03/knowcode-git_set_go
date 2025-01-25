import React, { useState } from "react";
import { predictScheme } from "../api/api.js";

const SchemePredictor = () => {
  const [formData, setFormData] = useState({
    age: "",
    state: "",
    annual_income: "",
    caste: "",
    gender: "",
    sector: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    try {
      const prediction = await predictScheme(formData);
      setResult(prediction.recommended_scheme);
    } catch (err) {
      setError("Failed to predict the scheme. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Predict Your Scheme</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="annual_income"
            placeholder="Annual Income"
            value={formData.annual_income}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="caste"
            placeholder="Caste"
            value={formData.caste}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="sector"
            placeholder="Sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Predict
          </button>
        </form>

        {result && (
          <p className="mt-4 text-green-600 font-bold">
            Recommended Scheme: {result}
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default SchemePredictor;
