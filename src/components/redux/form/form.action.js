import { FORM_TYPES } from "./form.types";
export const openFormForNewRecord = (payload) => {
  return {
    type: FORM_TYPES.OPEN_FORM_FOR_NEW_DATA,
    payload: payload,
  };
};
export const formSelectedToEdit = (payload) => {
  console.log(payload);
  return {
    type: FORM_TYPES.FORM_SELECTED_TO_EDIT,
    payload: payload,
  };
};
export const FormRender = (payload) => {
  return {
    type: FORM_TYPES.FORM_TO_RENDER,
    payload: payload,
  };
};
export const updateForm = (data) => {
  return {
    type: FORM_TYPES.UPDATE_DATA_OF_FORM,
    payload: data,
  };
};
export const addTableData = (data) => {
  return {
    type: FORM_TYPES.ADD_TABLE_DATA,
    payload: data,
  };
};
export const editTableData = (data) => {
  return {
    type: FORM_TYPES.EDIT_TABLE_DATA,
    payload: data,
  };
};
