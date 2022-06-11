import { SNACKBAR_NOTIFICATION_TYPES } from "./snackbarNotification.types";

//*****************Snackbar Notification Action Creators in Redux Store*****************//
const snackbarNotificationRequest = () => {
  return {
    type: SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_REQUEST,
  };
};
const snackbarNotificationSuccess = (payload) => {
  return {
    type: SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_SUCCESS,
    payload: payload,
  };
};
export const snackbarNotificationClose = () => {
  return {
    type: SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_CLOSE,
  };
};
export const snackbarNotification = (payload) => (dispatch) => {
  dispatch(snackbarNotificationRequest());
  dispatch(snackbarNotificationSuccess(payload));
};
