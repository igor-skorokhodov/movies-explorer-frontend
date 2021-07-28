import React from "react";
import Header from "../components/Header.js";

function Profile(props) {
  props.setRoute("profile");
  const hello = "Привет, Виталий!";

  return (
    <section className="profile">
      <Header route={props.route} isButtonClicked={props.isButtonClicked} />
      <div className="profile__container">
        <h1 className="profile__header">{hello}</h1>
        <div className="profile__info-container">
          <div className="profile__info profile__info_underline">
            <p className="profile__text profile__text_weight">Имя</p>
            <p className="profile__text">Виталий</p>
          </div>
          <div className="profile__info">
            <p className="profile__text profile__text_weight">E-mail</p>
            <p className="profile__text">pochta@yandex.ru</p>
          </div>
        </div>
        <div className="profile__buttons">
          <button className="profile__button">Редактировать</button>
          <button className="profile__button profile__button_red">
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
