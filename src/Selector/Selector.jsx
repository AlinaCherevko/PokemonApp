import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPokemonsByColor } from "../servises/servises";
import PropTypes from "prop-types";
import style from "./Selector.module.css";

function Selector({ filterByColor }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const getPokemonsColor = async () => {
      const { results } = await getPokemonsByColor();
      setColors(results);
    };
    getPokemonsColor();
  }, []);

  const onSelectChange = (e) => {
    console.log(e.target.value);
    filterByColor(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <Select
        className={style.selector}
        size="md"
        variant="flushed"
        placeholder="By color"
        onChange={onSelectChange}
      >
        {colors.length > 0 &&
          colors.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
      </Select>
    </div>
  );
}

Selector.propTypes = {
  filterByColor: PropTypes.func,
};

export default Selector;
