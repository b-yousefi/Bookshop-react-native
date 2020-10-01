import { PUBLICATION_ACTIONS } from "../actions/actions_publicaion";

export function PublicationReducer(state = null, action) {
  switch (action.type) {
    case PUBLICATION_ACTIONS.FETCH:
      const publications = action.payload.data._embedded.publications;
      const map = new Map(
        publications.map((i) => {
          const id = i._links.self.href.split("/").reverse()[0];
          return [id, { ...i, id }];
        })
      );
      return map;
    default:
      return state;
  }
}
