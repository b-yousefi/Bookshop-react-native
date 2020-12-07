import axios from "axios";
import { setSucc } from "./actions";

const USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;

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

export function updateShoppingCart(book, quantity) {
  return (dispatch, getState) => {
    let orderItemId = null;
    if (getState().shopping_cart.booksMap.has(book.id)) {
      orderItemId = getState().shopping_cart.booksMap.get(book.id).orderItemId;
    }
    if (quantity === 0) {
      dispatch(deleteItemFromShoppingCart(orderItemId, book.id));
    } else if (orderItemId) {
      dispatch(updateOrderItemInShoppingCart(orderItemId, book, quantity));
    } else {
      dispatch(addItemToShoppingCart(book, quantity));
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

function deleteItemFromShoppingCart(orderItemId, orderItemBookId) {
  return async (dispatch, getState) => {
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items/${orderItemId}`;

    await axios.delete(url);

    dispatch(
      setSucc({
        type: SHOPPING_CART_ACTIONS.DELETE,
        orderItemId: orderItemId,
        orderItemBookId: orderItemBookId,
      })
    );
  };
}
