import PropTypes from "prop-types";
import style from "./Pagination.module.css";
import classNames from "classnames";
import Icon from "../Icon/Icon";

function Pagination({ count, setPages, offset, setFilteredPage, pokemons }) {
  const postPerPage = 20;
  const totalPages = Math.ceil(count / postPerPage);
  const siblingCount = 3;

  const getVisiblePages = () => {
    const currentPage = offset / postPerPage + 1;
    const totalVisiblePages = siblingCount * 2 + 1;

    let startPage = Math.max(currentPage - siblingCount, 1);
    let endPage = Math.min(currentPage + siblingCount, totalPages);

    if (endPage - startPage + 1 < totalVisiblePages) {
      const remainingPages = totalVisiblePages - (endPage - startPage + 1);
      if (startPage === 1) {
        endPage = Math.min(endPage + remainingPages, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(startPage - remainingPages, 1);
      }
    }

    const paginationArray = [];
    for (let index = startPage; index <= endPage; index++) {
      paginationArray.push(index);
    }

    return paginationArray;
  };

  const visiblePagesArray = getVisiblePages();

  const onBtnPageClick = (e) => {
    const content = (Number(e.target.textContent) - 1) * 20;
    setPages(content);
    setFilteredPage(Number(e.target.textContent));
  };

  const moveToStart = () => {
    setPages(0);
    setFilteredPage(1);
  };

  const moveToEnd = () => {
    const lastPage = (totalPages - 1) * 20;
    setPages(lastPage);
    setFilteredPage(Math.ceil(pokemons.length / postPerPage));
  };

  return (
    <div className={style.btnWrapper}>
      <button onClick={moveToStart}>
        <Icon id="icon-double-arrow-left" width="20px" height="20px" />
      </button>
      {visiblePagesArray.length > 0 &&
        visiblePagesArray.map((item) => (
          <button
            onClick={onBtnPageClick}
            className={classNames(style.btn, {
              [style.active]: (+item - 1) * 20 === offset,
            })}
            key={item}
          >
            {item}
          </button>
        ))}
      <button onClick={moveToEnd}>
        <Icon
          id="icon-double-arrow-right-svgrepo-com"
          width="20px"
          height="20px"
        />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
  setPages: PropTypes.func,
  offset: PropTypes.number,
  setFilteredPage: PropTypes.func,
  pokemons: PropTypes.arrayOf(PropTypes.object),
};

export default Pagination;
