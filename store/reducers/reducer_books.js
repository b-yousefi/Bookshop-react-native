import { BOOK_ACTIONS } from "../actions/actions_book";
import Book from "../../models/Book";
import Page from "../../models/Page";

const initialState = {
  books: [],
  page: {},
};

export function BooksReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_ACTIONS.FILTER:
      if (
        action.payload.data._embedded &&
        action.payload.data._embedded.books
      ) {
        const { books } = action.payload.data._embedded;
        const { page } = action.payload.data;
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
        const pageObj = new Page(
          page.size,
          page.totalElements,
          page.totalPages,
          page.number
        );
        if (pageObj.number === 0) {
          return {
            books: loadedData,
            filter: action.filter,
            page: pageObj,
          };
        } else {
          return {
            books: state.books.concat(loadedData),
            filter: action.filter,
            page: pageObj,
          };
        }
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
