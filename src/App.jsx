import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PageDetails from "./pages/PageDetails/PageDetails";
import Page2 from "./pages/Page2/Page2";
//import { useEffect, useState } from "react";
//import { getPokemons } from "./servises/servises";

function App() {
  // const [pokemons, setPokemons] = useState([]);
  // const [offset, setOffset] = useState(0);

  // console.log(pokemons);

  // useEffect(() => {
  //   const getAllPokemons = async () => {
  //     const { count, results } = await getPokemons({ offset });

  //     setPokemons(results);
  //   };

  //   getAllPokemons();
  // }, [offset]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/scroll" element={<Page2 />} />
        <Route path="/details" element={<PageDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
