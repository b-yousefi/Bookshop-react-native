import { USER_ACTIONS } from "../actions/actions_user";

const INITIAL_STATE = {
  isLoggedIn: false,
};

export function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_ACTIONS.FETCH:
      delete action.payload.data.password;
      return { ...state, ...action.payload.data };
    case USER_ACTIONS.LOGIN:
      if (!action.error && action.payload !== "")
        return { ...action.payload, isLoggedIn: true };
      else return state;
    case USER_ACTIONS.LOGOUT:
      return { isLoggedIn: false };
    case USER_ACTIONS.REGISTER:
      delete action.payload.password;
      return { ...action.payload, isLoggedIn: false };
    case USER_ACTIONS.UPDATE:
      delete action.payload.password;
      return { ...action.payload, isLoggedIn: state.isLoggedIn };
    default:
      return state;
  }
}
