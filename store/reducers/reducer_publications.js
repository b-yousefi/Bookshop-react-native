import { PUBLICATION_ACTIONS } from "../actions/actions_publicaion";
import Publication from "../../models/Publication";

export function PublicationReducer(state = null, action) {
  switch (action.type) {
    case PUBLICATION_ACTIONS.FETCH:
      const { publications } = action.payload.data._embedded;
      const loadedData = [];
      for (const publication of publications) {
        const id = publication._links.self.href.split("/").reverse()[0];
        loadedData.push(
          new Publication(
            id,
            publication.name,
            publication.description,
            publication.website
          )
        );
      }
      return loadedData;
    default:
      return state;
  }
}
