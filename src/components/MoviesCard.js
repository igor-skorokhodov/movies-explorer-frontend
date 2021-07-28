import React from "react";
import { UserInfoContext } from "../contexts/CurrentUserContext.js";

function MoviesCard(props) {
  const currentUser = React.useContext(UserInfoContext);

  function handleClick() {
    props.onCardClick({ url: props.url, name: props.name });
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  function turningIntInTime(props) {
    const hour = Math.trunc(props / 60);
    const min = ((props / 60) - Math.trunc(props / 60)) * 60;
    return `${hour}ч ${min}м`
  }

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isInSaved = props.savedMovies === "savedMovies";
  const isLiked = props.like === true;
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `moviescard__heart ${isLiked ? "moviescard__heart_anabled" : ""} ${
    isInSaved ? "moviescard__close" : ""
  }`;
  const moviesCardInSaved = `moviescard ${
    isInSaved ? "moviescard_hover" : ""
  }`;

  return (
    <article className={moviesCardInSaved}>
        <img
          className="moviescard__picture"
          src={props.url}
          //onClick={handleClick}
          alt={props.name}
        />
      <div className="moviescard__container">
        <h3 className="moviescard__title">{props.name}</h3>
          <button
            className={cardLikeButtonClassName}
            //onClick={handleLikeClick}
            type="button"
            aria-label="Лайк"
          ></button>
      </div>
      <p className="moviescard__time">{turningIntInTime(props.time)}</p>
    </article>
  );
}

export default MoviesCard;
