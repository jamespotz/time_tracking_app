import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../../auth/authorization'
import SideBar from '../SideBar';

const UserRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={ props => auth.signedIn() ? (
      <div className="container flex h-screen">
        <SideBar />
        <div className="w-5/6 overflow-auto flex-grow bg-grey-lightest">
          <Component {...props} />
        </div>
      </div>
    ) : (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: props.location }
        }}
      />
    )}
  />
)

export default UserRoute