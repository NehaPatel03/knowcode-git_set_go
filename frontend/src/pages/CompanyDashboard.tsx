import { CompanyPageProfile } from "@/components/CompanyPageProfile";
import { CompanySidebar } from "@/components/CompanySidebar";
import { OrderStatistics } from "@/components/OrderStatistics";
import { SearchSHGs } from "@/components/SearchSHGs";


const CompanyDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar/>
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <CompanyPageProfile/>
          <OrderStatistics/>
        </div>
        <SearchSHGs/>
      </div>
    </div>
  );
};

export default CompanyDashboard;