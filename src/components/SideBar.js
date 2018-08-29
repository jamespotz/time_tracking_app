import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

export default class SideBar extends PureComponent {
  render() {
    const defaultClass = "text-white py-3 px-4 block bg-black hover:bg-grey-darkest text-center"

    return (
      <div className="sidebar w-1/6 bg-black">
        <nav>
          <ul className="list-reset flex flex-col mt-10">
            <li className="nav-link-items">
              <NavLink exact to="/" className={defaultClass} activeClassName="bg-grey-darkest">Time Log</NavLink>
            </li>
            <li className="nav-Navlink-items">
              <NavLink exact to="/report" className={defaultClass} activeClassName="bg-grey-darkest">Report</NavLink>
            </li>
            <li className="nav-Navlink-items">
              <NavLink exact to="/sign-out" className={defaultClass}  activeClassName="bg-grey-darkest">Sign Out</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
