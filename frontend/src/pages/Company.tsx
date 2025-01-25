import AppSidebar from "@/components/AppSidebar";
import CompanyListing from "@/components/CompanyListing";

const Company = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    <AppSidebar />
    <div className="flex-grow">
      <CompanyListing />
    </div>
  </div>
  );
};

export default Company;