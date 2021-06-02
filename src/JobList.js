import { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

/** JobList
 * 
 * Props:
 *  - none
 * 
 * State:
 *  - jobs [{job}, {job},...]
 *  - searchTerm: string submitted from search bar
 * 
 * { Private Routes, Routes } -> JobList -> JobCardList
 * 
 */
function JobList() {
  const [jobs, setJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function getJobsOnMount() {
    async function getJobs() {
      let response = await JoblyApi.getJobs(searchTerm);
      setJobs(response.jobs);
    };
    getJobs();
  }, [searchTerm]);

  async function searchJobs(term) {
    setSearchTerm(term);
  }
  
  if (jobs === null) {
    return (
        <div><h2>Loading...</h2></div>
    );
  }
  
  return (
  <div>
    <SearchForm searchFor={searchJobs}/>
    {searchTerm !== "" && <p>{jobs.length} result(s) for "{searchTerm}"</p>}
    <JobCardList jobs={jobs} />
    </div>
  );
} 

export default JobList;