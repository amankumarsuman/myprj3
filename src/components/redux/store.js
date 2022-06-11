import { combineReducers, applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { alertDialogReducer } from "./alertDialog/alertDialog.reducer";
import { editPlayerFormReducer } from "./form/form.reducer";
import { snackbarNotificationReducer } from "./snackbarNotification/snackbarNotification.reducer";

const rootReducer = combineReducers({
  alertDialog: alertDialogReducer,
  snackbarNotification: snackbarNotificationReducer,
  editPlayerForm: editPlayerFormReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
