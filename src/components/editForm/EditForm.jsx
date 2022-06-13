import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
// import { CssTextField, RHookTextFeildContainer } from "../customcomponent/CustomTextField";
import { CustomTextField } from "../customcomponent/customTextField";
import { formModel } from "./initialState";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../redux/form/form.action";
import { CustomButton } from "../customcomponent/CustomButton";
import "./editForm.css";
import { CustomSelectBox } from "../customcomponent/customSelectBox";
import { nationalityList } from "../customcomponent/nationalityList";
import { positionList } from "../customcomponent/positionList";

function EditForm({ openForm, handleFormClose }) {
  const dispatch = useDispatch();

  //extracting form model(initialState) from initialState.js file h
  const {
    formField: {
      PlayerName,
      JerseyNumber,
      Position,
      Height,
      Weight,

      Nationality,
    },
  } = formModel;

  //extracting data available in redux store
  const reduxStoredData = useSelector(
    (state) => state.editPlayerForm?.mainForm?.mainValues
  );

  //state to set form data along with initial state
  const [formData, setFormData] = useState({
    PlayerName: "",
    JerseyNumber: "",
    Height: "",
    Weight: "",
    Nationality: "",
    Position: "",
  });

  // use effect is used to fetch data from redux store
  // and it is depends on that same data as i had passed in the dependency array

  React.useEffect(() => {
    setFormData(reduxStoredData);
  }, [reduxStoredData]);

  //function to handle whenever any changes made in inputField
  const handleFormChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // function to add edited data to the table starts here
  const handleAddForm = () => {
    const newData = {
      PlayerName: formData?.PlayerName,
      JerseyNumber: formData?.JerseyNumber,
      Height: formData?.Height,
      Weight: formData?.Weight,
      Nationality: formData?.Nationality,
      Position: formData?.Position,
    };
    setFormData(newData);
    dispatch(updateFormData(formData));
    handleFormClose();
  };
  // function to submit edited data to the table ends here
  return (
    <>
      <Modal open={openForm} onClose={handleFormClose}>
        <Paper className="mainPaper" elevation={3}>
          <div className="mainDivContainer">
            <Typography>Edit Player</Typography>
            <span onClick={handleFormClose}>
              <CancelIcon />
            </span>
          </div>

          <Grid className="gridContainer" container spacing={1}>
            <Grid item xs={6}>
              <label>Player Name</label>
            </Grid>
            <Grid item xs={6}>
              <label>Jersey Number</label>
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                name={PlayerName.name}
                label={PlayerName.label}
                value={formData.PlayerName}
                onChange={handleFormChange}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextField
                name={JerseyNumber.name}
                label={JerseyNumber.label}
                value={formData.JerseyNumber}
                disabled //here i had disabled it because editing of jersey number will create bug as I am considering it as unique number
                //instead of installing UUID as a id, i am taking it as a id as it is unique in our database(.csv file)
              />
            </Grid>

            <Grid item xs={6}>
              <label>Height</label>
            </Grid>
            <Grid item xs={6}>
              <label>Weight</label>
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                name={Height.name}
                label={Height.label}
                value={formData.Height}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                name={Weight.name}
                label={Weight.label}
                value={formData.Weight}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Nationality</label>
            </Grid>

            <Grid item xs={12}>
              <CustomSelectBox
                name={Nationality.name}
                value={formData.Nationality}
                sx={{ color: "white" }}
                onChange={handleFormChange}
                fullWidth
                displayEmpty
              >
                {nationalityList.map((item) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </CustomSelectBox>
            </Grid>

            <Grid item xs={12}>
              <label>Position</label>
            </Grid>

            <Grid item xs={12}>
              <CustomSelectBox
                name={Position.name}
                value={formData.Position}
                sx={{ color: "white" }}
                onChange={handleFormChange}
                fullWidth
                displayEmpty
              >
                {positionList.map((item) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </CustomSelectBox>
            </Grid>
            <Grid item xs={12}>
              <Typography>Starter</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="Starter"
                  onChange={handleFormChange}
                  value={formData.Starter}
                  // defaultValue="Yes"
                >
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <div className="btnDiv">
            <CustomButton onClick={handleAddForm} variant="contained">
              Edit Player
            </CustomButton>
          </div>
        </Paper>
      </Modal>
    </>
  );
}

export default EditForm;
