import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#2D2D2D",
  border: "2px solid #000",
  boxShadow: 24,
  color: "white",
  borderRadius: "10px",
  p: 4,
};

export default function TooMuchStarter() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex" }}>
            <img width="10%" src="./alert.png" alt="alert" />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              There are too many starters
            </Typography>
          </div>

          <p style={{ fontSize: "15px", color: "grey" }}>
            Your team has too many starters for one or more of the positions in
            the 4-3-3 formation.
          </p>
        </Box>
      </Modal>
    </div>
  );
}
