import { FILTER_ACTIONS } from "../actions/actions_filter";
import { AUTHOR_ACTIONS } from "../actions/action_authors";
import { CAT_ACTIONS } from "../actions/actions_categories";
import { PUBLICATION_ACTIONS } from "../actions/actions_publicaion";

const INITIAL_STATE = {
  publicationIds: [],
  categoryIds: [],
  authorIds: [],
  refresh: true,
};

export function FilterReducer(state = INITIAL_STATE, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case FILTER_ACTIONS.SET:
    case FILTER_ACTIONS.CLEAR:
      newState = Object.assign({}, action.data);
      break;
    case AUTHOR_ACTIONS.SELECT:
      newState.authorIds = [action.author];
      break;
    case CAT_ACTIONS.SELECT:
      newState.categoryIds = [action.category];
      break;
    case PUBLICATION_ACTIONS.SELECT:
      newState.publicationIds = [action.publication];
      break;
    default:
      return state;
  }
  return newState;
}
