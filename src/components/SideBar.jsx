import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import insta from "../assets/icon_instagram.webp";
import search from "../assets/search_icon.webp";
import heart from "../assets/heart_icon.png";
import home from "../assets/home_icon.png";
import favorites from "../assets/favorites_icon.png";
import profile from "../assets/icon__profile.png";
import { useUsers } from "../context/UsersContextProvider";

const SideBar = () => {
  const { user, getOneUser } = useUsers();
  const { id } = useParams();
  useEffect(() => {
    getOneUser(id);
  }, []);

  return (
    <div className="sidebar">
      <NavLink className="sidebar__links">
        <img src={insta} alt="#" />
      </NavLink>
      <NavLink className="sidebar__links" to={`/${id}`}>
        <img src={home} alt="#" />
      </NavLink>
      <NavLink className="sidebar__links">
        <img src={search} alt="#" />
      </NavLink>
      <NavLink className="sidebar__links">
        <img src={heart} alt="#" />
      </NavLink>
      <NavLink className="sidebar__links" to={`/favorites/${id}`}>
        <img src={favorites} alt="#" />
      </NavLink>
      <NavLink className="sidebar__links" to={`/profile/${id}`}>
        <img src={profile} alt="#" />
      </NavLink>
    </div>
  );
};

export default SideBar;
