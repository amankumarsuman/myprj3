import { Table, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { TableColumn } from "./tableColumn";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#494949",
    color: "white",
    border: "none",
  },
}));

function EmptyTable() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {TableColumn.map((item) => (
                <React.Fragment key={item.id}>
                  <StyledTableCell key={item.id}>{item.label}</StyledTableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}

export default EmptyTable;
