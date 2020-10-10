import moment from "moment";

class Order {
  constructor(id, totalPrice, status, updatedAt, items) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.status = status;
    this.updatedAt = updatedAt;
    this.items = items;
  }

  get readableUpdatedAt() {
    return this.updatedAt
      ? moment(this.updatedAt).format("MMMM Do YYYY")
      : undefined;
  }
}

export default Order;
