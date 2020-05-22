
import React from "react";
import Home from '../Home';
import User from '../Users';
import Login from '../Login';
import Register from '../Register';
import {FormProduct,  FormEdit } from '../FormProduct';

import { BrowserRouter, Route, Switch } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
//       )
//     }
//   />
// );

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={Home} />
      <Route path="/users" component={User} />
      <Route path="/product/add" component={FormProduct} />
      <Route path="/product/save/:id" component={FormEdit} />

      {/* <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/users" component={User} />
      <PrivateRoute path="/product/add" component={FormProduct} />
      <PrivateRoute path="/product/save/:id" component={FormEdit} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;