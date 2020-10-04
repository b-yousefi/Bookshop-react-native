import axios from "axios";
import { setError, setSucc } from "./actions";
// import {clearShoppingCart} from './actions_shopping_cart';
import Vars from "../../env";

const USER_URL = `${Vars.REACT_APP_API_URL}/api/users`;

export const USER_ACTIONS = {
  FETCH: "USER_FETCH",
  UPDATE: "USER_UPDATE",
  DELETE: "USER_DELETE",
  REGISTER: "USER_REGISTER",
  LOGIN: "USER_LOGIN",
  LOGOUT: "USER_LOGOUT",
};

export function fetchUser(username) {
  const url = `${USER_URL}/search/findUser?username=${username}`;
  const request = axios.get(url);

  return {
    type: USER_ACTIONS.FETCH,
    payload: request,
  };
}

export function loginUser(username, password) {
  const url = `${Vars.REACT_APP_API_URL}/authenticate`;
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url,
        data: JSON.stringify({ username, password }),
      });
      const token = `Token ${response.data.token}`;
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(fetchUser(username));
      dispatch({
        type: USER_ACTIONS.LOGIN,
        payload: { username, token },
      });
    } catch (err) {
      throw err;
    }
  };
}

export function logoutUser() {
  delete axios.defaults.headers.common["Authorization"];
  return (dispatch) => {
    dispatch({
      type: USER_ACTIONS.LOGOUT,
      payload: "",
    });
    // dispatch(clearShoppingCart());
  };
}

export function regsiterUser(user) {
  const url = `${Vars.REACT_APP_API_URL}/register`;
  console.log(user);
  return async (dispatch) => {
    try {
      const response = await axios.post(url, JSON.stringify(user));
      dispatch(
        setSucc({
          type: USER_ACTIONS.REGISTER,
          payload: response.data,
        })
      );
      dispatch(loginUser({ username: user.username, password: user.password }));
    } catch (err) {
      throw err;
    }
  };
}

export function updateUser(user) {
  const url = user.link;
  return (dispatch) => {
    axios
      .patch(url, JSON.stringify(user))
      .then((response) => {
        dispatch(
          setSucc({
            type: USER_ACTIONS.UPDATE,
            payload: response.data,
          })
        );
      })
      .catch((error) => {
        dispatch(setError(error.response, USER_ACTIONS.UPDATE));
      });
  };
}
