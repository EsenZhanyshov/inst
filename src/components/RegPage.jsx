import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContextProvider";
import logo_inst from "../assets/inst_logo.png";
import { Link, useNavigate } from "react-router-dom";

const RegPage = () => {
  const { postSignin } = useUsers();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (!username || !email || !password) {
      return;
    }
    let obj = {
      username: username,
      email: email,
      password: password,
    };
    postSignin(obj);
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <section className="section">
      <div className="section__top">
        <div className="section__logo logo">
          <img src={logo_inst} alt="#" className="logo_pic" />
        </div>
        <div className="section__form form">
          <input
            className="form__input input"
            type="text"
            placeholder="   username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form__input input"
            type="email"
            placeholder="   email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form__input input"
            type="password"
            placeholder="   password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form__btn btn" onClick={handleClick}>
            Зарегистрироваться
          </button>
        </div>
      </div>
      <div className="section__bottom">
        <p className="section__quest">
          Eсть аккаунт?
          <Link className="section__link" to={"/"}>
            Вход
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegPage;
