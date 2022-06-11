import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditIcon from "@mui/icons-material/Edit";
// import image from "./football.png";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
function Body() {
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

  return (
    <>
      <div>
        <Paper
          elevation={3}
          sx={{ display: "flex", width: "70%", margin: "auto" }}
        >
          <Box sx={{ display: "flex", backgroundColor: "#111111" }}>
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
            sx={{ backgroundColor: "#383838", padding: "50px" }}
          >
            <div style={{ marginLeft: "40px" }}>
              <p style={{ color: "#FEA013" }}>Formation Overview</p>
              <div style={{ display: "flex" }}>
                <h4 style={{ color: "white" }}>My Team</h4>
                <EditIcon
                  sx={{ marginTop: "20px", color: "white", marginLeft: "20px" }}
                />
              </div>

              <Paper
                elevation={3}
                sx={{ backgroundColor: "#494949", padding: "20px" }}
              >
                <div style={{ display: "flex" }}>
                  <img src="./playGround.png" alt="playground" />
                  <div style={{ width: "322px" }}>
                    <Divider
                      sx={{ backgroundColor: "#494949" }}
                      variant="middle"
                    />
                  </div>
                </div>
              </Paper>
            </div>
          </Paper>
        </Paper>
      </div>
    </>
  );
}

export default Body;
