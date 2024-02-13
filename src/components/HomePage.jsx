import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useUsers } from "../context/UsersContextProvider";
import { usePosts } from "../context/PostsContextProvider";

const HomePage = () => {
  const { users, getUsers } = useUsers();
  const { posts, getPosts } = usePosts();
  useEffect(() => {
    getUsers();
    getPosts();
  }, []);
  console.log(users);
  console.log(posts);
  return (
    <div>
      <SideBar />
      {users.map((elem) => {
        const userPosts = posts.filter((post) => post.userId === elem.id);
        if (userPosts.length > 0) {
          return (
            <div className="" key={elem.id}>
              {userPosts.map((post) => (
                <div>
                  <h1>{elem.username}</h1>
                  <img src={post.url} alt="" key={post.id} />
                </div>
              ))}
            </div>
          );
        }
        return null; // возвращаем null если нет постов для пользователя
      })}
    </div>
  );
};

export default HomePage;
