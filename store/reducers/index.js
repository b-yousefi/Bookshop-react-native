import { combineReducers } from "redux";
import { BooksReducer } from "./reducer_books";

const RootReducer = combineReducers({
  books: BooksReducer,
});

export default RootReducer;
