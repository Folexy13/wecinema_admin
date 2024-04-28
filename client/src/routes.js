import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import UserListPage from './components/dashboard/UserListPage';
import SingleUser from './components/dashboard/SingleUser/SingleUser';
import LoginForm from './components/auth/Login';
import checkAdminAuth from './helpers/AdminAuth';
import AddNewUser from './components/dashboard/AddNewUser';
import MissingPage from './components/Error/404';
import Home from './components/Home';
import VideoListPage from './components/dashboard/VideoListPage';
import AddNewVideo from './components/dashboard/AddNewVideo';
import ScriptListPage from './components/dashboard/ScriptListPage';
import AddNewScript from './components/dashboard/AddNewScript';

export const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAdminAuth() ? (
        <Component {...props} />
      ) : (
        // <Redirect to={{ pathname: '/login' }} />
        window.location.replace('/user/login')
      )
    }
  />
);

const BaseRoute = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateAdminRoute exact path="/dashboard" component={Dashboard} />
    <PrivateAdminRoute exact path="/dashboard/users" component={UserListPage} />
    <PrivateAdminRoute
      exact
      path="/dashboard/videos"
      component={VideoListPage}
    />
    <PrivateAdminRoute
      exact
      path="/dashboard/scripts"
      component={ScriptListPage}
    />
    <PrivateAdminRoute
      exact
      path="/dashboard/add-new-user"
      component={AddNewUser}
    />
    <PrivateAdminRoute
      exact
      path="/dashboard/add-new-video"
      component={AddNewVideo}
    />
    <PrivateAdminRoute
      exact
      path="/dashboard/add-new-script"
      component={AddNewScript}
    />
    <PrivateAdminRoute
      exact
      path="/dashboard/user/:id"
      component={SingleUser}
    />
    <Route exact path="/user/login" component={LoginForm} />
    <Route component={MissingPage} />
  </Switch>
);

export default BaseRoute;
