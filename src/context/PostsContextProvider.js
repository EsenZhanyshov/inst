import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API_POSTS } from "../helpers/const";

export const postsContext = createContext();
export const usePosts = () => useContext(postsContext);
const PostsContextProvider = ({ children }) => {
  const INIT_STATE = {
    posts: [],
    post: {},
  };

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_POSTS":
        return { ...state, posts: action.payload };
      case "GET_ONE_POST":
        return { ...state, post: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! Отправляю посты в db.json
  async function postPosts(obj) {
    await axios.post(API_POSTS, obj);
  }
  // ! Стягиваю посты
  async function getPosts() {
    const { data } = await axios.get(API_POSTS);
    dispatch({
      type: "GET_POSTS",
      payload: data,
    });
  }
  const values = {
    postPosts,
    posts: state.posts,
    getPosts,
  };
  return (
    <postsContext.Provider value={values}>{children}</postsContext.Provider>
  );
};

export default PostsContextProvider;
