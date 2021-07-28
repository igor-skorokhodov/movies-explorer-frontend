import "../index.css";
import Main from "../components/Main.js";
import Movies from "../components/Movies.js";
import SavedMovies from "../components/SavedMovies.js";
import Navigation from "../components/Navigation.js";
import Profile from "../components/Profile.js";
import Error404 from "../components/Error404.js";
import React from "react";
import api from "../utils/api.js";
import { UserInfoContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
import SearchForm from "../components/SearchForm.js";

function App() {
  const [headerButtonClicked, isHeaderButtonClicked] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    id: "",
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [err, setErr] = React.useState(false);
  const history = useHistory();
  const [registeredIn, isRegisteredIn] = React.useState(false);
  const [route, setRoute] = React.useState("");
  const [validity, setValidity] = React.useState({
    formErrors: { email: "", password: "", name: "" },
    emailValid: false,
    passwordValid: false,
    formValidReg: false,
    formValidLog: false,
    nameValid: false,
  });

  React.useEffect(() => {
    document.title = "Movies explorer";
  });

  React.useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener(`resize`, () => {
      setWidth(window.innerWidth);
    });
  }, []);

  React.useEffect(() => {
    tokenCheck(localStorage.getItem("id"));
  }, []);

  function setCardsVers(arr) {
    setCards(arr);
  }

  function validateField(fieldName, value) {
    let fieldValidationErrors = validity.formErrors;
    let nameValid = validity.nameValid;
    let emailValid = validity.emailValid;
    let passwordValid = validity.passwordValid;
    let emailBoolean = false;
    switch (fieldName) {
      case "name":
        if (value.length <= 2) {
          nameValid = value.length <= 2;
          fieldValidationErrors.name = nameValid ? "имя слишком короткое" : "";
        }
        if (value.length >= 30) {
          nameValid = value.length >= 30;
          fieldValidationErrors.name = nameValid ? "имя слишком длинное" : "";
        }
        if (value.length === 0) {
          nameValid = true;
          fieldValidationErrors.name = "";
        }
        if (value.length > 2 && value.length < 30) {
          nameValid = false;
          fieldValidationErrors.name = "";
        }
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : "введите почту корректно";
        emailBoolean = emailValid ? false : true;
        if (value.length === 0) {
          emailBoolean = true;
          fieldValidationErrors.email = "";
        }
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "пароль сишком короткий";
        if (value.length === 0) {
          passwordValid = false;
          fieldValidationErrors.password = "";
        }
        break;
      default:
        break;
    }
    setValidity({
      formErrors: fieldValidationErrors,
      emailValid: !emailBoolean,
      passwordValid: passwordValid,
      nameValid: nameValid,
      formValidReg:
        validity.emailValid && validity.passwordValid && !validity.nameValid,
      formValidLog: validity.emailValid && validity.passwordValid,
    });
  }

  function isButtonClicked(arg) {
    if (arg === "false") {
      isHeaderButtonClicked(false);
    }
    if (arg === "true") {
      isHeaderButtonClicked(true);
    }
  }


function handleUpdateUser({ name, about, id }) {
    console.log(id);
    api
      .postUserInfo(name, about, id)
      .then((res) => {
        setCurrentUser({
          name: res.user.name,
          about: res.user.about,
          avatar: res.user.avatar,
          id: res.user._id,
        });
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}}`);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function tokenCheck(id) {
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      auth
        .getContent(token, id)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.user.email);
            setCurrentUser({
              name: res.user.name,
              about: res.user.about,
              avatar: res.user.avatar,
              id: res.user._id,
            });
          }
        })
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}`);
        });
      api
        .getAllCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}}`);
        });
      history.push("/main");
    }
  }

  function authorize(mail, password) {
    auth
      .authorize(mail, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user._id);
          handleLogin();
          setCurrentUser({
            name: data.user.name,
            about: data.user.about,
            avatar: data.user.avatar,
            id: data.user._id,
          });
          history.push("/main");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function register(mail, password) {
    auth
      .register(mail, password)
      .then((data) => {
        if (data) {
          isRegisteredIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        isRegisteredIn(false);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setLoggedIn(false);
    setCurrentUser({ name: "", about: "", avatar: "", id: "" });
    history.push("/sign-in");
    setEmail("");
  }

  function signUp() {
    history.push("/sign-in");
  }

  function signIn() {
    history.push("/sign-up");
  }

  return (
    <UserInfoContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              route="main"
              signIn={signIn}
              signOut={signOut}
              component={Main}
              setSelectedCardOn={setSelectedCard}
              card={selectedCard}
              cards={cards}
              signUp={signUp}
              email={email}
              loggedIn={loggedIn}
            />
          </Route>
          <Route exact path="/sign-up">
            <Register
              registeredIn={registeredIn}
              register={register}
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              regError={err}
            />
          </Route>
          <Route exact path="/sign-in">
            <Login
              handleLogin={handleLogin}
              setEmail={setEmail}
              authorize={authorize}
            />
          </Route>
          <Route path="/movies">
            <Movies
              setRoute={setRoute}
              isButtonClicked={isButtonClicked}
              headerButtonClicked={headerButtonClicked}
              setCards={setCardsVers}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              setCards={setCardsVers}
            />
          </Route>
          <Route path="/profile">
            <Profile
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              route={route}
            />
          </Route>
          <Route path="/signup">
            <Register
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              route={route}
              validity={validity}
              validateField={validateField}
            />
          </Route>
          <Route path="/signin">
            <Login
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              route={route}
              validity={validity}
              validateField={validateField}
            />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {width > 1100 && !headerButtonClicked ? 
          <></> :
          <Navigation
          isButtonClicked={isButtonClicked}
          headerButtonClicked={headerButtonClicked}
          route={route}
        />}
      {console.log(headerButtonClicked)}
      </div>
    </UserInfoContext.Provider>
  );
}

export default App;
