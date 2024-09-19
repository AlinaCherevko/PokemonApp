import { useEffect, useState } from "react";
import PokemonList from "../../PokemonList/PokemonList";

import Selector from "../../Selector/Selector";
import { getPokemons } from "../../servises/servises";

function Page2() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(loading);
  console.log(offset);

  useEffect(() => {
    const getAllPokemons = async () => {
      const { results } = await getPokemons({ offset });
      setPokemons((prevState) => [...prevState, ...results]);
      setLoading(false);
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

  useEffect(() => {
    if (loading == true) {
      setOffset((prevState) => prevState + 20);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
