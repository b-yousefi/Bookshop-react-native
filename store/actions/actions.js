export const COMMON = {
  SET_NOTIF: "SET_NOTIF",
  CLEAR_NOTIF: "CLEAR_NOTIF",
  ERROR: "error",
  SUCCESS: "success",
};

export function clearNotif() {
  return {
    type: COMMON.CLEAR_NOTIF,
  };
}

export function setSucc(action, msg = "Successfull") {
  return {
    ...action,
    notif: {
      message: msg,
      cause: action.type,
      severity: COMMON.SUCCESS,
    },
  };
}

export function setError(response, cause = null) {
  return (dispatch) => {
    dispatch({
      type: COMMON.SET_NOTIF,
      notif: {
        message: "Error occurred while communicating with server",
        severity: COMMON.ERROR,
      },
    });
  };
}
