import { Input } from "@chakra-ui/react";
import PropTypes from "prop-types";
import style from "./SearchInput.module.css";

function SearchInput({ onChange }) {
  const onInputChange = (e) => {
    onChange(e.currentTarget.value.trim());
  };

  return (
    <div className={style.wrapper}>
      <Input
        className={style.input}
        onChange={onInputChange}
        variant="flushed"
        placeholder="Search.."
      />
    </div>
  );
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default SearchInput;
