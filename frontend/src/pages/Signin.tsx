import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateEmail } from "../utils/helper.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Input validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!pass) {
      setError("Password cannot be empty.");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        pass,
      });

      // If the request is successful
      const { accessToken } = response.data;

      // Store the token
      localStorage.setItem("accessToken", accessToken);

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (err) {
      // Handle errors
      if (err.response) {
        // API responded with an error
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        // Network or other error
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center text-primary hover:text-primary-light"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      {/* Sign-In Card */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Sign In</h1>
        <form className="space-y-6" onSubmit={handleSignIn}>
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Sign In Button */}
          <div className="pt-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/get-started" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
