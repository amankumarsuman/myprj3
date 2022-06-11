import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#FEA013",
  "&:hover": {
    backgroundColor: "#BA4A0C",
  },
}));
