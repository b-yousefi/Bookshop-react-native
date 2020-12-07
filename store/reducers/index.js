import { combineReducers } from "redux";
import { BooksReducer } from "./reducer_books";
import { FilterReducer } from "./reducer_filter";
import { CategoriesReducer } from "./reducer_categories";
import { AuthorsReducer } from "./reducer_authors";
import { PublicationReducer } from "./reducer_publications";
import { UserReducer } from "./reducer_user";
import { OrdersReducer } from "./reducer_orders";
import { ShoppingCartReducer } from "./reducer_shopping_cart";

const RootReducer = combineReducers({
  books: BooksReducer,
  filter: FilterReducer,
  categories: CategoriesReducer,
  authors: AuthorsReducer,
  publications: PublicationReducer,
  user: UserReducer,
  orders: OrdersReducer,
  shopping_cart: ShoppingCartReducer,
});

export default RootReducer;
