import axios from "axios";
import { setError } from "./actions";
import _ from "lodash";
import Vars from "../../env";
const BOOK_URL = `${Vars.REACT_APP_API_URL}/api/books`;

export const BOOK_ACTIONS = {
  FILTER: "BOOK_FILTER",
  FETCH: "BOOK_FETCH",
  UPDATE: "BOOK_UPDATE",
  DELETE: "BOOK_DELETE",
  CREATE: "BOOK_CREATE",
};

const PAGE_SIZE = 8;

export function fetchBook(id) {
  return (dispatch) => {
    const url = `${BOOK_URL}/${id}`;
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: BOOK_ACTIONS.FETCH,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, BOOK_ACTIONS.FETCH));
      });
  };
}

export function filterBooks() {
  return (dispatch, getState) => {
    const filter = getState().filter;
    let refresh = false;

    if (getState().books && getState().books !== null) {
      const booksFilter = getState().books.filter;
      if (
        !booksFilter ||
        !_.isEqual(filter.publicationIds, booksFilter.publicationIds) ||
        !_.isEqual(filter.categoryIds, booksFilter.categoryIds) ||
        !_.isEqual(filter.authorIds, booksFilter.authorIds)
      ) {
        refresh = true;
      }
    } else {
      refresh = true;
    }

    if (!refresh) {
      //do nothing
      return;
    }
    dispatch(filterBooksByPage(1));
  };
}

export function filterBooksByPage(page) {
  return (dispatch, getState) => {
    const filter = getState().filter;
    const url =
      `${BOOK_URL}/filter?publicationIds=${filter.publicationIds.map(
        (f) => f.id
      )}` +
      `&categoryIds=${filter.categoryIds.map(
        (f) => f.id
      )}&authorIds=${filter.authorIds.map((f) => f.id)}` +
      `&page=${page - 1}&size=${PAGE_SIZE}`;

    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: BOOK_ACTIONS.FILTER,
          payload: response,
          filter: Object.assign({}, filter),
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, BOOK_ACTIONS.FILTER));
      });
  };
}

export function fetchBooks() {
  return (dispatch) => {
    dispatch(
      filterBooks({ publicationIds: [], categoryIds: [], authorIds: [] })
    );
  };
}
