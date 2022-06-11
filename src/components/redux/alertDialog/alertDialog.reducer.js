import { ALERT_DIALOG_TYPES } from "./alertDialog.types";

const initState = {
  isOpen: false,
  isLoading: false,
  alertType: "",
  alertTitle: "",
  alertMessage: "",
  displayError: false,
  onAgree: () => {},
  onDisagree: () => {},
};

export const alertDialogReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALERT_DIALOG_TYPES.ALERT_DIALOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ALERT_DIALOG_TYPES.ALERT_DIALOG_SUCCESS: {
      return {
        ...state,
        isOpen: true,
        isLoading: false,
        alertType: payload.alertType,
        alertTitle: payload.alertTitle,
        alertMessage: payload.alertMessage,
        displayError: payload.displayError,
        onAgree: payload.onAgree,
        onDisagree: payload.onDisagree,
      };
    }
    case ALERT_DIALOG_TYPES.ALERT_DIALOG_CLOSE: {
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
