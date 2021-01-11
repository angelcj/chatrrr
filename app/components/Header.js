import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header id="header">
      <nav>
        <Link to="/" className="icon-logo">
          <img src="./img/logo.png" alt="Chatrrr logo" />
        </Link>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link" className="icon" exact>
              <img src="./img/BeOS_people.png" alt="Main page" />
              <span className="icon-text">Main page</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-wall" activeClassName="active-link" className="icon">
              <img src="./img/BeOS_person.png" alt="Your feed" />
              <span className="icon-text">My wall</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
