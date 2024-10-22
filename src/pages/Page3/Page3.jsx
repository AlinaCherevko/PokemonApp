import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { getPokemons } from "../../servises/servises";
import Pokemon from "../../Pokemon/Pokemon";
import { useEffect, useState } from "react";

function Page3() {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const isItemLoaded = (index) => !!pokemons[index];

  const loadMoreItems = () => {
    if (!loading) {
      setLoading(true);
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPokemons = async () => {
      const { results } = await getPokemons({ offset });
      setPokemons(results);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchPokemons = async () => {
      const { results } = await getPokemons({ offset });
      setPokemons((prevState) => [...prevState, ...results]);
      setLoading(false);
    };
    if (offset > 0) {
      fetchPokemons();
    }
  }, [offset]);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 4 + columnIndex;
    const pokemon = pokemons[index];

    return (
      <div style={style}>
        {pokemon && (
          <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        )}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={pokemons.length + 20}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <Grid
          className="Grid"
          height={window.innerHeight}
          width={window.innerWidth}
          rowCount={Math.ceil((pokemons.length + 20) / 4)}
          columnCount={4}
          columnWidth={240}
          rowHeight={290}
          onItemsRendered={({ visibleRowStartIndex, visibleRowStopIndex }) => {
            const startIndex = visibleRowStartIndex * 4;
            const stopIndex = (visibleRowStopIndex + 1) * 4;
            onItemsRendered({
              overscanStartIndex: startIndex,
              overscanStopIndex: stopIndex,
              visibleStartIndex: startIndex,
              visibleStopIndex: stopIndex,
            });
          }}
          ref={ref}
        >
          {Cell}
        </Grid>
      )}
    </InfiniteLoader>
  );
}

export default Page3;
