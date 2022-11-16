import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  getRecipesCount,
  getRecipesTotal,
  getRecipesPage,
  changePage,
} from "../../features/recipes/recipesSlice";

const Pagination = () => {
  const [recipesPerPage] = useState(9);
  const dispatch = useDispatch();
  const currentPage = useSelector(getRecipesPage);
  const total = useSelector(getRecipesTotal);
  const count = useSelector(getRecipesCount);

  const nPages = Math.ceil(count / recipesPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) {
      dispatch(changePage(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      dispatch(changePage(currentPage - 1));
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link onClick={prevPage} to="#">
              Previus
            </Link>
          </li>
          {pageNumbers.length >= 1
            ? pageNumbers.map((number) => (
                <li key={number}>
                  <Link onClick={() => dispatch(changePage(number))} to="#">
                    {number}
                  </Link>
                </li>
              ))
            : null}
          <li>
            <Link onClick={nextPage} to="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
