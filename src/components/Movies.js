import React from "react";
import MoviesCard from "../components/MoviesCard.js";
import { UserInfoContext } from "../contexts/CurrentUserContext.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Preloader from "../components/Preloader.js";
import SearchForm from "../components/SearchForm.js";

function Movies(props) {
  const currentUser = React.useContext(UserInfoContext);
  props.setRoute("movies");
  const [array, setArray] = React.useState([]);
  const [array2, setArray2] = React.useState({});
  let index = 0;
  let columns = 0;
  let rounds = 0;
  const cards = [
    {
      name: "33 слова о дизайне",
      like: true,
      link: "https://festagent.com/imageproxy/original/system/images/10affa98808bddb0d4f0571f9730eaf626afec32.jpg?1581264599",
      owner: "123456",
      time: "120",
    },
    {
      name: "В погоне за Бэнкси",
      like: false,
      link: "https://s1.kinoteatr.ru/upload/movies/5984/screenshots/53928.jpg?_ga=2.153809596.587799202.1626595186-1907984602.1626595186",
      owner: "123456789",
      time: "90",
    },
    {
      name: "33 слова о дизайне",
      like: true,
      link: "https://festagent.com/imageproxy/original/system/images/10affa98808bddb0d4f0571f9730eaf626afec32.jpg?1581264599",
      owner: "123456",
      time: "120",
    },
    {
      name: "В погоне за Бэнкси",
      like: false,
      link: "https://s1.kinoteatr.ru/upload/movies/5984/screenshots/53928.jpg?_ga=2.153809596.587799202.1626595186-1907984602.1626595186",
      owner: "123456789",
      time: "90",
    },
    {
      name: "33 слова о дизайне",
      like: true,
      link: "https://festagent.com/imageproxy/original/system/images/10affa98808bddb0d4f0571f9730eaf626afec32.jpg?1581264599",
      owner: "123456",
      time: "120",
    },
    {
      name: "В погоне за Бэнкси",
      like: false,
      link: "https://s1.kinoteatr.ru/upload/movies/5984/screenshots/53928.jpg?_ga=2.153809596.587799202.1626595186-1907984602.1626595186",
      owner: "123456789",
      time: "90",
    },
    {
      name: "33 слова о дизайне",
      like: true,
      link: "https://festagent.com/imageproxy/original/system/images/10affa98808bddb0d4f0571f9730eaf626afec32.jpg?1581264599",
      owner: "123456",
      time: "120",
    },
    {
      name: "В погоне за Бэнкси",
      like: false,
      link: "https://s1.kinoteatr.ru/upload/movies/5984/screenshots/53928.jpg?_ga=2.153809596.587799202.1626595186-1907984602.1626595186",
      owner: "123456789",
      time: "90",
    },
    {
      name: "33 слова о дизайне",
      like: true,
      link: "https://festagent.com/imageproxy/original/system/images/10affa98808bddb0d4f0571f9730eaf626afec32.jpg?1581264599",
      owner: "123456",
      time: "120",
    },
    {
      name: "В погоне за Бэнкси",
      like: false,
      link: "https://s1.kinoteatr.ru/upload/movies/5984/screenshots/53928.jpg?_ga=2.153809596.587799202.1626595186-1907984602.1626595186",
      owner: "123456789",
      time: "90",
    },
    {
      name: "33 слова о дизайне",
      like: true,
      link: "https://festagent.com/imageproxy/original/system/images/10affa98808bddb0d4f0571f9730eaf626afec32.jpg?1581264599",
      owner: "123456",
      time: "120",
    },
    {
      name: "В погоне за Бэнкси",
      like: false,
      link: "https://s1.kinoteatr.ru/upload/movies/5984/screenshots/53928.jpg?_ga=2.153809596.587799202.1626595186-1907984602.1626595186",
      owner: "123456789",
      time: "90",
    },
  ];

  React.useEffect(() => {
    props.setCards(cards);
    addingNewCards(window.innerWidth, cards);
    window.addEventListener(`resize`, () => {
      addingNewCards(window.innerWidth, cards);
    });
  }, []);

  function onButtonClick() {
    if (array2.columns === 2) {
    if (array2.rounds > 4) {
      let j = 0;
      console.log(array2)
      for (let i = 0; i < array2.columns; i++) {
        j = array2.index;
        setArray2({index: array2.index+ + 2, rounds: array2.rounds--, columns: array2.columns});
        setArray([cards[j+1], cards[j],...array]);
      }
      console.log(array)
    }
  }
  if (array2.columns === 3) {
    if (array2.rounds > 4) {
      let j = 0;
      for (let i = 0; i < array2.columns; i++) {
        j = array2.index;
        setArray2({index: array2.index++, rounds: array2.rounds--, columns: array2.columns});
        setArray([cards[j+2], cards[j+1], cards[j],...array]);
      }
    }
  }
  if (array2.columns === 1) {
    if (array2.rounds > 4) {
      let j = 0;
      for (let i = 0; i < array2.columns+1; i++) {
        j = array2.index;
        setArray2({index: array2.index++, rounds: array2.rounds-2, columns: array2.columns});
        setArray([cards[j+1], cards[j],...array]);
      }
    }
  }
  }

  function addingNewCards(width, arr) {
    let containerWidth = 0;
    let gapWidth = 0;
    let cardWidth = 0;
    let gap = 24;
    if (width >= 1280) {
      cardWidth = 364;
      containerWidth = width * 0.91;
    }
    if (width >= 768 && width < 1280) {
      cardWidth = 339;
      containerWidth = width * 0.92;
    }
    if (width >= 320 && width < 768) {
      cardWidth = 300;
      containerWidth = width * 0.94;
    }
    gapWidth = (Math.trunc(containerWidth / cardWidth) - 1) * gap;
    columns = Math.trunc((containerWidth - gapWidth) / cardWidth);
    rounds = arr.length / columns;

    if (rounds <= 4) {
      setArray(arr);
      setArray2({rounds: rounds})
    }
    if (rounds > 4) {
      let arr2 = [];
      for (let i = 0; i < columns * 4; i++) {
        index = i;
        arr2[i] = arr[i];
      }
      setArray(arr2);
      setArray2({index: index, columns: columns, rounds: rounds});
    }
  }

  let i = 0;
  const likesArr = [];
  cards.forEach((card) => {
    if (card.like === true) {
      likesArr[i] = card;
      i = i++;
    }
  });


  return (
    <>
      <Header
        route="movies"
        signUp={props.signUp}
        signIn={props.signIn}
        email={props.email}
        loggedIn={props.loggedIn}
        name="Выйти"
        signOut={props.signOut}
        tip="signOut"
        isButtonClicked={props.isButtonClicked}
        headerButtonClicked={props.headerButtonClicked}
      />
      <SearchForm />
      <Preloader />
      <div className="moviescardlist">
        {array.map((i) => {
          return (
            <>
              <MoviesCard
                key={i._id}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}
                name={i.name}
                url={i.link}
                like={i.like}
                time={i.time}
                likesArr={likesArr}
                onCardClick={props.setSelectedCardOn}
                clickOnImage={props.onImage}
                idCard={i._id}
                cardOwner={i.owner.toString()}
              />
            </>
          );
        })}
      </div>
      <button
          className={array2.rounds > 4 || array2.rounds > 4 ? "moviescardlist__button": "moviescardlist__button_invisible"}
          onClick={onButtonClick}
        >
          Еще
        </button>
      <Footer />
    </>
  );
}

export default Movies;
