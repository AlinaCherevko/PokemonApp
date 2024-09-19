import { useEffect, useState } from "react";
import PokemonList from "../../PokemonList/PokemonList";

import Selector from "../../Selector/Selector";
import { getPokemons } from "../../servises/servises";

function Page2() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllPokemons = async () => {
      const { results } = await getPokemons({ offset });
      setPokemons((prevState) => [...prevState, ...results]);
    };
    getAllPokemons();
  }, [offset]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  useEffect(() => {
    if (loading == true) {
      setOffset((prevState) => prevState + 20);
    }
  }, [loading]);

  return (
    <section>
      <div className="container">
        <Selector />
        {pokemons.length > 0 ? (
          <>
            <PokemonList pokemons={pokemons} />
          </>
        ) : (
          <p>Sorry, no find any pokemons</p>
        )}
        {loading && <p>Loading content...</p>}
      </div>
    </section>
  );
}

export default Page2;
