import React from "react";
import { UserInfoContext } from "../contexts/CurrentUserContext.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Promo from "../components/Promo.js";
import NavTab from "../components/NavTab.js";
import AboutProject from "../components/AboutProject.js";
import Techs from "../components/Techs.js";
import AboutMe from "../components/AboutMe.js";

function Main(props) {
  const currentUser = React.useContext(UserInfoContext);
  return (
    <>
      <Header
        route="main"
        signUp={props.signUp}
        signIn={props.signIn}
        email={props.email}
        loggedIn={props.loggedIn}
        name="Выйти"
        signOut={props.signOut}
        tip="signOut"
      />
      <main className="content">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
