import { AUTHOR_ACTIONS } from "../actions/action_authors";

export function AuthorsReducer(state = null, action) {
  switch (action.type) {
    case AUTHOR_ACTIONS.FETCH:
      const authors = action.payload.data._embedded.authors;
      const map = new Map(
        authors.map((i) => {
          const id = i._links.self.href.split("/").reverse()[0];
          return [id, { ...i, id }];
        })
      );
      return map;
    default:
      return state;
  }
}
