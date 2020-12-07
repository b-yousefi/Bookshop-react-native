import OrderItem from "../../models/OrderItem";
import { SHOPPING_CART_ACTIONS } from "../actions/actions_shopping_cart";

function computeTotalPrice(orderItems) {
  let totalPrice = 0;
  orderItems.forEach((orderItem, key) => {
    totalPrice += orderItem.quantity * parseFloat(orderItem.book.price);
  });
  return totalPrice.toFixed(2);
}

export function ShoppingCartReducer(state = null, action) {
  switch (action.type) {
    case SHOPPING_CART_ACTIONS.FETCH:
      const shopping_cart = action.payload.data;

      const orderItemsArr = [];
      for (const orderItem of shopping_cart.orderItems) {
        const id = orderItem._links.self.href.split("/").reverse()[0];
        orderItemsArr.push(
          new OrderItem(id, orderItem.book, orderItem.quantity)
        );
      }

      return { ...action.payload.data, orderItems: orderItemsArr };
    case SHOPPING_CART_ACTIONS.ADD:
    case SHOPPING_CART_ACTIONS.UPDATE: {
      const { data } = action.payload;
      let id = data.id;
      const uOrderItems = [...state.orderItems];
      const orderItemIndex = state.orderItems.findIndex(
        (orderItem) => orderItem.id === id
      );
      if (orderItemIndex === -1) {
        updatedOrderItems.push(data);
      } else {
        updatedOrderItems[orderItemIndex] = data;
      }

      const totalPrice = computeTotalPrice(uOrderItems);
      return {
        ...state,
        orderItems: uOrderItems,
        totalPrice,
      };
    }
    case SHOPPING_CART_ACTIONS.DELETE: {
      const deletedOrderItemId = action.orderItemId;
      const uOrderItems = [...state.orderItems];
      const orderItemIndex = state.orderItems.findIndex(
        (orderItem) => orderItem.id === deletedOrderItemId
      );
      uOrderItems.splice(orderItemIndex);
      const totalPrice = computeTotalPrice(uOrderItems);
      return {
        ...state,
        orderItems: uOrderItems,
        totalPrice,
      };
    }
    default:
      return state;
  }
}
