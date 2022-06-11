import { SNACKBAR_NOTIFICATION_TYPES } from "./snackbarNotification.types";

const initState = {
  isOpen: false,
  isLoading: false,
  notificationType: "",
  notificationMessage: "",
};

export const snackbarNotificationReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isOpen: true,
        isLoading: false,
        notificationType: payload.notificationType,
        notificationMessage: payload.notificationMessage,
      };
    }
    case SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_CLOSE: {
      return {
        ...state,
        ...initState,
      };
    }
    default: {
      return state;
    }
  }
};
