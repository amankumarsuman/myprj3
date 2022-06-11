import { makeStyles } from "@mui/material";

const useStyles = makeStyles({
    icon: {
      color: "#7D90B2 !important",
    },
    iconButton: {
      padding: "0px !important",
      margin: "0px !important",
    },
    commonWidth: {
      width: "130px !important",
    },
    headingDiv: {
      height: "60px",
      background: "#BEDAF4",
      margin: "auto",
      padding: "1% 0%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px 6px 0px 0px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    headingRange: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "auto",
      fontSize: "2.5vh",
      fontWeight: "bold",
    },
    addButton: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
      // position: "absolute",
      // top: "50px",
      padding: "10px 0px",
    },
  
    displayDetails: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
      // position: "absolute",
      // top: "50px",
      padding: "10px 0px",
      width: "103%",
      marginLeft: "-20px",
      // border: "1px solid red",
    },
  
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    wrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "150px",
    },
  
    actionIconDiv: {
      display: "flex",
      flexDirection: "row",
      width: "50%",
      justifyContent: "space-around",
    },
    distributeMainContainer: {
      marginTop: "2em",
    },
  
    buttons2: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "20px",
      // border: "1px solid red",
      width: "101.5%",
    },
    wrapper2: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
    },
    headingIcon: {
      fontSize: "30px",
    },
    backButton: {
      // border: "1px solid black",
      display: "flex",
      justifyContent: "flex-end",
    },
  });
  export {useStyles}