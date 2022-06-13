import produce from "immer";
import { initialState } from "../../editForm/initialState";
import { FORM_TYPES } from "./form.types";

const inititalState = {
  mainTable: {
    data: [],
    isLoading: false,
    isError: false,
    pageNumber: 0,
    pageSize: 10,
    totalCount: 0,
    currentPage: 0,
    errorMsg: "",
    search: {},
  },

  mainForm: {
    isNew: false,
    isTouched: false,
    isError: false,
    isLoading: false,
    tabValue: 1,
    isOpen: false,
    changedValues: {},
    dataSelectedToEdit: {},
    isEditing: false,
    mainValues: { ...initialState },
    teamPlayerDetails: {},
    errors: {},
  },
  //   eachForm: {
  //     0: {
  //       firstRender: true,

  //       changedValues: {},

  //       mainForm: {
  //         isNew: false,
  //         isTouched: false,
  //         isError: false,
  //         isLoading: false,
  //         tabValue: 1,
  //         isOpen: false,
  //         changedValues: {},
  //         dataSelectedToEdit: {},

  //         mainValues: { ...initialState },

  //         errors: {},
  //       },
  //       mainFormReducer: {
  //         data: [],
  //         changedValues: {},
  //         dataSelectedToEdit: {},
  //         isLoading: false,
  //         isError: false,
  //         isEditing: false,
  //         isNew: false,
  //       },
  //     },
  //   },
};
export const editPlayerFormReducer = (state = inititalState, action) =>
  produce(state, (draftState) => {
    const { type, payload } = action;
    switch (type) {
      case FORM_TYPES.OPEN_FORM_FOR_NEW_DATA: {
        let { uniqueId } = payload;

        draftState.mainForm.isNew = true;
        break;
      }
      case FORM_TYPES.FORM_SELECTED_TO_EDIT: {
        let { uniqueId, data } = payload;

        draftState.mainForm.dataSelectedToEdit = data;
        draftState.mainForm.mainValues = data;
        break;
      }
      case FORM_TYPES.FORM_TO_RENDER: {
        let { uniqueId } = payload;

        draftState.mainForm.isEditing = true;
        break;
      }
      case FORM_TYPES.UPDATE_DATA_OF_FORM: {
        let { uniqueId, data } = payload;
        let changedValues = Object.keys(data).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        );
        draftState.mainForm.mainValues = {
          ...draftState.mainForm.mainValues,
          ...data,
        };
        draftState.mainForm.changedValues = {
          ...draftState.mainForm.changedValues,
          ...changedValues,
        };
        break;
      }
      case FORM_TYPES.UPDATE_FORM_DATA: {
        let { uniqueId, data } = payload;
        console.log("reducer", payload);

        draftState.mainForm.dataSelectedToEdit = payload;
        draftState.mainTable.data = draftState.mainTable.data.map((el, i) => {
          if (el.JerseyNumber == payload.JerseyNumber) {
            return payload;
          }
          return el;
        });

        break;
      }
      case FORM_TYPES.ADD_TABLE_DATA: {
        let { uniqueId, data } = payload;

        draftState.mainTable.data = payload;
        break;
      }
      case FORM_TYPES.TEAM_PLAYER_DETAILS: {
        let { data } = payload;

        draftState.mainForm.teamPlayerDetails = payload;
        break;
      }
      case FORM_TYPES.DELETE_TABLE_DATA: {
        let { deleteItem } = payload;
        draftState.mainTable.data = draftState.mainTable.data.filter(
          (item) => item.JerseyNumber !== deleteItem
        );

        break;
      }
    }
  });
