import React, { useState } from "react";
import axios from "axios";

const Schemes: React.FC = () => {
  const [formData, setFormData] = useState({
    age: "",
    state: "Rajasthan",
    annualIncome: "",
    caste: "SC",
    gender: "Female",
    sector: "Handlooms",
  });

  const [recommendedScheme, setRecommendedScheme] = useState<string | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setRecommendedScheme(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
    setRecommendedScheme("Weavers Support Scheme");
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-6 bg-purple-200 min-h-screen p-6">
      <div className="flex flex-col flex-1 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-purple-600 font-bold text-lg mb-2">Weavers Support Scheme</h3>
          <p><strong>Objective:</strong> To provide financial assistance, training, and raw materials to SHGs engaged in handloom activities.</p>
          <p><strong>Eligibility:</strong> SHGs with a focus on handlooms, primarily women and marginalized communities like SC/ST.</p>
          <p><strong>Benefits:</strong> Subsidized raw materials, weaving training, and access to government e-marketplace (GeM).</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-purple-600 font-bold text-lg mb-2">Craft Revival Scheme</h3>
          <p><strong>Objective:</strong> To promote traditional handicrafts and empower artisans by offering design training, funding, and marketing support.</p>
          <p><strong>Eligibility:</strong> SHGs operating in the handicrafts sector with a focus on rural artisans.</p>
          <p><strong>Benefits:</strong> Grants for modern equipment, workshops, and exhibition opportunities.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-purple-600 font-bold text-lg mb-2">Digital SHG Scheme</h3>
          <p><strong>Objective:</strong> To digitally empower SHGs by providing technology training, digital marketing tools, and e-commerce platform access.</p>
          <p><strong>Eligibility:</strong> SHGs in the technology sector or those willing to adopt digital tools in their operations.</p>
          <p><strong>Benefits:</strong> Free training in digital skills, cloud storage for data management, and online sales portals.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-purple-600 font-bold text-lg mb-2">Agro-Food Aid Scheme</h3>
          <p><strong>Objective:</strong> To support SHGs in food processing and agriculture-related activities by offering subsidies and technical know-how.</p>
          <p><strong>Eligibility:</strong> SHGs in food processing, agriculture, or agro-based industries.</p>
          <p><strong>Benefits:</strong> Funding for equipment, cold storage facilities, and certification assistance (e.g., FSSAI).</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-purple-600 font-bold text-lg mb-2">Green Boost Scheme</h3>
          <p><strong>Objective:</strong> To encourage sustainable agricultural practices and organic farming among SHGs.</p>
          <p><strong>Eligibility:</strong>SHGs in agriculture focusing on eco-friendly and organic practices.</p>
          <p><strong>Benefits:</strong> Subsidies for organic seeds, eco-certification, and training in sustainable farming methods.</p>
        </div>
      </div>

      <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-purple-600 text-2xl font-bold text-center mb-4">SHG Scheme Recommendation</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your details below to discover the best government schemes tailored for you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="age" className="block font-medium text-gray-700">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block font-medium text-gray-700">State:</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            >
              <option value="Rajasthan">Rajasthan</option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Punjab">Punjab</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Bihar">Bihar</option>
            </select>
          </div>

          <div>
            <label htmlFor="annualIncome" className="block font-medium text-gray-700">Annual Income:</label>
            <input
              type="number"
              id="annualIncome"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label htmlFor="caste" className="block font-medium text-gray-700">Caste:</label>
            <select
              id="caste"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            >
              <option value="SC">SC</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div>
            <label htmlFor="gender" className="block font-medium text-gray-700">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label htmlFor="sector" className="block font-medium text-gray-700">Sector:</label>
            <select
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            >
              <option value="Handlooms">Handlooms</option>
              <option value="Handicrafts">Handicrafts</option>
              <option value="Technology">Technology</option>
              <option value="Food">Food</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
            Get Recommendation
          </button>
        </form>

        {recommendedScheme && (
          <div className="bg-purple-100 border-2 border-purple-600 text-purple-600 text-center font-bold mt-6 p-4 rounded-md">
            Recommended Scheme: {recommendedScheme}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
