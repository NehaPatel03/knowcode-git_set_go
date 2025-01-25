import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CompanySignIn = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10">
            <div className="container mx-auto px-4 py-16 relative">
                <Link to="/" className="inline-flex items-center text-primary hover:text-primary-light mb-8 absolute left-10 -top-10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-primary">Sign In</h1>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" />
                        </div>

                        <Button
                            className="w-full bg-primary hover:bg-primary-light text-white font-semibold transition-colors"
                            type="submit"
                        >
                            <Link to="/company-dashboard">
                                Sign in
                            </Link>
                        </Button>
                    </form>
                    <p className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/get-started" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompanySignIn;
