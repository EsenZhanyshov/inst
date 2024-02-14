import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../context/UsersContextProvider";
import SideBar from "./SideBar";
import { usePosts } from "../context/PostsContextProvider";

const Profile = () => {
  const { user, getOneUser } = useUsers();
  const { posts, getPosts, getOnePost, post } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getOneUser(id);
    getPosts();
  }, []);

  function navigateClick(idpost) {
    getOnePost(idpost);
    navigate(`/modal/${idpost}`);
  }
  return (
    <div className="profile">
      <SideBar />
      <div className="profile__wrapper">
        <div className="profile__top">
          <div className="profile__ava"></div>
          <div className="profile__info">
            <h2>{user.username}</h2>
            <Link to={`/addposts/${id}`}>Редактировать профиль</Link>
          </div>
        </div>
        <div className="profile__bottom">
          <div className="profile__block">
            {posts
              .filter((elem) => elem.userId === id)
              .map((elem) => (
                <div className="profile__item" key={elem.id}>
                  <div>
                    <img
                      src={elem.url}
                      alt=""
                      onClick={() => navigateClick(elem.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
