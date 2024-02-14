import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
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
  const [currentUser, setCurrentUser] = useState(null); // Создаем переменную currentUser и устанавливаем ее в начальное значение null

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

  async function getUsers() {
    const { data } = await axios.get(API_USERS);
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  }

  async function getOneUser(id) {
    setTimeout(async () => {
      const { data } = await axios.get(`${API_USERS}/${id}`);
      dispatch({
        type: "GET_ONE_USER",
        payload: data,
      });
    }, 2000);
  }

  async function postSignin(obj) {
    await getUsers();
    for (const elem of state.users) {
      if (elem.username === obj.username) {
        alert("пользователь с таким именем уже есть");
        return;
      }
    }
    setTimeout(async () => {
      let res = await axios.post(API_USERS, obj);
      navigate(`/${res.data.id}`);
    }, 1000);
  }

  async function postLogin(obj) {
    await getUsers();
    for (const elem of state.users) {
      if (elem.email === obj.email && elem.password === obj.password) {
        getOneUser(elem.id);
        setCurrentUser(elem); // Устанавливаем currentUser при успешном входе в систему
        navigate(`/${elem.id}`);
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
    currentUser, // Добавляем currentUser в values
  };

  return (
    <usersContext.Provider value={values}>{children}</usersContext.Provider>
  );
};

export default UsersContextProvider;
