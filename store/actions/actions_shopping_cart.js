import axios from "axios";
import { setSucc } from "./actions";
import Vars from "../../env";

const USER_URL = `${Vars.REACT_APP_API_URL}/api/users`;

export const SHOPPING_CART_ACTIONS = {
  FETCH: "SHOPPING_CART_FETCH",
  ADD: "SHOPPING_CART_ADD",
  UPDATE: "SHOPPING_CART_UPDATE",
  DELETE: "SHOPPING_CART_DELETE",
  CLEAR: "SHOPPING_CART_CLEAR",
};

export function fetchShoppingCart() {
  return async (dispatch, getState) => {
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/shopping_cart`;
    const response = await axios.get(url);
    dispatch({
      type: SHOPPING_CART_ACTIONS.FETCH,
      payload: response,
    });
  };
}

export function clearShoppingCart() {
  return {
    type: SHOPPING_CART_ACTIONS.CLEAR,
  };
}

export function updateShoppingCart(book) {
  return (dispatch, getState) => {
    const orderItemIndex = getState().shopping_cart.orderItems.findIndex(
      (orderItem) => orderItem.book.id === book.id
    );

    if (orderItemIndex === -1) {
      dispatch(addItemToShoppingCart(book, 1));
    } else {
      const item = getState().shopping_cart.orderItems[orderItemIndex];
      let quantity = item.quantity;
      quantity++;
      dispatch(updateOrderItemInShoppingCart(item.id, book, quantity));
    }
  };
}

function updateOrderItemInShoppingCart(orderItemId, book, quantity) {
  return async (dispatch, getState) => {
    const orderItem = {
      book: book._links.self.href,
      quantity,
    };
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items/${orderItemId}`;

    const response = await axios.patch(url, JSON.stringify(orderItem));
    dispatch(
      setSucc({
        type: SHOPPING_CART_ACTIONS.UPDATE,
        payload: response,
      })
    );
  };
}

function addItemToShoppingCart(book, quantity) {
  return async (dispatch, getState) => {
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const orderItem = {
      book: book._links.self.href,
      quantity,
    };
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items`;
    const response = await axios.post(url, JSON.stringify(orderItem));
    dispatch(
      setSucc({
        type: SHOPPING_CART_ACTIONS.ADD,
        payload: response,
      })
    );
  };
}

export function deleteItemFromShoppingCart(orderItemId) {
  return async (dispatch, getState) => {
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items/${orderItemId}`;

    await axios.delete(url);

    dispatch(
      setSucc({
        type: SHOPPING_CART_ACTIONS.DELETE,
        orderItemId: orderItemId,
      })
    );
  };
}
