import Category from "../../models/Category";
import { CAT_ACTIONS } from "../actions/actions_categories";

const initialState = {
  categories_arr: [],
};

export function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CAT_ACTIONS.FETCH:
      const categories = action.payload.data._embedded.categories;
      const loadedData = createCategoriesArr(categories, null);
      return { categories_arr: loadedData };
    default:
      return state;
  }
}

function createCategoriesArr(categories, parent) {
  let arr = [];

  categories.forEach((category) => {
    const catObj = new Category(
      category.id,
      category.name,
      category.description,
      parent
    );
    arr.push(catObj);
    if (category.subCategories.length > 0) {
      let subs = createCategoriesArr(category.subCategories, category.id);
      arr = arr.concat(subs);
    }
  });
  return arr;
}
