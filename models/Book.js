import moment from "moment";

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
    this.id = id.toString();
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

  get readablePublishedDay() {
    return this.publishedDay
      ? moment(this.publishedDay).format("MMMM Do YYYY")
      : undefined;
  }
}

export default Book;
