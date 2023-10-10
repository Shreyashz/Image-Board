import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const prevVal = window.location.pathname.replace('/', '').replace('/', ',');
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Threads</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Threads</Link>
          </li>
          <li className="nav-item">
            <Link to={{pathname:'/addBoard', search:"prev="+prevVal}}  className="nav-link">Create A new Board</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Create A new threads</Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">Create a User</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;