import axios from "axios";
import { setError } from "../actions/actions";
import Vars from "../../env";

const Category_URL = `${Vars.REACT_APP_API_URL}/api/categories`;

export const CAT_ACTIONS = {
  FETCH: "CAT_FETCH",
  UPDATE: "CAT_UPDATE",
  DELETE: "CAT_DELETE",
  CREATE: "CAT_CREATE",
  SELECT: "CAT_SELECT",
};

export function fetchCategories() {
  const url = `${Category_URL}/allcategories`;
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: CAT_ACTIONS.FETCH,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, CAT_ACTIONS.FETCH));
      });
  };
}

export function selectCategory(selected_category) {
  return {
    type: CAT_ACTIONS.SELECT,
    category: selected_category,
  };
}
