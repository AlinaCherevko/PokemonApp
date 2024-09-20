import Pokemon from "../Pokemon/Pokemon";
import PropTypes from "prop-types";
//import style from "./PokemonListScroll.module.css";
import { memo } from "react";
import { FixedSizeGrid as Grid } from "react-window";

function PokemonListScroll({ pokemons }) {
  const rowHeight = 290;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 4 + columnIndex;
    const pokemon = pokemons[index];

    return (
      <div style={style}>
        {pokemon ? (
          <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ) : (
          <div>No Pokemons found yet</div>
        )}
      </div>
    );
  };

  return (
    <Grid
      className="Grid"
      height={(rowHeight * pokemons.length) / 4}
      width={1000}
      rowCount={Math.ceil(pokemons.length / 4)}
      columnCount={4}
      columnWidth={240}
      rowHeight={290}
    >
      {Cell}
    </Grid>
  );
}

PokemonListScroll.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object),
};

export default memo(PokemonListScroll);
