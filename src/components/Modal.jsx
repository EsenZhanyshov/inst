import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContextProvider";

const Modal = () => {
  const { post, getOnePost, deletePost } = usePosts();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getOnePost(id);
  }, []);
  const [count, setCount] = useState(1);
  const handlePrev = () => {
    setCount(count - 1);
  };
  const handleNext = () => {
    setCount(count + 1);
  };
  console.log(count);
  return (
    <div className="modal">
      <button className="pagination-arrow prev" onClick={handlePrev}>
        {"<"}
      </button>
      <div className="modal__block">
        <div className="modal__item">
          <div className="modal__pic">
            <div className="modal__pic">
              {count === 1 ? (
                <img className="modal__img" src={post.url} alt="#" />
              ) : count === 2 ? (
                <img className="modal__img" src={post.url2} alt="#" />
              ) : (
                <img className="modal__img" src={post.url3} alt="#" />
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="pagination-arrow next" onClick={handleNext}>
        {">"}
      </button>
      <div className="modal__info">
        <h2 className="info__title">{post.comm}</h2>
        <div className="info__btns">
          <button
            className="info__btn btn"
            onClick={() => {
              deletePost(post.id);
              navigate(`/profile/${post.userId}`);
            }}
          >
            DELETE
          </button>
          <button
            className="info__btn btn"
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            EDIT
          </button>
          <button
            className="info__btn btn"
            onClick={() => navigate(`/profile/${post.userId}`)}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
