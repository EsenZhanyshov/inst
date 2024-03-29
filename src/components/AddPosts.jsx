import React, { useEffect, useState } from "react";
import logo_inst from "../assets/inst_logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContextProvider";
import { useUsers } from "../context/UsersContextProvider";

const AddPosts = () => {
  const { id } = useParams();
  const { user, getOneUser } = useUsers();
  useEffect(() => {
    getOneUser(id);
  }, []);
  const { postPosts } = usePosts();
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [comm, setComm] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    if (!url1 || !comm) {
      return;
    }
    let obj = {
      url: url1,
      url2: url2,
      url3: url3,
      comm: comm,
      userId: id,
      date: Date.now(),
      author: user.username,
    };
    postPosts(obj);
    setUrl1("");
    setUrl2("");
    setUrl2("");
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
            value={url1}
            onChange={(e) => setUrl1(e.target.value)}
          />
          <input
            className="form__input input"
            type="url"
            placeholder="img url"
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
          />
          <input
            className="form__input input"
            type="url"
            placeholder="img url"
            value={url3}
            onChange={(e) => setUrl3(e.target.value)}
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
