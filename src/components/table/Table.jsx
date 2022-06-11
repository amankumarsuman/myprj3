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

import * as XLSX from "xlsx/xlsx.mjs";
// import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addTableData,
  FormRender,
  formSelectedToEdit,
  openFormForNewRecord,
} from "../redux/form/form.action";
import {
  alertDialog,
  alertDialogClose,
} from "../redux/alertDialog/alertDialog.action";
import ImporterDialogue from "../dialogueBox/importerDialogue/importerDialogue";
import { TablePagination } from "@mui/material";

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
  // const [tableData,setTableData]=React.useState(data)
  // const { uniqueId } = useParams();
  const uniqueId = "form";
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
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
  console.log(reduxStoredData);
  // const convertDataToJsonData = (header, data) => {
  //   const rows = [];
  //   //here first for each loop will give me row
  //   // and second foreach loop will give me data
  //   data.forEach((row) => {
  //     const rowData = {};
  //     row.forEach((el, i) => {
  //       rowData[header[i]] = el;
  //     });
  //     var fileDatas = JSON.parse(
  //       JSON.stringify(rowData).replace(/\s(?=\w+":)/g, "")
  //     );
  //     rows.push(fileDatas);
  //   });
  //   return rows;
  // };

  // const importExcelData = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const binaryString = event.target.result;
  //     const allData = XLSX.read(binaryString, { type: "binary" });

  //     //get first sheet from csv file
  //     const sheetName = allData.SheetNames[0];
  //     const sheet = allData.Sheets[sheetName];
  //     // console.log(sheet.v.trim());
  //     //converting into array
  //     var fileData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //     // console.log(fileDatas);
  //     //Extracting headers data

  //     const headers = fileData[0];

  //     const head = headers.map((head) => ({
  //       title: head.split(" ").join("_"),
  //       field: head.split(" ").join("_"),
  //     }));
  //     setColumn(head);
  //     console.log(headers);
  //     // deleting header so that in our data array only data should remain
  //     //  so that I can use them in table

  //     fileData.splice(0, 1);
  //     var convertedData = convertDataToJsonData(headers, fileData);
  //     setData(convertedData);
  //     dispatch(addTableData(convertedData));
  //   };

  //   reader.readAsBinaryString(file);
  // };

  const handleEditRecord = (item = {}) => {
    // setOpen(true);
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
  };
  // const reduxStoredData = useSelector(
  //   (state) => state.editPlayerForm?.mainTable?.data
  // );
  // console.log("first", reduxStoredData);

  //********** Dispatching action to alert user and taking confirmation about the deletion of any entry.
  const dialogConfirmation = (row) => {
    alert(row.JerseyNumber);
    const payload = {
      alertType: "danger",
      alertTitle: "Delete Confirmation",
      alertMessage: "You can not Undo The Action",
      onAgree: () => handleDeleteOfTable(row),
      onDisagree: () => handleDisagree(),
    };
    // dispatch(alertDialog(payload));
  };

  //*******************Delete request to the backend
  const handleDeleteOfTable = async (item) => {
    // await dispatch(
    //   deleteTableRow({
    //     deleteItem: item?.JerseyNumber,
    //   })
    // );

    setData((prev) => {
      return prev.filter((el) => el.JerseyNumber != item.JerseyNumber);
    });
    dispatch(alertDialogClose());
  };

  //*********************** Disagree To Delete the Record.
  const handleDisagree = () => {
    dispatch(alertDialogClose());
  };
  return (
    <>
      {/* <ImporterDialogue onChange={importExcelData} />
      <input type="file" onChange={importExcelData} /> */}
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
                            {/* {edit.JerseyNumber === row.JerseyNumber ? ( */}
                            <EditIcon
                              className="icon"
                              onClick={() => handleEditRecord(row)}
                            />
                            {/* ) : ( */}
                            {/* <SaveIcon /> */}
                            {/* )} */}

                            <DeleteIcon
                              onClick={() => handleDeleteOfTable(row)}
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
    </>
  );
}
