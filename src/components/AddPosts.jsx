import React, { useState } from "react";
import logo_inst from "../assets/inst_logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContextProvider";

const AddPosts = () => {
  const { id } = useParams();
  const { postPosts } = usePosts();
  const [url, setUrl] = useState("");
  const [comm, setComm] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    if (!url || !comm) {
      return;
    }
    let obj = {
      url: url,
      comm: comm,
      userId: id,
    };
    postPosts(obj);
    setUrl("");
    setComm("");
    navigate(`/${id}`);
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
            type="url"
            placeholder="img url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="form__input input"
            type="text"
            placeholder="Описание"
            value={comm}
            onChange={(e) => setComm(e.target.value)}
          />
          <button className="form__btn btn" onClick={handleClick}>
            Добавить
          </button>
        </div>
      </div>
      <div className="section__bottom">
        <p className="section__quest">
          <Link className="section__link" to={`/${id}`}>
            Отмена
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AddPosts;
