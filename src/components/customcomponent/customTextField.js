import { TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  });
  export {CustomTextField}