import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContextProvider";
import { useUsers } from "../context/UsersContextProvider";
import { useFavorite } from "../context/FavoriteContextProvider";

const FavoritesPage = () => {
  const { user, getOneUser } = useUsers();
  const { posts, getPosts, getOnePost, post } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFavorites, favorites } = useFavorite();
  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="profile">
        <SideBar />
        <div className="profile__wrapper">
          <div className="profile__bottom">
            <div className="profile__block">
              {favorites
                .filter((elem) => elem.userId === id)
                .map((elem) => (
                  <div className="profile__item" key={elem.id}>
                    <div>
                      <img src={elem.url} alt="" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
