import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';
import LandingPage from './components/LandingPage';
import TripView from './components/TripView';
import TripEdit from './components/TripEdit';
import UserProfile from './components/UserProfile';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';
import LandingPageNew from './components/LandingPageNew';

interface Prprops {
  componenent: React.FC;
  path: string;
}
//eslint-disable-next-line
const ProtectedRoute = ({ componenent, ...props }: Prprops) => (
  //eslint-disable-next-line
  <Route component={withAuthenticationRequired(componenent)} {...props} />
);
//eslint-disable-next-line
function App(): JSX.Element {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <div className="w-screen h-screen mx-auto">
          <Navigation />
          <Switch>
            <ProtectedRoute path="/create-trip" componenent={CreateTrip} />
            <Route exact={true} path="/trips/:id">
              <TripView />
            </Route>
            <Route path="/trips/edit/:id">
              <TripEdit />
            </Route>
            <Route exact={true} path="/">
              <LandingPageNew Navigation={Navigation} />
            </Route>
            <Route path="/user-profile">
              <UserProfile />
            </Route>
            <Route path="/new-landing">
              <LandingPageNew Navigation={Navigation} />
            </Route>
          </Switch>
        </div>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
