import { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList"

/** JobList
 * 
 * Props:
 *  - none
 * 
 * State:
 *  - jobs [{job}, {job},...]
 * 
 * { Private Routes, Routes } -> JobList -> JobCardList
 * 
 */
function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(function getJobsOnMount() {
    async function getJobs() {
      let response = await JoblyApi.request("jobs");
      setJobs(response.jobs);
    };
    getJobs();
  }, []);
  
  console.log(jobs)

  return (jobs === []
    ? <div><h2>Loading...</h2></div>
    : <div><JobCardList jobs={jobs} /></div>
  );

}

export default JobList;