import React from "react";
import { useSelector } from "react-redux";
import RoasterDetails from "../roasterDetails/RoasterDetails";
import CustomizedTables from "../table/Table";
import EditForm from "./EditForm";
// import { useParams } from "react-router";

export const EditFormRenderPage = () => {
  const [edit, setEdit] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   const { uniqueId } = useParams();
  const uniqueId = "form";

  const isEditing = useSelector(
    (state) => state.editPlayerForm?.mainForm.isEditing
  );

  return <>{isEditing ? <EditForm /> : <RoasterDetails />}</>;
};
