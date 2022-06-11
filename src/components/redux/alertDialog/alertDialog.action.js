import { ALERT_DIALOG_TYPES } from "./alertDialog.types";

//*****************Alert Dialog Action Creators in Redux Store*****************//
const alertDialogRequest = () => {
  return {
    type: ALERT_DIALOG_TYPES.ALERT_DIALOG_REQUEST,
  };
};
const alertDialogSuccess = (payload) => {
  return {
    type: ALERT_DIALOG_TYPES.ALERT_DIALOG_SUCCESS,
    payload: payload,
  };
};
export const alertDialogClose = () => {
  return {
    type: ALERT_DIALOG_TYPES.ALERT_DIALOG_CLOSE,
  };
};
export const alertDialog = (payload) => (dispatch) => {
  dispatch(alertDialogRequest());
  dispatch(alertDialogSuccess(payload));
};
