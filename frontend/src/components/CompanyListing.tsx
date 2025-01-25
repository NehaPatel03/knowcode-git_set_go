import { useState } from "react";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";

const DUMMY_COMPANIES = [
  {
    id: 1,
    name: "Tech Solutions Ltd",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop",
    category: "technology",
    requirement: "Software Development",
    quantity: 1,
  },
  {
    id: 2,
    name: "Green Earth Co",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop",
    category: "sustainability",
    requirement: "Eco-friendly Products",
    quantity: 100,
  },
  {
    id: 3,
    name: "Local Crafts Inc",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=64&h=64&fit=crop",
    category: "handicrafts",
    requirement: "Artisan Products",
    quantity: 50,
  },
];

const CompanyListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCompanies = DUMMY_COMPANIES.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Company Listing</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="space-y-4">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompanyListing;