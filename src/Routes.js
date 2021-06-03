import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import Logout from "./Logout";


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
function Routes({login, signup, logout, currentUser}){
 
  return (
    <Switch> 
      <Route exact path="/">
        <Homepage currentUser={currentUser}/>
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetails/>
      </Route>
      <Route exact path="/companies">
        <CompanyList/>
      </Route>
      <Route exact path="/jobs">
        <JobList/>
      </Route>
      <Route exact path="/login">
        <LoginForm login={login}/>
      </Route>
      <Route exact path="/signup">
        <SignupForm signup={signup}/>
      </Route>
      <Route exact path="/profile">
        <ProfileForm/>
      </Route>
      <Route exact path="/logout">
        <Logout logout={logout}/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default Routes;