import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";


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
        <Homepage/>
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
        <LoginForm/>
        </Route>
      <Route exact path="/signup">
        <SignupForm/>
        </Route>
      <Route exact path="/profile">
        <ProfileForm/>
        </Route>
    </Switch>
  )
}

export default Routes;