import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useUsers } from "../context/UsersContextProvider";
import { usePosts } from "../context/PostsContextProvider";
import { useFavorite } from "../context/FavoriteContextProvider";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { users, getUsers, currentUser, user, getOneUser } = useUsers();
  const { posts, getPosts } = usePosts();
  const { postFavorite, deleteFavorite } = useFavorite();
  const { id } = useParams();
  const [heartImage, setHeartImage] = useState(
    "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"
  );
  useEffect(() => {
    getUsers();
    getPosts();
    getOneUser(id);
  }, []);

  const [likeMap, setLikeMap] = useState(() => {
    const storedLikes = localStorage.getItem("likes");
    return storedLikes ? JSON.parse(storedLikes) : {};
  });

  const [favoriteMap, setFavoriteMap] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });
  const toggleHeartImage = () => {
    setHeartImage((prevImage) => {
      if (
        prevImage ===
        "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"
      ) {
        return "https://www.iconspng.com/uploads/simple-red-heart/simple-red-heart.png";
      } else {
        return "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png";
      }
    });
  };
  const toggleFavorite = (postId, post) => {
    setFavoriteMap((prevState) => {
      const updatedFavorites = { ...prevState };
      const postIdStr = postId ? postId.toString() : ""; // Проверяем на undefined
      if (updatedFavorites[postIdStr]) {
        deleteFavorite(postIdStr);
      } else {
        postFavorite(post);
      }
      updatedFavorites[postIdStr] = !prevState[postIdStr];
      localStorage.setItem(
        "favorites",
        JSON.stringify({ ...updatedFavorites })
      );
      return updatedFavorites;
    });
  };

  return (
    <div className="container">
      <SideBar />
      <div className="wrapper">
        <div className="post__block">
          {posts
            .slice()
            .sort((a, b) => b.date - a.date)
            .map((post) => (
              <div className="post__card" key={post.id}>
                <h2>{post.author}</h2>
                <div
                  className="card__pic"
                  style={{
                    backgroundImage: `url(${post.url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    objectFit: "cover",
                  }}
                ></div>
                <div className="post__bottom">
                  <h2>{new Date(post.date).toLocaleString()}</h2>
                  <div className="post__like">
                    <img
                      src={heartImage}
                      alt=""
                      onClick={() => {
                        toggleHeartImage();
                      }}
                    />
                    {/* Вместо 1 можно использовать количество лайков */}
                    {likeMap[post.id] &&
                      Object.keys(likeMap[post.id]).length > 0 && (
                        <span>{Object.keys(likeMap[post.id]).length}</span>
                      )}
                  </div>
                  <div className="post__favorite post__like">
                    <img
                      src={
                        favoriteMap[post.id]
                          ? "https://i.pinimg.com/564x/01/be/1a/01be1a98a424d3930c7a3d5071df3e3f.jpg"
                          : "https://w7.pngwing.com/pngs/942/419/png-transparent-bookmark-favorite-love-save-like-essential-icon-thumbnail.png"
                      }
                      alt=""
                      onClick={() => toggleFavorite(post.id, post)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
