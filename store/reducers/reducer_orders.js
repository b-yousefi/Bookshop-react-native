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
        const orders = action.payload.data._embedded.orders;
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
      const id = Number(order._links.self.href.split("/").reverse()[0]);
      return { ...state, [id]: createOrderObj(order) };
    default:
      return state;
  }
}

function createOrderObj(order) {
  const orderItems = [];
  if (order.items !== undefined) {
    for (const orderItem of order.items) {
      orderItems.push(
        new OrderItem(orderItem.id, orderItem.book, orderItem.quantity)
      );
    }
  }

  return new Order(
    order.id,
    order.totalPrice,
    order.currentStatus.status,
    order.currentStatus.updatedAt,
    orderItems
  );
}
