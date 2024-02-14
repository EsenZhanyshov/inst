import React, { useEffect, useState } from "react";
import logo_inst from "../assets/inst_logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContextProvider";
import { useUsers } from "../context/UsersContextProvider";

const EditPosts = () => {
  const { id } = useParams();
  const { user, getOneUser } = useUsers();
  const { post, getOnePost, editPost } = usePosts();
  const { postPosts } = usePosts();
  const navigate = useNavigate();
  const [url1, setUrl1] = useState(post.url);
  const [url2, setUrl2] = useState(post.url2);
  const [url3, setUrl3] = useState(post.url3);
  const [comm, setComm] = useState(post.comm);
  useEffect(() => {
    getOnePost(id);
  }, []);
  useEffect(() => {
    if (!post) {
      setUrl1(user.url);
      setUrl2(user.url2);
      setUrl3(user.url3);
      setComm(user.comm);
    }
  }, [post]);
  console.log(post);

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
    editPost(id, obj);
    setUrl1("");
    setUrl2("");
    setUrl3("");
    setComm("");
    navigate(`/modal/${id}`);
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
            Сохранить
          </button>
        </div>
      </div>
      <div className="section__bottom">
        <p className="section__quest">
          <Link className="section__link" to={`/${post.userId}`}>
            Отмена
          </Link>
        </p>
      </div>
    </section>
  );
};

export default EditPosts;
