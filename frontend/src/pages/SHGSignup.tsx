import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SHGSignup = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    leaderName: "",
    uidNumber: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const { orgName, leaderName, uidNumber, location, email, password, confirmPassword } = formData;

    // Input validation
    if (!orgName || !leaderName || !uidNumber || !location || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/create-account", {
        orgName,
        leadName: leaderName,
        uid: uidNumber,
        members: 1, // Adjust this field if members data is required
        loc: location,
        description: "Self Help Group", // Adjust this field as needed
        email,
        pass: password,
      });

      // On successful registration, navigate to the sign-in page
      navigate("/signin");
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message || "An error occurred during signup.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <Link to="/get-started" className="inline-flex items-center text-primary hover:text-primary-light mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Link>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">SHG Registration</h1>
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input id="orgName" placeholder="Enter organization name" value={formData.orgName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leaderName">Leader Name</Label>
              <Input id="leaderName" placeholder="Enter leader name" value={formData.leaderName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uidNumber">UID Number</Label>
              <Input id="uidNumber" placeholder="Enter UID number" value={formData.uidNumber} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SHGSignup;
