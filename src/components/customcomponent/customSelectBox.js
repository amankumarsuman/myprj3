import { Select,  } from "@mui/material";
import {  styled } from "@mui/material/styles";

const CustomSelectBox = styled(Select)({
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      color: "white",
    },
    "& ..MuiSelect-select":{
        color:"white"
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
  export {CustomSelectBox}