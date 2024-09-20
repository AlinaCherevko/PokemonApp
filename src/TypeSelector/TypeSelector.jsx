import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import style from "./TypeSelector.module.css";
import { getPokemonsByType } from "../servises/servises";

function TypeSelector({ filterByType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getPokemonsTypes = async () => {
      const { results } = await getPokemonsByType();
      setTypes(results);
    };
    getPokemonsTypes();
  }, []);

  const onSelectChange = (e) => {
    filterByType(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <Select
        className={style.selector}
        size="md"
        variant="flushed"
        placeholder="By type"
        onChange={onSelectChange}
      >
        {types.length > 0 &&
          types.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
      </Select>
    </div>
  );
}

TypeSelector.propTypes = {
  filterByType: PropTypes.func,
};

export default TypeSelector;
