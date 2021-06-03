import { useHistory } from "react-router-dom";


/** logs out current user  */
function Logout({logout}) {
  const history = useHistory();

  logout();
  history.push("/login");
  return <p>Logging out...</p>;
 
}

export default Logout;