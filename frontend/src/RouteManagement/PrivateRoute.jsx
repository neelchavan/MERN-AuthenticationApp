/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const isAuth = !!localStorage.getItem('authtoken');

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuth ? <Component {...rest} {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
}
