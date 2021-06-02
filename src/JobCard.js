import Card from "react-bootstrap/Card";
import "./JobCard.css";

/** JobCard
 * 
 * Props:
 * - job { equity, id, salary, title, companyName }
 * - type
 * 
 * { JobCardList, CompanyDetail } -> JobCard
 * 
 */
function JobCard({ job, type }) {
  const { equity, id, salary, title, companyName } = job;

//consider boolean showCompanyName = true/false
  return (
    <Card className="JobCard">
      <Card.Body>
        <p><b>{title}</b></p>
        {type === "companyJob" ? null : <p>{companyName}</p>}
        {salary ? <p>Salary: {salary}</p> : null}
        <p>Equity: {equity}</p>
      </Card.Body>
    </Card>
  );
}

export default JobCard;