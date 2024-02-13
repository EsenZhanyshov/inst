import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../context/UsersContextProvider";
import SideBar from "./SideBar";
import { usePosts } from "../context/PostsContextProvider";

const Profile = () => {
  const { user, getOneUser } = useUsers();
  const { posts, getPosts } = usePosts();
  const { id } = useParams();
  useEffect(() => {
    getOneUser(id);
    getPosts();
  }, []);
  function handleClick() {}
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
                  <img src={elem.url} alt="" />
                  <h2>
                    {user.username} {elem.comm}
                  </h2>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
