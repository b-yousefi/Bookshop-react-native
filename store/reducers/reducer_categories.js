import Category from "../../models/Category";
import { CAT_ACTIONS } from "../actions/actions_categories";

const initialState = {
  categories_arr: [],
};

export function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CAT_ACTIONS.FETCH:
      const categories = action.payload.data._embedded.categories;
      const loadedData = [];
      categories.forEach((category) => {
        loadedData.push(
          new Category(
            category.name,
            category.description,
            category._links.self.href,
            category._links.subCategories.href
          )
        );
      });
      return { categories_arr: loadedData };
    default:
      return state;
  }
}
