import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPokemonsByColor, getPokemonsByType } from "../servises/servises";
import PropTypes from "prop-types";
import style from "./Selector.module.css";

function Selector({ filterByOption, placeholder }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getPokemonsColor = async () => {
      if (placeholder === "By color") {
        const { results } = await getPokemonsByColor();
        setOptions(results);
      } else {
        const { results } = await getPokemonsByType();
        setOptions(results);
      }
    };
    getPokemonsColor();
  }, [placeholder]);

  const onSelectChange = (e) => {
    filterByOption(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <Select
        className={style.selector}
        size="md"
        variant="flushed"
        placeholder={placeholder}
        onChange={onSelectChange}
      >
        {options.length > 0 &&
          options.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
      </Select>
    </div>
  );
}

Selector.propTypes = {
  filterByOption: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Selector;
