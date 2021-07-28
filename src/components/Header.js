import React from "react";
import Navigation from "../components/Navigation.js";
import {useHistory} from "react-router-dom";

function Header(props) {
  const history = useHistory();
  function compareTips() {
    if (props.tip === "signOut") {
      props.signOut();
    }
    if (props.tip === "register") {
      props.signUp();
    }
    if (props.tip === "login") {
      props.signIn();
    }
  }

  function openButtonIsClicked () {
    props.isButtonClicked("true")
  }

  function redirectToMain() {
    history.push("/");
  }

  function redirectToRegister() {
    history.push("/signup");
  }

  function redirectToLogin() {
    history.push("/signin");
  }

  return (
    <header className={`header ${props.route !== "main" ? "header_background" : ""}`}>
      <button className="header__logo" onClick={redirectToMain}></button>
      <div className="header__container">
      {window.innerWidth < 1099 && props.route !== "main" ? <button className="header__menu" onClick={openButtonIsClicked}></button> : props.route === "main" ?
       <div className="header__container">
        <button className="header__button header__button_transparent-button" onClick={redirectToRegister}>Регистрация</button>
        <button className="header__button header__button_green-button" onClick={redirectToLogin}>
          Войти
        </button>
        </div> :
        props.headerButtonClicked ? "" :<Navigation route={props.route}/>}
      </div>
    </header>
  );
}

export default Header;
