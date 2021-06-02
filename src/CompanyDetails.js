import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

/** CompanyDetails
 * 
 * Props:
 * -none
 * 
 * State:
 * - company
 * 
 * { Routes, PrivateRoutes } -> CompanyDetails -> JobCard
 */
function CompanyDetails(){
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  useEffect(function getSingleCompanyInfoOnMount(){
    async function getSingleCompanyInfo(){
      let response = await JoblyApi.getCompany(handle);
      console.log(response)
      setCompany(response)
    }
    getSingleCompanyInfo();
  }, []);
  console.log("company", company);

  //TODO: loading screen until jobs/company loaded if compnay? loading.. : <stuff>
  return (company 
      ? <div><b>{company.name}</b>
      <p>{company.description}</p>
      <h2>Jobs</h2>
      </div>
      : <div>"Loading..."</div>
  )
}

export default CompanyDetails;