import { useState } from "react";
import s from "./Searchbar.module.css";

export default function Searcbar({ submit }) {
  const [searchbar, setSearchbar] = useState("");

  const formsubmit = (e) => {
    e.preventDefault();
    submit(searchbar);
    reset();
  };

  const inputChange = (e) => {
    const { value } = e.currentTarget;
    setSearchbar(value);
  };

  const reset = () => {
    setSearchbar("");
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={formsubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          name="searchbar"
          value={searchbar}
          onChange={inputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
