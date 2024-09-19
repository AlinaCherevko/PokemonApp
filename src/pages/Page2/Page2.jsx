import { useEffect, useState } from "react";
import PokemonList from "../../PokemonList/PokemonList";
import { getArrayPokemonByType, getPokemons } from "../../servises/servises";
import TypeSelector from "../../TypeSelector/TypeSelector";

function Page2() {
  const [name, setName] = useState("");

  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filteredPage, setFilteredPage] = useState(1);
  const [paginatedPokemons, setPaginatedPokemons] = useState([]);
  const pageSize = 20;

  console.log(loading);

  useEffect(() => {
    const getAllPokemons = async () => {
      if (name) {
        const { pokemon } = await getArrayPokemonByType(name);

        const changedArray = pokemon.map((item) => item.pokemon);
        if (filteredPage === 1) {
          setPaginatedPokemons(changedArray.slice(0, pageSize));
        } else {
          setPaginatedPokemons((prevState) => [
            ...prevState,
            ...changedArray.slice(
              (filteredPage - 1) * pageSize,
              pageSize * filteredPage
            ),
          ]);
        }
        setLoading(false);
      } else {
        const { results } = await getPokemons({ offset });
        setPokemons((prevState) => [...prevState, ...results]);
        setLoading(false);
      }
    };
    getAllPokemons();
  }, [offset, name, pageSize, filteredPage]);

  const filterByType = (value) => {
    setName(value);
    setFilteredPage(1);
    setPaginatedPokemons([]);
    setPokemons([]);
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
      if (name) {
        setFilteredPage((prevState) => prevState + 1);
      } else {
        setOffset((prevState) => prevState + 20);
      }
    }
  }, [loading, name]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pokemonsToShow = name ? paginatedPokemons : pokemons;

  return (
    <section>
      <div className="container">
        <TypeSelector filterByType={filterByType} />
        {pokemonsToShow.length > 0 ? (
          <>
            <PokemonList pokemons={pokemonsToShow} />
          </>
        ) : (
          <p>Sorry, no find any pokemons</p>
        )}
      </div>
    </section>
  );
}

export default Page2;
