import axios from "axios";
import Vars from "../../env";

const Category_URL = `${Vars.REACT_APP_API_URL}/api/categories`;

export const CAT_ACTIONS = {
  FETCH: "CAT_FETCH",
  UPDATE: "CAT_UPDATE",
  DELETE: "CAT_DELETE",
  CREATE: "CAT_CREATE",
  SELECT: "CAT_SELECT",
};

export function fetchCategory() {
  const url = `${Category_URL}/allcategories`;
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      dispatch({
        type: CAT_ACTIONS.FETCH,
        payload: response,
      });
    } catch (err) {
      throw err;
    }
  };
}

export function selectCategory(selected_category) {
  return {
    type: CAT_ACTIONS.SELECT,
    category: selected_category,
  };
}
