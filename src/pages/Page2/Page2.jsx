import { useEffect, useState } from "react";
import PokemonList from "../../PokemonList/PokemonList";

import Selector from "../../Selector/Selector";
import { getPokemons } from "../../servises/servises";

function Page2() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  console.log(pokemons);

  useEffect(() => {
    const getAllPokemons = async () => {
      const { count, results } = await getPokemons({ offset });

      setPokemons(results);
    };

    getAllPokemons();
  }, [offset]);

  return (
    <section>
      <div className="container">
        <Selector />
        <PokemonList pokemons={pokemons} />
      </div>
    </section>
  );
}

export default Page2;
