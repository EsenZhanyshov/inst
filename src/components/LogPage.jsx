import React, { useEffect, useState } from "react";
import logo_inst from "../assets/inst_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContextProvider";

const LogPage = () => {
  const { postLogin } = useUsers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    if (!email || !password) {
      return;
    }
    let obj = {
      email: email,
      password: password,
    };
    postLogin(obj);
    setEmail("");
    setPassword("");
  }
  return (
    <section className="section">
      <div className="section__top">
        <div className="section__logo logo">
          <img src={logo_inst} alt="#" className="logo_pic" />
        </div>
        <div className="section__form form">
          <input
            className="form__input input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="   эл адрес"
          />
          <input
            className="form__input input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="    Пароль"
          />
          <button className="form__btn btn" onClick={handleClick}>
            Войти
          </button>
        </div>
      </div>
      <div className="section__bottom">
        <p className="section__quest">
          У вас ещё нет аккаунта?
          <Link className="section__link" to={"/reg"}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LogPage;
