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
 * 
 * {PrivateRoutes, Routes} -> CompanyList -> { SearchForm, CompanyCard }
 * 
 */
function CompanyList() {
  const [companies, setCompanies] = useState([])

  useEffect(function getCompaniesOnMount() {
    async function getCompaniesFromAPI() {
      let response = await JoblyApi.request("companies");
      setCompanies(response.companies);
    };
    getCompaniesFromAPI();
  }, []);

  console.log("companies", companies)

  //get methods, use one useEffect to search and filter, [term] state dependency here, UI choices also {name/number}, check out "" if it works
  //change the API methods so it is more abstracted i.e getAllCOmpanies, getAllJObs, filterCOmpany, filterJObs
  async function searchCompanies(term) {
    let response = await JoblyApi.request("companies", { name: term });
    setCompanies(response.companies);
  }

  let companyCards = companies.map(company =>
    <CompanyCard key={company.handle} company={company} />);

//TODO: Loading Message!
  return (
    <div className="CompanyList">
      <SearchForm searchFor={searchCompanies} />
      <ul>
        {companyCards}
      </ul>
    </div>
  );
}

export default CompanyList;