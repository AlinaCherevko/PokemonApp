import { useEffect, useState } from "react";
import PokemonList from "../../PokemonList/PokemonList";
import { getArrayPokemonByType, getPokemons } from "../../servises/servises";
import TypeSelector from "../../TypeSelector/TypeSelector";

function Page2() {
  const [name, setName] = useState("");

  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(pokemons);
  //console.log(loading);
  //console.log(offset);

  useEffect(() => {
    const getAllPokemons = async () => {
      if (name) {
        const { pokemon } = await getArrayPokemonByType(name);

        const changedArray = pokemon.map((item) => item.pokemon);
        setPokemons(changedArray);
        //setPokemons((prevState) => [...prevState, ...pokemon]);
        setLoading(false);
      } else {
        const { results } = await getPokemons({ offset });
        setPokemons((prevState) => [...prevState, ...results]);
        setLoading(false);
      }
    };
    getAllPokemons();
  }, [offset, name]);

  const filterByType = (value) => {
    setName(value);
  };

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
        <TypeSelector filterByType={filterByType} />
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
