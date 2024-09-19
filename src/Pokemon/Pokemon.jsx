import PropTypes from "prop-types";
import { getPokemonById } from "../servises/servises";
import { useEffect, useState } from "react";
import style from "./Pokemon.module.css";

function Pokemon({ name }) {
  const [pokemon, setPokemon] = useState(null);

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
        <p>
          Type:{" "}
          {types.map((typeObj, index) => (
            <span key={index}>
              {typeObj.type.name}
              {index < types.length - 1 && ", "}
            </span>
          ))}
        </p>
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
