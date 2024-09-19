import PropTypes from "prop-types";
import {
  //getPokemonByForm,
  //getPokemonByHabitats,
  getPokemonById,
} from "../servises/servises";
import { useEffect, useState } from "react";
import style from "./Pokemon.module.css";

function Pokemon({ name }) {
  const [pokemon, setPokemon] = useState(null);
  //const [color, setColor] = useState(null);

  //const [form, setForm] = useState(null);
  //const [habitats, setHabitats] = useState(null);

  // console.log(pokemon);

  useEffect(() => {
    if (!name) return;
    const getOnePokemon = async () => {
      const res = await getPokemonById(name);
      setPokemon(res);
    };
    getOnePokemon();
  }, [name]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }
  const { sprites: { front_default } = {}, height, weight, types } = pokemon;

  return (
    <div className={style.item}>
      <h2 className={style.name}>{name}</h2>
      <img src={front_default} alt={name} />
      <div>
        <p>Type: {types[0].type.name}</p>
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
      </div>
    </div>
  );
}

Pokemon.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default Pokemon;
