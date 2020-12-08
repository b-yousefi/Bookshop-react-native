import { ORDER_ACTIONS } from "../actions/actions_order";
import OrderItem from "../../models/OrderItem";
import Order from "../../models/Order";

export function OrdersReducer(state = null, action) {
  switch (action.type) {
    case ORDER_ACTIONS.FETCH_ALL:
      if (
        action.payload.data._embedded &&
        action.payload.data._embedded.orders
      ) {
        const orders = action.payload.data._embedded.orders.filter(
          (ord) => ord.currentStatus.status !== "OPEN"
        );
        const loadedData = [];
        for (const order of orders) {
          const orderObj = createOrderObj(order);
          loadedData.push(orderObj);
        }
        return loadedData;
      } else {
        return null;
      }
    case ORDER_ACTIONS.FETCH:
      const order = action.payload.data;
      const id = order._links.self.href.split("/").reverse()[0];
      const currentOrders = [...state];
      const orderIndex = currentOrders.findIndex((ord) => ord.id === id);
      currentOrders[orderIndex] = createOrderObj(order);
      return currentOrders;
    default:
      return state;
  }
}

function createOrderObj(order) {
  const orderItems = [];
  if (order.orderItems !== undefined) {
    for (const orderItem of order.orderItems) {
      orderItems.push(
        new OrderItem(
          orderItem.id.toString(),
          orderItem.book,
          orderItem.quantity
        )
      );
    }
  }

  return new Order(
    order.id.toString(),
    order.totalPrice,
    order.currentStatus.status,
    order.currentStatus.updatedAt,
    orderItems,
    order._links
  );
}
