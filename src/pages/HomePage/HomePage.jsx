import { useEffect, useState } from "react";
import {
  getArrayPokemonByColor,
  getPokemons,
} from "../../servises/servises.js";
import Pagination from "../../Pagination/Pagination.jsx";
import PokemonList from "../../PokemonList/PokemonList.jsx";

import style from "./HomePage.module.css";
import Selector from "../../Selector/Selector.jsx";

function HomePage() {
  // const [name, setName] = useState("");
  const [name, setName] = useState(localStorage.getItem("color"));
  const [pokemons, setPokemons] = useState([]);
  const [paginatedPokemons, setPaginatedPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [filteredPage, setFilteredPage] = useState(1);
  const pageSize = 20;

  const setPages = (value) => {
    setOffset(value);
  };

  const filterByColor = (value) => {
    localStorage.removeItem("color");
    localStorage.setItem("color", value);
    setName(value);
    setFilteredPage(1);
  };

  useEffect(() => {
    const getPokemonsData = async () => {
      if (name) {
        const { pokemon_species } = await getArrayPokemonByColor(name);
        setPokemons(pokemon_species);
        setCount(pokemon_species.length);
      } else {
        const { count, results } = await getPokemons({ offset });
        setPokemons(results);
        setCount(count);
      }
    };
    getPokemonsData();
  }, [offset, name]);

  useEffect(() => {
    const getPagination = pokemons.slice(
      (filteredPage - 1) * pageSize,
      pageSize * filteredPage
    );
    setPaginatedPokemons(getPagination);
  }, [filteredPage, pageSize, pokemons]);

  const pokemonsToShow = name ? paginatedPokemons : pokemons;

  return (
    <section className={style.pageWrapper}>
      <div className="container">
        <Selector filterByOption={filterByColor} placeholder="By color" />
        {pokemonsToShow.length > 0 ? (
          <>
            <PokemonList pokemons={pokemonsToShow} />
            <Pagination
              count={count}
              setPages={setPages}
              offset={offset}
              setFilteredPage={setFilteredPage}
              pokemons={pokemons}
            />
          </>
        ) : (
          <p>Sorry, no find any pokemons</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
