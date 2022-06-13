import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableColumn } from "./tableColumn";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
// import Typography from '@mui/material/Typography';
import * as XLSX from "xlsx/xlsx.mjs";
// import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addTableData,
  deleteTableRow,
  FormRender,
  formSelectedToEdit,
  openFormForNewRecord,
} from "../redux/form/form.action";
import {
  alertDialog,
  alertDialogClose,
} from "../redux/alertDialog/alertDialog.action";

import { Modal, TablePagination, Typography, Box, Button } from "@mui/material";
import EditForm from "../editForm/EditForm";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomButton } from "../customcomponent/CustomButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#2D2D2D",
  border: "2px solid #000",

  boxShadow: 24,
  p: 4,
  color: "#F8F8F8",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#494949",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledActionTableCell = styled(TableCell)({
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  alignItems: "center",
  width: "30%",
  marginLeft: "5%",
  // justifyContent: "space-between",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ setOpen, inputChange }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);
  const handleFormOpen = () => setOpenForm(true);
  const handleFormClose = () => setOpenForm(false);
  // const [tableData,setTableData]=React.useState(data)
  // const { uniqueId } = useParams();
  const uniqueId = "form";
  const dispatch = useDispatch();
  const [column, setColumn] = React.useState();

  const reduxStoredData = useSelector(
    (state) => state.editPlayerForm?.mainTable?.data
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditRecord = (item = {}) => {
    const payload = {
      uniqueId,
      data: item,
    };

    //If want to add new data to backend update the Redux store that
    //Mapping form is open for new Data
    if (Object.values(item).length === 0) {
      dispatch(
        openFormForNewRecord({
          uniqueId: uniqueId,
        })
      );
    }
    dispatch(formSelectedToEdit(payload));
    dispatch(FormRender(payload));
    setOpenForm(true);
  };

  const [modelOpen, setModelOpen] = React.useState(false);
  const [deletedItem, setDeletedItem] = React.useState();
  const [editModelOpen, setEditModelOpen] = React.useState(false);

  const handleEditModel = () => {
    setEditModelOpen(!editModelOpen);
  };
  //********** Dispatching action to alert user and taking confirmation about the deletion of any entry.
  const dialogConfirmation = (row) => {
    setModelOpen(true);
    setDeletedItem(row);
  };

  //*******************Delete request to the backend
  const handleDeleteOfTable = async (item) => {
    // await
    dispatch(deleteTableRow({ deleteItem: item?.JerseyNumber }));

    dispatch(alertDialogClose());
    setModelOpen(false);
  };

  //*********************** Disagree To Delete the Record.
  const handleDisagree = () => {
    dispatch(alertDialogClose());
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {TableColumn.map((item) => (
                <React.Fragment key={item.id}>
                  <StyledTableCell key={item.id}>{item.label}</StyledTableCell>
                </React.Fragment>
              ))}
              <StyledTableCell style={{ textAlign: "center" }}>
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <React.Fragment>
              {isLoading && reduxStoredData?.length == 0 ? (
                <React.Fragment>
                  {/* <LoadingContainer
                              className={classes.loadingContainer}
                            >
                              <ProgressWithLabel />
                            </LoadingContainer> */}
                </React.Fragment>
              ) : reduxStoredData?.length >= 1 ? (
                reduxStoredData
                  ?.filter(
                    //here filter is used to filter data from table to get searched data
                    (el) =>
                      !inputChange.length ||
                      el.PlayerName.toString() //i am filtering data by player name
                        .toLowerCase()
                        .includes(inputChange.toString().toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // slice is used for pagination
                  .map((row) => {
                    return (
                      <React.Fragment key={row.JerseyNumber}>
                        <StyledTableRow
                          hover
                          tabIndex={-1}
                          key={row.JerseyNumber}
                        >
                          <TableCell>
                            <img width="18px" src={row.FlagImage} alt="flag" />
                            {row.PlayerName}
                          </TableCell>
                          <TableCell>{row.JerseyNumber}</TableCell>
                          <TableCell>{row.Starter}</TableCell>
                          <TableCell>{row.Position}</TableCell>
                          <TableCell>{row.Height}</TableCell>
                          <TableCell>{row.Weight}</TableCell>
                          <TableCell>{row.Nationality}</TableCell>
                          <TableCell>{row.Appearances}</TableCell>
                          <TableCell>{row.MinutesPlayed}</TableCell>

                          <StyledActionTableCell>
                            <EditIcon
                              className="icon"
                              onClick={() => handleEditRecord(row)}
                            />

                            <DeleteIcon
                              onClick={() => dialogConfirmation(row)}
                              className="icon"
                            />
                          </StyledActionTableCell>
                        </StyledTableRow>
                      </React.Fragment>
                    );
                  })
              ) : (
                <React.Fragment>
                  <StyledTableRow
                    hover
                    tabIndex={-1}
                    style={{ border: "1px solid red" }}
                  >
                    <TableCell></TableCell>

                    <TableCell></TableCell>
                    <TableCell></TableCell>

                    <TableCell></TableCell>
                  </StyledTableRow>
                </React.Fragment>
              )}
            </React.Fragment>
          </TableBody>
        </Table>
        <EditForm
          openForm={openForm}
          setOpenForm={setOpenForm}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
        />

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={reduxStoredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal
        open={modelOpen}
        onClose={() => setModelOpen(!modelOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Are You Sure
            </Typography>
            <ClearIcon
              onClick={() => setModelOpen(!modelOpen)}
              sx={{ color: "#CBCBCB" }}
            />
          </span>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: "#CBCBCB" }}
          >
            This action cannot be undone.
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "180px",
              float: "right",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={() => setModelOpen(!modelOpen)}
              sx={{
                color: "#CBCBCB",
                border: "1px solid #CBCBCB",
                borderRadius: "10px",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <CustomButton
              sx={{ borderRadius: "10px", backgroundColor: "#D23131" }}
              onClick={() => handleDeleteOfTable(deletedItem)}
            >
              Delete
            </CustomButton>
          </div>
        </Box>
      </Modal>
    </>
  );
}
