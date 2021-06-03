import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage({ currentUser }) {

  if (currentUser) {
    return (
      <Container className="Homepage col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Row>
          <Col><h1>Welcome back to Jobly, {currentUser.username}</h1></Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container className="Homepage col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Row>
          <Col><h1>Welcome to Jobly!</h1></Col>
          </Row>  
        <Row>
          <Col>          
          <Link className="Homepage-button btn btn-primary" to="/login">Log In</Link>
          <Link className="Homepage-button btn btn-primary" to="/signup">Sign Up</Link>
          </Col>

        </Row>
      </Container>
    )
  }
}

  export default Homepage;