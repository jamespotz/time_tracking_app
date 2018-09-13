import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import SignOut from './forms/SignOut'

export default class SideBar extends Component {
  render() {
    const defaultClass = "text-white py-3 px-4 block bg-black hover:bg-grey-darkest text-center"

    return (
      <div className="sidebar w-1/6 bg-black">
        <nav>
          <ul className="list-reset flex flex-col mt-10">
            <li className="nav-link-items">
              <NavLink exact to="/time-logs" className={defaultClass} activeClassName="bg-grey-darkest">Time Log</NavLink>
            </li>
            <li className="nav-link-items">
              <NavLink exact to="/reports" className={defaultClass} activeClassName="bg-grey-darkest">Report</NavLink>
            </li>
            <li className="nav-Navlink-items">
              <SignOut className={defaultClass} />
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
