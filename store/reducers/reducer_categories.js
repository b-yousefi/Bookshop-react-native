import { CAT_ACTIONS } from "../actions/actions_categories";

export function CategoriesReducer(state = null, action) {
  switch (action.type) {
    case CAT_ACTIONS.FETCH:
      return action.payload.data._embedded.categories;
    default:
      return state;
  }
}
