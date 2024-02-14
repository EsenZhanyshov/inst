import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API_FAVORITES } from "../helpers/const";

export const favoriteContext = createContext();
export const useFavorite = () => useContext(favoriteContext);

const FavoriteContextProvider = ({ children }) => {
  const INIT_STATE = {
    favorites: [],
    favorite: {},
  };
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_FAVORITES":
        return { ...state, favorites: action.payload };
      case "GET_ONE_FAVORITE":
        return { ...state, favorite: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function postFavorite(obj) {
    await axios.post(API_FAVORITES, obj);
  }
  async function deleteFavorite(id) {
    await axios.delete(`${API_FAVORITES}/${id}`);
  }
  async function getFavorites() {
    const { data } = await axios.get(API_FAVORITES);
    dispatch({
      type: "GET_FAVORITES",
      payload: data,
    });
  }
  const values = {
    postFavorite,
    deleteFavorite,
    getFavorites,
    favorites: state.favorites,
  };
  return (
    <favoriteContext.Provider value={values}>
      {children}
    </favoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
