import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getPokemons = async ({ offset }) => {
  const { data } = await instance.get(`/pokemon?offset=${offset}`);

  return data;
};

export const getPokemonById = async (name) => {
  const { data } = await instance.get(`/pokemon/${name}`);
  return data;
};

export const getPokemonsByColor = async () => {
  const { data } = await instance.get("/pokemon-color");
  return data;
};

export const getArrayPokemonByColor = async (name) => {
  const { data } = await instance.get(`/pokemon-color/${name}`);

  return data;
};

export const getPokemonByForm = async (name) => {
  const { data } = await instance.get(`/pokemon-form/${name}`);
  return data;
};

export const getPokemonByHabitats = async () => {
  const { data } = await instance.get("/ability");
  return data;
};
