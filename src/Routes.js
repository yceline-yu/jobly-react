import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

/** Routes
 * 
 * props: 
 *  - login ()
 *  - signup ()
 *  - currentUser {username: ..., firstName: ...,}
 * 
 * state: none
 * 
 * App -> Routes -> {
 *    Homepage, 
 *    CompanyDetails, 
 *    CompanyList,
 *    JobList,
 *    LoginForm,
 *    SignupForm,
 *    ProfileForm 
 *  }
 */
function Routes({login, signup, currentUser}){
 
  return (
   <Switch>
      <Route exact path="/">
        <Homepage currentUser={currentUser}/>
      </Route>
      <Route exact path="/login">
        <LoginForm login={login}/>
      </Route>
      <Route exact path="/signup">
        <SignupForm signup={signup}/>
      </Route>
      <Redirect to="/"/>
      </Switch>
  )
}

export default Routes;