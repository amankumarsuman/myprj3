import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditIcon from "@mui/icons-material/Edit";
import playGround from "./playGround.png";
import "./body.css";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PlayerDataNotFound from "../dialogueBox/noPlayerDataFound/PlayerDataNotFound";
import NotEnoughStarter from "../dialogueBox/notEnoughStarter/NotEnoughStarter";
import TooMuchStarter from "../dialogueBox/tooMuchStarter/TooMuchStarter";
function Body() {
  //extracting data array from redux
  const { data } = useSelector((state) => state.editPlayerForm?.mainTable);

  //getting data of all player
  var numberOfGoalkeeper = [];
  var nameOfGoalKeeper = [];
  var numberOfdefenders = [];
  var nameOfdefenders = [];
  var numberOfMidfielder = [];
  var nameOfMidfielder = [];
  var numberOfForward = [];
  var nameOfForward = [];
  var numberOfStarter = [];

  //mapping data array of table and getting whoever starter is playing their all data
  data.map((el, i) => {
    //condition to check for playing goalkeeper
    if (el.Position === "Goalkeeper" && el.Starter == "Yes") {
      //pushing index of condition satisfied players
      numberOfGoalkeeper.push(i);
      //pushing details of all player who satisfied the condition
      nameOfGoalKeeper.push({
        name: el.PlayerName,
        JerseyNumber: el.JerseyNumber,
        image: el.PlayerImage,
        Appearances: el.Appearances,
        MinutesPlayed: el.MinutesPlayed,
        CleanSheets: el.CleanSheets,
        Saves: el.Saves,
        Position: el.Position,
        Height: el.Height,
        Weight: el.Weight,
        Nationality: el.Nationality,
        FlagImage: el.FlagImage,
      });
    }

    //condition to check for playing Defender

    if (el.Position == "Defender" && el.Starter == "Yes") {
      //pushing index of condition satisfied players

      numberOfdefenders.push(i);
      //pushing details of all player who satisfied the condition

      nameOfdefenders.push({
        name: el.PlayerName,
        JerseyNumber: el.JerseyNumber,
        image: el.PlayerImage,
        Appearances: el.Appearances,
        MinutesPlayed: el.MinutesPlayed,
        CleanSheets: el.CleanSheets,
        Saves: el.Saves,
        Position: el.Position,
        Height: el.Height,
        Weight: el.Weight,
        Nationality: el.Nationality,
        Goals: el["Goals "],
        Assists: el.Assists,
        FlagImage: el.FlagImage,
      });
    }

    //condition to check for playing Midfielders

    if (el.Position == "Midfielder" && el.Starter == "Yes") {
      //pushing index of condition satisfied players

      numberOfMidfielder.push(i);
      //pushing details of all player who satisfied the condition

      nameOfMidfielder.push({
        name: el.PlayerName,
        JerseyNumber: el.JerseyNumber,
        image: el.PlayerImage,
        Appearances: el.Appearances,
        MinutesPlayed: el.MinutesPlayed,
        CleanSheets: el.CleanSheets,
        Saves: el.Saves,
        Position: el.Position,
        Height: el.Height,
        Weight: el.Weight,
        Nationality: el.Nationality,
        Goals: el["Goals "],
        Assists: el.Assists,
        FlagImage: el.FlagImage,
      });
    }
    //condition to check for playing Forwards

    if (el.Position == "Forward" && el.Starter == "Yes") {
      //pushing index of condition satisfied players

      numberOfForward.push(i);
      //pushing details of all player who satisfied the condition
      console.log("el", el["Goals "]);
      nameOfForward.push({
        name: el.PlayerName,
        JerseyNumber: el.JerseyNumber,
        image: el.PlayerImage,
        Appearances: el.Appearances,
        MinutesPlayed: el.MinutesPlayed,
        CleanSheets: el.CleanSheets,
        Saves: el.Saves,
        Position: el.Position,
        Height: el.Height,
        Weight: el.Weight,
        Nationality: el.Nationality,
        Goals: el["Goals "],
        Assists: el.Assists,
        FlagImage: el.FlagImage,
      });
    }
    //condition to check only those starter who is playing
    if (el.Starter == "Yes") {
      numberOfStarter.push(i);
    }
  });
  //variable to check condition of 4-4-3
  var lineupCompleted = false;
  if (
    numberOfGoalkeeper.length == 1 &&
    numberOfdefenders.length == 4 &&
    numberOfMidfielder.length == 4 &&
    numberOfForward.length == 3
  ) {
    lineupCompleted = true;
  }

  //state for routing
  const [selected, setSelected] = React.useState("/");

  //list of drawer with all details
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

  //state to edit team name
  const [editName, setEditName] = useState(false);
  const [playerStat, setPlayerStat] = useState({});
  // function to toggle between name of team and static div my team
  const handleEditName = () => {
    setEditName(true);
  };
  const handlePlayerStat = (item) => {
    setPlayerStat(item);
  };
  console.log("player stat", playerStat);
  console.log("player data", data);
  return (
    <>
      <div>
        <Paper
          elevation={3}
          sx={{ display: "flex", width: "100%", margin: "auto" }}
        >
          <Box sx={{ display: "flex", backgroundColor: "#111111" }}>
            <List style={{ marginTop: "10px" }}>
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
            sx={{ backgroundColor: "#383838", padding: "50px" }}
          >
            <div style={{ marginLeft: "40px" }}>
              <p style={{ color: "#FEA013" }}>Formation Overview</p>
              <div style={{ display: "flex" }}>
                <h4 style={{ color: "white", marginTop: 0 }}>
                  {editName ? "Aman-kumar-champion" : "My Team"}
                </h4>
                {!editName ? (
                  <EditIcon
                    onClick={handleEditName}
                    sx={{ color: "white", marginLeft: "20px" }}
                  />
                ) : null}
              </div>

              <Paper
                elevation={3}
                sx={{ backgroundColor: "#494949", padding: "20px" }}
              >
                {lineupCompleted ? (
                  <div className="playground" style={{ display: "flex" }}>
                    <div
                      className="playground2"
                      style={{ background: `url(${playGround})` }}
                    >
                      <div className="playerName">
                        {nameOfGoalKeeper.map((el) => {
                          return (
                            <>
                              <div className="goalkeeper">
                                <p
                                  onClick={() => handlePlayerStat(el)}
                                  className="text"
                                >
                                  {el.JerseyNumber}
                                </p>
                              </div>

                              <p>{el.name}</p>
                            </>
                          );
                        })}
                      </div>

                      <div className="position">
                        {nameOfdefenders.map((el) => {
                          return (
                            <>
                              <div className="circle">
                                <p
                                  onClick={() => handlePlayerStat(el)}
                                  className="text"
                                >
                                  {el.JerseyNumber}
                                </p>
                              </div>

                              <p>{el.name}</p>
                            </>
                          );
                        })}
                      </div>
                      <div className="position">
                        {nameOfMidfielder.map((el) => {
                          return (
                            <>
                              <div className="circle">
                                <p
                                  onClick={() => handlePlayerStat(el)}
                                  className="text"
                                >
                                  {el.JerseyNumber}
                                </p>
                              </div>

                              <p>{el.name}</p>
                            </>
                          );
                        })}
                      </div>
                      <div
                        className="position"
                        style={{ width: "150px", marginTop: "100px" }}
                      >
                        {nameOfForward.map((el) => {
                          return (
                            <>
                              <div className="circle">
                                <p
                                  onClick={() => handlePlayerStat(el)}
                                  className="text"
                                >
                                  {el.JerseyNumber}
                                </p>
                              </div>

                              <p>{el.name}</p>
                            </>
                          );
                        })}
                      </div>
                    </div>

                    {/* <img src="./playGround.png" alt="playground" /> */}
                    <div
                      style={{
                        width: "322px",
                        height: "500px",
                        background: `url(${playerStat.image})`,
                      }}
                    >
                      <div>
                        <h1 style={{ color: "#FEA013", marginLeft: "20px" }}>
                          {playerStat.JerseyNumber}
                        </h1>
                      </div>
                      <div>
                        <h5
                          style={{
                            color: "white",
                            fontSize: "25px",
                            marginTop: "350px",
                          }}
                        >
                          {playerStat.name}
                        </h5>
                        <h5
                          style={{
                            marginTop: "-40px",
                            color: "#FEA013",
                            fontSize: "20px",
                          }}
                        >
                          {playerStat.Position}
                        </h5>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <p style={{ color: "#CBCBCB", marginTop: "-10px" }}>
                              Height
                            </p>
                            <p style={{ color: "white" }}>
                              {playerStat.Height}
                            </p>
                          </Grid>
                          <Grid item xs={4}>
                            <p style={{ color: "#CBCBCB", marginTop: "-10px" }}>
                              Weight
                            </p>
                            <p style={{ color: "white" }}>
                              {playerStat.Weight}
                            </p>
                          </Grid>
                          <Grid item xs={4}>
                            <p style={{ color: "#CBCBCB", marginTop: "-10px" }}>
                              Nationality
                            </p>
                            <p style={{ color: "white" }}>
                              <img width="100px" src={playerStat.FlagImage} />
                              {playerStat.Nationality}
                            </p>
                          </Grid>
                        </Grid>
                      </div>
                      {/* style={{ background: `url(${playGround})` }} */}
                      {/* <img
                        height="500px"
                        src={playerStat.image}
                        alt="playerImage"
                      /> */}
                      <Divider
                        sx={{ backgroundColor: "#494949" }}
                        variant="middle"
                      />
                      <Grid container spacing={6}>
                        <Grid item sx={6}>
                          <span style={{ color: "#FEA013", fontSize: "20px" }}>
                            {playerStat.Appearances}
                          </span>
                          <br />
                          <span style={{ color: "#CBCBCB" }}>Appearances</span>
                        </Grid>
                        <Grid item sx={6}>
                          <span style={{ color: "#FEA013", fontSize: "20px" }}>
                            {playerStat.MinutesPlayed}
                          </span>
                          <br />
                          <span style={{ color: "#CBCBCB" }}>
                            MinutesPlayed
                          </span>
                        </Grid>
                        <Grid item sx={6}>
                          <span style={{ color: "#FEA013", fontSize: "20px" }}>
                            {playerStat.Position == "Goalkeeper"
                              ? playerStat.CleanSheets
                              : playerStat.Goals}
                          </span>
                          <br />
                          <span style={{ color: "#CBCBCB" }}>
                            {" "}
                            {playerStat.Position == "Goalkeeper"
                              ? "CleanSheets"
                              : "Goals"}
                          </span>
                        </Grid>
                        <Grid item sx={6}>
                          <span
                            style={{
                              color: "#FEA013",
                              fontSize: "20px",
                              marginLeft: "50px",
                            }}
                          >
                            {playerStat.Position == "Goalkeeper"
                              ? playerStat.Saves
                              : playerStat.Assists}
                          </span>
                          <br />
                          <span
                            style={{ color: "#CBCBCB", marginLeft: "50px" }}
                          >
                            {playerStat.Position == "Goalkeeper"
                              ? "Saves"
                              : "Assists"}
                          </span>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                ) : data.length == 0 ? (
                  <div className="playground" style={{ display: "flex" }}>
                    <div
                      className="playground2"
                      style={{ background: `url(${playGround})` }}
                    >
                      <PlayerDataNotFound />
                    </div>
                  </div>
                ) : numberOfStarter.length < 12 ? (
                  <div className="playground" style={{ display: "flex" }}>
                    <div
                      className="playground2"
                      style={{ background: `url(${playGround})` }}
                    >
                      <NotEnoughStarter />
                    </div>
                  </div>
                ) : (
                  <div className="playground" style={{ display: "flex" }}>
                    <div
                      className="playground2"
                      style={{ background: `url(${playGround})` }}
                    >
                      <TooMuchStarter />
                    </div>
                  </div>
                )}
              </Paper>
            </div>
          </Paper>
        </Paper>
      </div>
    </>
  );
}

export default Body;
