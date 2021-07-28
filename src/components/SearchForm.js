import React from "react";

function SearchFrom(props) {
  const [film, setFilm] = React.useState("");
  const [active, isActive] = React.useState(false);

  function handleChangeFilm(e) {
    setFilm(e.target.value);
  }
  return (
    <>
      <section className="searchform">
        <div className="searchform__container searchform__container_border-buttom">
          <button className={`searchform__button searchform__button_bright ${window.innerWidth < 768 ? "searchform__button_bright_invisible" : ""}`}></button>
          <input
            className="searchform__input"
            onChange={handleChangeFilm}
            type="text"
            value={film}
            name="film"
            required
            id="searchform__input"
            placeholder="Фильм"
          />
          <button className="searchform__button searchform__button_green"></button>
        </div>
        <div className="searchform__container-switch">
          <button
            className={
              active
                ? "searchform__switch searchform__switch_active"
                : "searchform__switch"
            }
          ></button>
          <p className="searchform__text">Короткометражки</p>
        </div>
      </section>
    </>
  );
}

export default SearchFrom;
