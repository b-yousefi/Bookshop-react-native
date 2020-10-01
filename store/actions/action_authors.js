import axios from "axios";
import { setError } from "./actions";
import Vars from "../../env";

const Author_URL = `${Vars.REACT_APP_API_URL}/api/authors`;

export const AUTHOR_ACTIONS = {
  FETCH: "AUTHOR_FETCH",
  UPDATE: "AUTHOR_UPDATE",
  DELETE: "AUTHOR_DELETE",
  CREATE: "AUTHOR_CREATE",
  SELECT: "AUTHOR_SELECT",
};

export function fetchAuthors() {
  return (dispatch) => {
    axios
      .get(Author_URL)
      .then((response) => {
        dispatch({
          type: AUTHOR_ACTIONS.FETCH,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, AUTHOR_ACTIONS.FETCH));
      });
  };
}

export function selectAuthor(selected_author) {
  return {
    type: AUTHOR_ACTIONS.SELECT,
    author: selected_author,
  };
}
