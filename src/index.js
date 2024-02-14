import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UsersContextProvider from "./context/UsersContextProvider";
import PostsContextProvider from "./context/PostsContextProvider";
import FavoriteContextProvider from "./context/FavoriteContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UsersContextProvider>
      <PostsContextProvider>
        <FavoriteContextProvider>
          <App />
        </FavoriteContextProvider>
      </PostsContextProvider>
    </UsersContextProvider>
  </BrowserRouter>
);
