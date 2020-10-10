import axios from "axios";
import { setError, setSucc } from "./actions";
import Vars from "../../env";

const ORDER_URL = `${Vars.REACT_APP_API_URL}/api/orders`;

export const ORDER_ACTIONS = {
  FETCH_ALL: "ORDER_FETCH_ALL",
  UPDATE: "ORDER_UPDATE",
  DELETE: "ORDER_DELETE",
  CREATE: "ORDER_CREATE",
  CLOSE: "ORDER_CLOSE",
  FETCH: "ORDER_FETCH",
};

const PAGE_SIZE = 6;

export function completeOrder(address) {
  return async (dispatch, getState) => {
    const user = getState().user;
    const addressLink = address._links.self.href;
    const changedOrder = {
      id: getState().shopping_cart.id,
      address: addressLink,
      user: user._links.self.href,
    };
    const url = `${ORDER_URL}/close_shopping_cart`;
    try {
      const response = await axios({
        method: "POST",
        url,
        data: JSON.stringify(changedOrder),
      });

      dispatch(
        setSucc({
          type: ORDER_ACTIONS.CLOSE,
          payload: response,
        })
      );
      dispatch(fetchOrders());
    } catch (err) {
      dispatch(setError(error.response, ORDER_ACTIONS.CLOSE));
      throw err;
    }
  };
}

export function fetchOrders(page = 1) {
  return async (dispatch) => {
    const url = `${ORDER_URL}?page=${page - 1}&size=${PAGE_SIZE}&sort=id,desc`;
    try {
      const response = await axios.get(url);
      dispatch({
        type: ORDER_ACTIONS.FETCH_ALL,
        payload: response,
      });
    } catch (err) {
      dispatch(setError(error.response, ORDER_ACTIONS.FETCH_ALL));
      throw err;
    }
  };
}

export function fetchOrderDetail(order) {
  return async (dispatch) => {
    try {
      const response = await axios.get(order._links.self.href);

      dispatch({
        type: ORDER_ACTIONS.FETCH,
        payload: response,
      });
    } catch (err) {
      dispatch(setError(error.response, ORDER_ACTIONS.FETCH));
      throw err;
    }
  };
}
