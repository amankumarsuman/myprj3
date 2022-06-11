import makeStyles from "@mui/styles/makeStyles";

const dangerStyles = makeStyles({
  body: {
    width: "100%",
  },
  title: {
    width: "600px",
    color: "red",
    fontSize: "25px",
    fontWeight: "bold",
    // height: "80px",
  },
  message: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#2E4CBC",
    // height: "80px",
  },
});
const normalStyles = makeStyles({
  body: {
    width: "100%",
  },
  title: {
    width: "600px",
    color: "#2E4CBC",
    fontSize: "25px",
    fontWeight: "bold",
    // height: "80px",
  },
  message: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#ff0000cf",
    // height: "80px",
  },
});

export { dangerStyles, normalStyles };
