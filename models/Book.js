class Book {
  constructor(
    id,
    name,
    publishedDay,
    authorIds,
    publicationId,
    ISBN,
    summary,
    categoryIds,
    picture,
    price,
    quantity
  ) {
    this.id = id;
    this.name = name;
    this.publishedDay = publishedDay;
    this.authorIds = authorIds;
    this.publicationId = publicationId;
    this.ISBN = ISBN;
    this.summary = summary;
    this.categoryIds = categoryIds;
    this.picture = picture;
    this.price = price;
    this.quantity = quantity;
  }
}

export default Book;
