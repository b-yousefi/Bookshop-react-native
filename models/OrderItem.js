import Book from "./Book";

class OrderItem {
  constructor(id, book, quantity) {
    this.id = id;
    this.book = new Book(
      book.id.toString(),
      book.name,
      book.publishedDay,
      book.authorIds,
      book.publicationId,
      book.ISBN,
      book.summary,
      book.categoryIds,
      book.picture,
      book.price,
      book.quantity,
      book._links
    );
    this.quantity = quantity;
  }
}

export default OrderItem;
