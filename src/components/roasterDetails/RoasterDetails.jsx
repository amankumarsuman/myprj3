import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditIcon from "@mui/icons-material/Edit";
// import image from "./football.png";
import "./roasterDetails.css";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomizedTables from "../table/Table";
import ImporterDialogue from "../dialogueBox/importerDialogue/importerDialogue";
import { styled } from "@mui/material/styles";
import { CustomButton } from "../customcomponent/CustomButton";
// const CustomButton = styled(Button)(({ theme }) => ({
//   color: "white",
//   backgroundColor: "#FEA013",
//   "&:hover": {
//     backgroundColor: "#BA4A0C",
//   },
// }));

function RoasterDetails() {
  const [selected, setSelected] = React.useState("/");
  const listOfDrawer = [
    {
      icon: <SportsSoccerIcon sx={{ fontSize: "2em" }} />,
      toolTip: "Home",
      content: "Home",
      path: "/",
    },
    {
      icon: <MenuIcon sx={{ fontSize: "2em" }} />,
      toolTip: "Home",
      content: "Home",
      path: "/",
    },
    {
      icon: <GroupsIcon sx={{ fontSize: "2em" }} />,
      toolTip: "Team",
      content: "Team",
      path: "/playground",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputChange, setInputChange] = React.useState("");
  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };
  var inputLength = inputChange.length;
  return (
    <>
      <div>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            width: "100%",
            margin: "auto",
            // border: "1px solid red",
            // height: "100vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#111111",
            }}
          >
            <List style={{ marginTop: "10px" }}>
              {listOfDrawer.map((item, idx) => (
                <ListItem
                  key={idx}
                  sx={{ padding: "8px 12px" }}
                  // onClick={() => handleAddTab(item)}
                >
                  <Tooltip
                    sx={{ fontSize: "2em" }}
                    title={item.toolTip}
                    placement="right"
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          selected == item?.path ? "#FEA013" : "#69563A"
                        }`,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </Tooltip>
                  {/* <ListItemText>{item.toolTip}</ListItemText> */}
                </ListItem>
              ))}
            </List>
          </Box>
          <Paper
            elevation={3}
            sx={{ backgroundColor: "#383838", padding: "50px", width: "100%" }}
          >
            <div style={{ marginLeft: "40px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <p style={{ color: "#FEA013" }}>Formation Overview</p>
                  <div style={{ display: "flex" }}>
                    <h4 style={{ color: "white", marginTop: 0 }}>My Team</h4>
                    <EditIcon sx={{ color: "white", marginLeft: "20px" }} />
                  </div>
                </span>
                <span style={{ display: "flex" }}>
                  <div className="container">
                    <form className="searchForm">
                      {inputLength >= 1 ? (
                        <input
                          className="searchForm"
                          type="search"
                          // placeholder="Find Player..."
                          placeholder="Search player name"
                          onChange={handleInputChange}
                        />
                      ) : (
                        <input
                          className="searchForm"
                          type="search"
                          // placeholder="Find Player..."
                          placeholder="Find Player"
                          onChange={handleInputChange}
                        />
                      )}
                    </form>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {inputLength >= 1 ? (
                      <Button
                        sx={{
                          backgroundColor: "#383838",
                          border: "1px solid grey",
                          color: "white",
                        }}
                        variant="outlined"
                        onClick={handleOpen}
                      >
                        Re-import Team
                      </Button>
                    ) : (
                      <CustomButton
                        sx={{ backgroundColor: "#FEA013" }}
                        variant="contained"
                        onClick={handleOpen}
                      >
                        Import Team
                      </CustomButton>
                    )}
                    {/* <Button
                      sx={{ backgroundColor: "#FEA013" }}
                      variant="contained"
                      onClick={handleOpen}
                    >
                      {inputLength >= 1 ? "Re-import Team" : "Import Team"}
                    </Button> */}
                  </div>
                </span>
              </div>
              <ImporterDialogue open={open} handleClose={handleClose} />
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#494949",
                  // padding: "20px",
                  height: "700px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <CustomizedTables inputChange={inputChange} />
                </div>
              </Paper>
            </div>
          </Paper>
        </Paper>
      </div>
    </>
  );
}

export default RoasterDetails;
