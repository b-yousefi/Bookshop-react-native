import { AUTHOR_ACTIONS } from "../actions/action_authors";
import Author from "../../models/Author";

export function AuthorsReducer(state = null, action) {
  switch (action.type) {
    case AUTHOR_ACTIONS.FETCH:
      const { authors } = action.payload.data._embedded;
      const loadedData = [];
      for (const author of authors) {
        const id = author._links.self.href.split("/").reverse()[0];
        loadedData.push(
          new Author(
            id,
            author.fullName,
            author.birthday,
            author.description,
            author.picture
          )
        );
      }
      return loadedData;
    default:
      return state;
  }
}
