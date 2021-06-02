import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import "./CompanyDetails.css";

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
function CompanyDetails() {
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  useEffect(function getSingleCompanyInfoOnMount() {
    async function getSingleCompanyInfo() {
      let response = await JoblyApi.getCompany(handle);
      console.log(response)
      setCompany(response)
    };
    getSingleCompanyInfo();
  }, [handle]);

  console.log("company", company);

  return (
    company !== {}
      ? <div className="CompanyDetails">
          {company.logoUrl ? <img src={company.logoUrl} alt={company.name} /> : null}
          <p><b>{company.name}</b></p>
          <p>{company.description}</p>
          <h2>Jobs</h2>
          {company.jobs?.map(job => <JobCard type="companyJob" key={job.id} job={job} />)}
        </div>
      : <div>"Loading..."</div>
  );
}

export default CompanyDetails;