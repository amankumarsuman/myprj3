// import { CheckBox } from "@mui/icons-material";
// import {
//   createTheme,
//   FormControlLabel,
//   RadioGroup,
//   TextField,
// } from "@mui/material";
// import React from "react";
// import { ThemeProvider } from "styled-components";
// // import { useLocation } from "react-router-dom";
// import "./customTextFiedStyle.css";
// import { alpha, styled } from "@mui/material/styles";
// const CssTextField = styled(TextField)({
//   "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
//     color: "white",
//   },
//   "& label.Mui-focused": {
//     color: "green",
//   },
//   "& MuiInputBase-input": {
//     color: "white",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "green",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "grey",
//     },
//     "&:hover fieldset": {
//       borderColor: "yellow",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "green",
//     },
//   },
// });


// export function customTextFieldContainer({name,label,handleChange}){
//   return(
//     <CssTextField
//     name={name}
   
//     label={label}
//    onChange={handleChange}
//   />
//   )
// }

// export function RHookTextFeildContainer({
//   name,
//   label,
//   type,
//   rows,
//   children,
//   defaultValue = "",
//   uniqueId = "",
//   onChange = () => {},
//   disabled,
//   maxLength = 100,
//   method = {},
//   reduxUpdateFunction = () => {},
//   options = [],
//   customFunctionCall = () => {},
//   ...props
// }) {


//   //   const { state } = useLocation();
//   const changeCase = (e) => {
//     e.preventDefault();
//     e.target.value = e.target.value.toUpperCase();
//   };
//   const [theValue, setTheValue] = React.useState(method.getValues(name));

//   if (type === "select") {
//     return (
//       <TextField
//         select
//         fullWidth
//         // disabled={state === "viewOnly" || disabled}
//         {...method.register(name)}
//         onChange={(e) => {
//           setTheValue(e.target.value);
//           reduxUpdateFunction({ [e.target.name]: e.target.value });
//         }}
//         name={name}
//         value={theValue}
//         label={label}
//         error={method.formState?.errors?.[name]}
//         defaultValue={theValue}
//         helperText={method.formState?.errors?.[name]?.message}
//         {...props}
//       >
//         {children}
//       </TextField>
//     );
//   }
//   if (type === "select1") {
//     return (
//       <div className="select-wrapper">
//         <select
//           name={name}
//           //   disabled={state === "viewOnly" || disabled}
//           {...method.register(name)}
//           className="select-box"
//           onChange={(e) => customFunctionCall(e)}
//         >
//           {options.length > 0 &&
//             options.map((option, index) => {
//               return (
//                 <option
//                   className="select-options"
//                   key={index}
//                   value={option?.value}
//                 >
//                   {option?.label}
//                 </option>
//               );
//             })}
//         </select>
//         <label className="select-label">{label}</label>
//       </div>
//     );
//   }

//   if (type === "text") {
//     return (
//       // <ThemeProvider theme={theme}>
//       <CssTextField
//         name={name}
//         alt={props.alt}
//         // style={{MuiInputLabel-root }}
//         // disabled={state === "viewOnly" || disabled}
//         onChange={changeCase}
//         helperText={method?.formState?.errors?.[name]?.message ?? ""}
//         fullWidth
//         inputProps={{
//           style: {
//             textTransform: props.casetype === "uppercase" ? "uppercase" : "",
//           },
//           casetype: props.casetype,
//           maxLength: maxLength,
//         }}
//         error={!!method?.formState?.errors?.[name]}
//         {...method?.register(name)}
//         label={label}
//         {...props}
//       />
//       // </ThemeProvider>
//     );
//   }
//   if (type === "checkbox") {
//     return (
//       <FormControlLabel
//         control={
//           <CheckBox
//             // disabled={state === "viewOnly" || disabled}
//             defaultChecked={method.getValues(name) === "Y" ? true : false}
//           />
//         }
//         {...method?.register(name)}
//         label={label}
//         {...props}
//       />
//     );
//   }
//   if (type === "radio") {
//     return (
//       <FormControlLabel
//         control={
//           <RadioGroup
//             // disabled={state === "viewOnly" || disabled}
//             checked={method.getValues(name) === "Y" ? true : false}
//           />
//         }
//         {...method?.register(name)}
//         label={label}
//         {...props}
//       />
//     );
//   }
// }
