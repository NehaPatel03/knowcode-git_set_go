import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Index from "./pages/Index";


import GetStarted from "./pages/GetStarted";
import SHGSignup from "./pages/SHGSignup";
import SignIn from "./pages/Signin";
import CompanySignup from "./pages/CompanySignup";
import Profile from "./pages/Profile";
import Consultancy from "./pages/Consultancy";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Messages from "./pages/Messages";
import Company from "./pages/Company";
import Dashboard from "./pages/Dashboard";
import CompanySignIn from "./pages/CompanySignin";
import CompanyDashboard from "./pages/CompanyDashboard";
import Orders from "./pages/Orders";
import CompanyMessages from "./pages/CompanyMessages";
import Partnership from "./pages/Partnership";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/consultancy" element={<Consultancy/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/messages" element={<Messages/>} />
            <Route path="/company" element={<Company/>} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/shg-signup" element={<SHGSignup />} />
            <Route path="/company-signup" element={<CompanySignup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/company-signin" element={<CompanySignIn/>} />
            <Route path="/company-dashboard" element={<CompanyDashboard/>} />
            <Route path="/company-orders" element={<Orders/>} />
            <Route path="/company-messages" element={<CompanyMessages/>} />
            <Route path="/company-partnership" element={<Partnership/>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
