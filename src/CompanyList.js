import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

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
function CompanyList(){
const [companies, setCompanies] = useState([])

  useEffect(function getCompaniesOnMount(){
    async function getCompaniesFromAPI(){
      let response = await JoblyApi.request("companies");
      setCompanies(response.companies)
    }

    getCompaniesFromAPI();
  }, []);

  console.log("companies", companies)

  async function searchCompanies(term){
    let response = await JoblyApi.request("companies", {name:term});
    setCompanies(response.companies);
  }

  let companyCards = companies.map(company => <CompanyCard key={company.handle} company={company}/>)

  return (
    <div>
      <SearchForm searchFor={searchCompanies}/>
      <ul>
      {companyCards}
      </ul>
    </div>
  )
}

export default CompanyList;