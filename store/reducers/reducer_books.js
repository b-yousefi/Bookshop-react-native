import { BOOK_ACTIONS } from "../actions/actions_book";
import Book from "../../models/Book";

const initialState = {
  books: [],
};

export function BooksReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_ACTIONS.FILTER:
      if (
        action.payload.data._embedded &&
        action.payload.data._embedded.books
      ) {
        const books = action.payload.data._embedded.books;
        const loadedData = [];
        for (const book of books) {
          loadedData.push(
            new Book(
              book.id,
              book.name,
              book.publishedDay,
              book.authorIds,
              book.publicationId,
              book.ISBN,
              book.summary,
              book.categoryIds,
              book.picture,
              book.price,
              book.quantity
            )
          );
        }
        return {
          books: loadedData,
          filter: action.filter,
          page: action.payload.data.page,
        };
      } else {
        return { map: null, filter: action.filter };
      }
    case BOOK_ACTIONS.FETCH:
      const book = action.payload.data;
      let map = state ? new Map(state.map) : new Map();
      map.set(book.id, book);
      return { map, filter: null };
    default:
      return state;
  }
}
