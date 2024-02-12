import React from "react";
import { NavLink } from "react-router-dom";
import insta from "../assets/icon_instagram.webp";
import search from "../assets/search_icon.webp";
import heart from "../assets/heart_icon.png";
import home from "../assets/home_icon.png";
import favorites from "../assets/favorites_icon.png";
const Navbar = () => {
  return (
    <nav>
      <NavLink>
        <img src={insta} alt="" />
      </NavLink>
      <NavLink>
        <img src={search} alt="" />
      </NavLink>
      <NavLink>
        <img src={heart} alt="" />
      </NavLink>
      <NavLink>
        <img src={home} alt="" />
      </NavLink>
      <NavLink>
        <img src={favorites} alt="" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
