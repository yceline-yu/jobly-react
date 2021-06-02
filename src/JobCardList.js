import JobCard from "./JobCard";

/** JobCardList
 * 
 * Props:
 *  - jobs [{job, {job},...]
 * 
 * State:
 *  - none
 * 
 *  JobList -> JobCardList -> JobCard
 */
function JobCardList({ jobs }) {

  let jobCards = jobs.map(job =>
    <JobCard type="allJobs" key={job.id} job={job} />);
//className
  return (
    <div>{jobCards}</div>
  );
}

export default JobCardList;