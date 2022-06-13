import React, { useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditIcon from "@mui/icons-material/Edit";
import "./roasterDetails.css";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Tooltip,
} from "@mui/material";
import CustomizedTables from "../table/Table";
import ImporterDialogue from "../dialogueBox/importerDialogue/importerDialogue";

import { CustomButton } from "../customcomponent/CustomButton";
import { HashLink as Link } from "react-router-hash-link";
import { useSelector } from "react-redux";
import EmptyTable from "../table/EmptyTable";

function RoasterDetails() {
  const [selected, setSelected] = React.useState("/");
  const [editName, setEditName] = useState(false);

  const { data } = useSelector((state) => state.editPlayerForm?.mainTable);

  const listOfDrawer = [
    {
      icon: <SportsSoccerIcon sx={{ fontSize: "2em" }} />,
      toolTip: "Home",
      content: "Home",
      path: "/home",
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
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const [inputChange, setInputChange] = React.useState("");

  const ref = useRef("");

  const [search, setSearch] = useState("Search");

  //function for keyboard interaction
  const handleKeyDown = (event) => {
    //condition to enter button
    if (event.key === "Enter") {
      setInputChange(event.target.value);
    }

    //condition for esc button
    var code = event.charCode || event.keyCode;
    if (code.key === 27) {
      setInputChange("");
    }
  };
  const handleInputChange = (e) => {
    if (e.target.value > 0) {
      ref.current.value = search;
      setInputChange(e.target.value);
    } else {
      setInputChange(e.target.value);
    }
  };
  var inputLength = inputChange.length;

  const handleEditName = () => {
    setEditName(true);
  };

  return (
    <>
      <div>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            width: "100%",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#111111",
            }}
          >
            <List className="list">
              {listOfDrawer.map((item, idx) => (
                <ListItem key={idx} sx={{ padding: "8px 12px" }}>
                  <Tooltip
                    sx={{ fontSize: "2em" }}
                    title={item.toolTip}
                    placement="right"
                  >
                    <Link to={item.path}>
                      <ListItemIcon
                        onClick={() => setSelected(item.path)}
                        sx={
                          selected == item?.path
                            ? { color: "#FEA013" }
                            : { color: "#69563A" }
                        }
                      >
                        {item.icon}
                      </ListItemIcon>
                    </Link>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Box>
          <Paper
            elevation={3}
            sx={{ backgroundColor: "#383838", padding: "50px", width: "100%" }}
          >
            <div className="tableWrapper">
              <div className="formationOverviewWrapper">
                <span>
                  <p>Formation Overview</p>
                  <div className="myTeamDiv">
                    <h4>{editName ? "Aman-kumar-champion" : "My Team"}</h4>
                    {!editName ? (
                      <EditIcon className="editIcon" onClick={handleEditName} />
                    ) : null}
                  </div>
                </span>
                <span className="searchContainer">
                  <div className="container">
                    <form className="searchForm">
                      <input
                        className="searchForm"
                        type="search"
                        ref={ref}
                        onKeyDown={handleKeyDown}
                        // placeholder="Find Player..."
                        placeholder="Search player name"
                        onChange={handleInputChange}
                      />
                      {inputLength > 0 ? (
                        <button onClick={handleKeyDown} id="btn">
                          Search
                        </button>
                      ) : null}
                    </form>
                  </div>
                  <div className="btnWrapper">
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
                  </div>
                </span>
              </div>
              <ImporterDialogue open={open} handleClose={handleClose} />
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#494949",

                  height: "700px",
                }}
              >
                {data.length > 0 ? (
                  <div style={{ display: "flex" }}>
                    <CustomizedTables inputChange={inputChange} />
                  </div>
                ) : (
                  <>
                    <div>
                      <EmptyTable />
                    </div>
                    <div className="emptyTableMessage">
                      <p>You do not have any player on the roster</p>
                      <h4 onClick={handleOpen}>Import Team</h4>
                    </div>
                  </>
                )}
              </Paper>
            </div>
          </Paper>
        </Paper>
      </div>
    </>
  );
}

export default RoasterDetails;
