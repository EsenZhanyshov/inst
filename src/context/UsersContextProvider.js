import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { API_USERS } from "../helpers/const";
import { useNavigate } from "react-router-dom";

export const usersContext = createContext();
export const useUsers = () => useContext(usersContext);
const INIT_STATE = {
  users: [],
  user: {},
};

const UsersContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_USERS":
        return { ...state, users: action.payload };
      case "GET_ONE_USER":
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // ! Вытягиваем юзеров из сервера
  async function getUsers() {
    const { data } = await axios.get(API_USERS);
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  }
  // ! Вытяшиваем одного юзера
  async function getOneUser(id) {
    const { data } = await axios.get(`${API_USERS}/${id}`);
    dispatch({
      type: "GET_ONE_USER",
      payload: data,
    });
  }
  // ! Регаем юзеров
  async function postSignin(obj) {
    await getUsers();
    // ? Проверка на доступность username
    for (const elem of state.users) {
      if (elem.username === obj.username) {
        alert("пользователь с таким именем уже есть");
        return;
      }
    }
    await axios.post(API_USERS, obj);
    navigate(`/${obj.id}`);
  }
  // ! Вход для юзеров
  async function postLogin(obj) {
    await getUsers();
    // ? Проверка на наличие почты и совпадения пароля
    for (const elem of state.users) {
      if (elem.email === obj.email && elem.password === obj.password) {
        getOneUser(elem.id);
        navigate(`/${elem.id}`);
      } else if (elem.email !== obj.email && elem.password !== obj.password) {
      }
    }
  }
  const values = {
    getUsers,
    postSignin,
    postLogin,
    getOneUser,
    users: state.users,
    user: state.user,
  };

  return (
    <usersContext.Provider value={values}>{children}</usersContext.Provider>
  );
};

export default UsersContextProvider;
