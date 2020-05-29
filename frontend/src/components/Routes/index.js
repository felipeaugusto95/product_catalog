
import React, { useContext } from "react";
import Home from '../Home';
import User from '../Users';
import Login from '../Login';
import Register from '../Register';
import {FormProduct,  FormEdit } from '../FormProduct';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import StoreProvider from '../Store/provider';
import StoreContext from '../Store/context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>

    <StoreProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* <Route exact path="/" component={Home} />
        <Route path="/users" component={User} />
        <Route path="/product/add" component={FormProduct} />
        <Route path="/product/save/:id" component={FormEdit} /> */}

        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/users" component={User} />
        <PrivateRoute path="/product/add" component={FormProduct} />
        <PrivateRoute path="/product/save/:id" component={FormEdit} />
      </Switch>
    </StoreProvider>
      
  </BrowserRouter>
);

export default Routes;