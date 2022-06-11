import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Grid, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx/xlsx.mjs";

import "./importerStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { addTableData } from "../../redux/form/form.action";
import { CustomButton } from "../../customcomponent/CustomButton";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "#494949",
  border: "2px solid #000",
  boxShadow: 24,
  color: "white",
  borderRadius: "10px",
  p: 4,
};

export default function ImporterDialogue({ open, handleClose }) {
  // const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState();
  const [data, setData] = React.useState();
  const [column, setColumn] = React.useState();
  const dispatch = useDispatch();

  // const fileName = "";
  const inputFile = React.useRef(null);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // function onChangeFile(event) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   var file = event.target.files[0];
  //   console.log(file);
  //   setFileData({ file }); /// if you want to upload latter
  // }
  const onButtonClick = (e) => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    // const result = data.every(
    //   (el) =>
    //     el.JerseyNumber &&
    //     el.Starter &&
    //     el.PlayerName &&
    //     el.Position &&
    //     el.Height &&
    //     el.Weight &&
    //     el.Nationality &&
    //     el.Appearances &&
    //     el.MinutesPlayed
    // );
    // console.log(result);
  };
  // function handleChange(event) {
  //   setFileData(event.target.files[0].name);
  // }

  const convertDataToJsonData = (header, data) => {
    const rows = [];
    //here first for each loop will give me row
    // and second foreach loop will give me data
    data.forEach((row) => {
      const rowData = {};
      row.forEach((el, i) => {
        rowData[header[i]] = el;
      });
      var fileDatas = JSON.parse(
        JSON.stringify(rowData).replace(/\s(?=\w+":)/g, "")
      );
      rows.push(fileDatas);
    });
    return rows;
  };

  const importExcelData = (e) => {
    const file = e.target.files[0];
    setFileName(e.target.files[0].name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const allData = XLSX.read(binaryString, { type: "binary" });

      //get first sheet from csv file
      const sheetName = allData.SheetNames[0];
      const sheet = allData.Sheets[sheetName];
      // console.log(sheet.v.trim());
      //converting into array
      var fileData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // console.log(fileDatas);
      //Extracting headers data

      const headers = fileData[0];

      const head = headers.map((head) => ({
        title: head.split(" ").join("_"),
        field: head.split(" ").join("_"),
      }));
      setColumn(head);
      // deleting header so that in our data array only data should remain
      //  so that I can use them in table

      fileData.splice(0, 1);
      var convertedData = convertDataToJsonData(headers, fileData);
      setData(convertedData);
      dispatch(addTableData(convertedData));
    };

    reader.readAsBinaryString(file);
  };
  const reduxStoredData = useSelector(
    (state) => state.editPlayerForm?.mainTable?.data
  );
  var numberOfTotalPlayer = [];
  var numberOfGoalkeeper = [];
  var defenders = [];
  var modifielders = [];
  var forwards = [];
  reduxStoredData.map((el) => {
    numberOfTotalPlayer.push(el.PlayerName);

    numberOfGoalkeeper.push(el.Position === "Goalkeeper");
    defenders.push(el.Position === "Defender");
    modifielders.push(el.Position === "Midfielder");
    forwards.push(el.Position === "Forward");
  });
  var countOfGoalKeepers = numberOfGoalkeeper.filter(Boolean).length;
  var countOfDefenders = defenders.filter(Boolean).length;
  var countOfForwards = modifielders.filter(Boolean).length;
  var countOfModifielders = forwards.filter(Boolean).length;

  //to check empty value of json
  // var emptyArr = [];
  // data.forEach(function (obj) {
  //   emptyArr.push(obj.JerseyNumber);
  //   // emptyArr.push(obj.Starter);
  //   emptyArr.push(obj.PlayerName);
  //   emptyArr.push(obj.Position);
  //   emptyArr.push(obj.Height);
  //   emptyArr.push(obj.Weight);
  //   emptyArr.push(obj.Nationality);
  //   emptyArr.push(obj.Appearances);
  //   emptyArr.push(obj.MinutesPlayed);
  // });

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3} sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ marginBottom: "15px" }}>Importer</Typography>
            <span onClick={handleClose}>
              <CloseIcon />
            </span>
          </div>
          <Divider sx={{ border: "1px solid grey" }} />
          <div style={{ marginTop: "24px" }}>Roster File</div>
          <div>
            <div
              style={{
                width: "67%",
                height: "40px",
                border: "1px solid grey",
                borderRadius: "5px",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "63%",
                  height: "39px",
                  // textAlign: "center",
                  //   borderR: "1px solid grey",
                }}
              >
                <p style={{ marginTop: "10px", marginLeft: "20px" }}>
                  {fileName ? fileName : "No file selected"}
                </p>
              </div>
              <div className="upload-btn-wrapper">
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  onChange={importExcelData}
                />
                <button className="btn" onClick={onButtonClick}>
                  Select File
                </button>
                {/* <button className="btn">Select file</button>
                <input onChange={importExcelData} type="file" name="myfile" /> */}
              </div>
            </div>
          </div>
          <p style={{ color: "#999999" }}>File must be in .csv format</p>

          <div>File Summary</div>
          <Grid sx={{ color: "#CBCBCB" }} container spacing={2}>
            <Grid item xs={2.5}>
              <p>Total Players</p>
              <p>{numberOfTotalPlayer.length}</p>
            </Grid>
            <Grid item xs={2.5}>
              <p>Goalkeepers</p>
              <p>{countOfGoalKeepers}</p>
            </Grid>
            <Grid item xs={2.5}>
              <p>Defenders</p>
              <p>{countOfDefenders}</p>
            </Grid>
            <Grid item xs={2.2}>
              <p>Midfielders</p>
              <p>{countOfModifielders}</p>
            </Grid>
            <Grid item xs={2.2}>
              <p>Forwards</p>
              <p>{countOfForwards}</p>
            </Grid>
          </Grid>
          <div
            style={{
              width: "100%",
              textAlign: "end",
              marginTop: "30%",
              color: "#707070",
            }}
          >
            {fileName ? (
              <CustomButton onClick={handleClose}>Import</CustomButton>
            ) : (
              "Import"
            )}
          </div>
        </Paper>
      </Modal>
    </div>
  );
}
