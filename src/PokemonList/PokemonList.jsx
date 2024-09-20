import Pokemon from "../Pokemon/Pokemon";
import PropTypes from "prop-types";
import style from "./PokemonList.module.css";
import { memo } from "react";

function PokemonList({ pokemons }) {
  return (
    <ul className={style.list}>
      {pokemons.length > 0 &&
        pokemons.map(({ name, url }) => (
          <Pokemon key={name} name={name} url={url}></Pokemon>
        ))}
    </ul>
  );
}

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object),
};

export default memo(PokemonList);
