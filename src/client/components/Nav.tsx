import * as React from "react";
import { NavLink } from "react-router-dom";
import { BsChatFill } from "react-icons/bs";

const Nav: React.FC<NavProps> = (props) => {
  return (
    <>
      <header className="heading d-flex flex-column justify-content-start align-items-start ">
        <h1 className="blog-title">
          Blogger
          <span className="logo-icon">
            <BsChatFill />
          </span>
        </h1>
      </header>
      <nav className="sub-header d-flex justify-content-start align-items-start ">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return `link ${isActive ? "active" : "not-active"}`;
          }}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return `link ${isActive ? "active" : "not-active"}`;
          }}
          to="/compose"
        >
          Compose
        </NavLink>
      </nav>
    </>
  );
};

interface NavProps {}

export default Nav;
