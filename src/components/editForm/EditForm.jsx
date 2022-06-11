import {
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { RHookTextFeildContainer } from "../customcomponent/CustomTextField";
import { useForm } from "react-hook-form";
import RadioButtons from "../customcomponent/RadioButton";
import { formModel } from "./initialState";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RHookForm } from "../customcomponent/RHookForm";
import { debounce } from "lodash";
import { updateForm } from "../redux/form/form.action";
import { CustomButton } from "../customcomponent/CustomButton";
import "./editForm.css";
const performingLabList = [
  {
    value: "0",
    label: "Lab1",
  },
  {
    value: "1",
    label: "Lab2",
  },
  {
    value: "2",
    label: "Lab3",
  },
  {
    value: "3",
    label: "Lab4",
  },
];

function EditForm() {
  const [edit, setEdit] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

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

  const uniqueId = "form";
  // const [tableData, setTableData] = useState(data);

  const reduxStoredData = useSelector(
    (state) => state.editPlayerForm?.mainForm?.dataSelectedToEdit
  );
  const changedFlag = useSelector(
    (state) => state.editPlayerForm.mainForm.changedValue
  );

  const [formData, setFormData] = useState({
    PlayerName: "",
    JerseyNumber: "",
    Height: "",
    Weight: "",
    Nationality: "",
    Position: "",
  });

  // const handleFormChange = (e) => {
  //   e.preventDefault();
  //   const fieldname = e.target.getAttribute("name");
  //   const fieldValue = e.target.value;
  //   const newFormData = { ...formData };
  //   newFormData[fieldname] = fieldValue;
  //   setFormData(newFormData);
  // };
  // const handleAddForm = (e) => {
  //   e.preventDefault();

  //   const newData = {
  //     id: uuidv4(),
  //     PlayerName: formData?.PlayerName,
  //     JerseyNumber: formData?.JerseyNumber,
  //     Height: formData?.Height,
  //     Weight: formData?.Weight,
  //     Nationality: formData?.Nationality,
  //     Position: formData?.Position,
  //   };
  // };
  const reduxUpdateFunction = React.useCallback(
    debounce((values) => {
      return dispatch(updateForm({ uniqueId: uniqueId, data: values }));
    }, 1000),
    [dispatch, uniqueId]
  );
  const methods = useForm({
    defaultValues: reduxStoredData,
    reValidateMode: "onChange",
    mode: "onChange",
    // resolver: yupResolver(validation),
  });

  return (
    <>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
      <Paper className="mainPaper" elevation={3}>
        <div className="mainDivContainer">
          <Typography>Edit Player</Typography>
          <CancelIcon />
        </div>
        <RHookForm
          reduxUpdateFunction={reduxUpdateFunction}
          uniqueId={uniqueId}
        >
          <Grid className="gridContainer" container spacing={2}>
            <Grid item xs={6}>
              <label>Player Name</label>
            </Grid>
            <Grid item xs={6}>
              <label>Jersey Number</label>
            </Grid>
            <Grid item xs={6}>
              <RHookTextFeildContainer
                type="text"
                name={PlayerName.name}
                label={PlayerName.label}
                method={methods}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <RHookTextFeildContainer
                type="text"
                name={JerseyNumber.name}
                label={JerseyNumber.label}
                method={methods}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <label>Height</label>
            </Grid>
            <Grid item xs={6}>
              <label>Weight</label>
            </Grid>
            <Grid item xs={6}>
              <RHookTextFeildContainer
                type="text"
                name={Height.name}
                label={Height.label}
                method={methods}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <RHookTextFeildContainer
                type="text"
                name={Weight.name}
                label={Weight.label}
                method={methods}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <label>Nationality</label>
            </Grid>

            <Grid item xs={12}>
              <RHookTextFeildContainer
                type="select1"
                name={Nationality.name}
                label={Nationality.label}
                method={methods}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <label>Position</label>
            </Grid>

            <Grid item xs={12}>
              <RHookTextFeildContainer
                type="select1"
                method={methods}
                name={Position.name}
                reduxUpdateFunction={reduxUpdateFunction}
                label={Position.label}
                uniqueId={uniqueId}
                options={performingLabList}
                // disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Starter</Typography>
            </Grid>

            <Grid item xs={2}>
              <RadioButtons name="n" label="No" value="y" />
            </Grid>
            <Grid item xs={2}>
              <Typography></Typography>

              <RadioButtons name="y" label="Yes" />
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </RHookForm>
        <div className="btnDiv">
          <CustomButton variant="contained">Edit Player</CustomButton>
        </div>
      </Paper>
      {/* </Modal> */}
    </>
  );
}

export default EditForm;
