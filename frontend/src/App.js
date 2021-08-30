/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Switch } from 'react-router-dom';
import routes from './Routes/index';
import PrivateRoute from './RouteManagement/PrivateRoute';
import PublicRoute from './RouteManagement/PublicRoute';
// import ProfilePic from './Components/ProfilePic';

function App() {
  return (
    <Container>
      {/* <ProfilePic /> */}
      <Switch>
        {routes.map((route, idx) =>
          route.isProtected ? (
            <PrivateRoute key={idx} {...route} />
          ) : (
            <PublicRoute key={idx} {...route} />
          )
        )}
      </Switch>
    </Container>
  );
}

export default App;
