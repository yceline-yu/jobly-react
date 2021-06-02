import Card from "react-bootstrap/Card";
import "./JobCard.css";

/** JobCard
 * 
 * Props:
 * - job { equity, id, salary, title }
 * 
 * { JobCardList, CompanyDetail } -> JobCard
 * 
 */
function JobCard({ job }){
  const {equity, id, salary, title} = job;

    return (
        <Card className="JobCard">
        <Card.Body>
          <p><b>{title}</b></p>

          {salary ? <p>Salary: {salary}</p>: null}
          <p>Equity: {equity}</p>

          </Card.Body></Card>
    )
}

export default JobCard;