import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import "./CompanyList.css";

/** CompanyList
 * 
 * Props:
 * - none
 * 
 * State:
 * - companies [{company}, {company},...]
 * - searchTerm: string submitted from search bar
 * 
 * {PrivateRoutes, Routes} -> CompanyList -> { SearchForm, CompanyCard }
 * 
 */
function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function getCompaniesOnMount() {
    async function getCompaniesFromAPI() {
      let response = await JoblyApi.getCompanies(searchTerm);
      setCompanies(response.companies);
    };
    getCompaniesFromAPI();
  }, [searchTerm]);

  async function searchCompanies(term) {
    setSearchTerm(term);
  }

  if (companies === null) {
    return (
      <div>Loading...</div>
    );
  }

  let companyCards = companies.map(company =>
    <CompanyCard key={company.handle} company={company} />);

  return (
    <div className="CompanyList">
      <SearchForm searchFor={searchCompanies} />
      {searchTerm !== "" && <p>{companies.length} result(s) for "{searchTerm}"</p>}
      <ul>
        {companyCards}
      </ul>
    </div>
  );
}

export default CompanyList;