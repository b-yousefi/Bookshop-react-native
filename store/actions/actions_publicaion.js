import axios from "axios";
import { setError } from "./actions";
import Vars from "../../env";

const PUBLICATION_URL = `${Vars.REACT_APP_API_URL}/api/publications`;

export const PUBLICATION_ACTIONS = {
  FETCH: "PUBLICATION_FETCH",
  UPDATE: "PUBLICATION_UPDATE",
  DELETE: "PUBLICATION_DELETE",
  CREATE: "PUBLICATION_CREATE",
  SELECT: "PUBLICATION_SELECT",
};

export function fetchPublications() {
  return async (dispatch) => {
    try {
      const response = await axios.get(PUBLICATION_URL);
      dispatch({
        type: PUBLICATION_ACTIONS.FETCH,
        payload: response,
      });
    } catch (err) {
      dispatch(setError(error.response, PUBLICATION_ACTIONS.FETCH));
    }
  };
}

export function selectPublication(selected_publication) {
  return {
    type: PUBLICATION_ACTIONS.SELECT,
    publication: selected_publication,
  };
}
