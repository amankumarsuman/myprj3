let formModel = {
  formId: "formModel",

  formField: {
    PlayerName: {
      name: "PlayerName",
      label: "Player Name",
    },
    JerseyNumber: {
      name: "JerseyNumber",
      label: "Jersey Number",
    },
    Position: {
      name: "Position",
      label: "Position",
    },
    Height: {
      name: "Height",
      label: "Height",
    },
    Weight: {
      name: "Weight",
      label: "Weight",
    },
    Nationality: {
      name: "Nationality",
      label: "Nationality",
    },
  },
};

const { formField } = formModel;

let initialState = {
  [formField.PlayerName.name]: " ",
  [formField.JerseyNumber.name]: " ",
  [formField.Position.name]: " ",
  [formField.Height.name]: " ",
  [formField.Weight.name]: " ",
  [formField.Nationality.name]: " ",
};

export { initialState, formModel };
