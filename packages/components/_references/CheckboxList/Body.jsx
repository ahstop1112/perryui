//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import { TableBody } from "@mui/material";
import TableListRow from "./Row";

const useStyles = makeStyles((theme) => ({
  tableBody: {
    marginTop: theme.spacing(2.75),
    fontFamily: "Avenir-Book",
    color: theme.palette.text[4],
    letterSpacing: 0,
    padding: 0,
  },
}));

const TableListBody = ({ hooks, columnsName, onCheckboxChange, isSelected }) => {
  const classes = useStyles();
  const state = hooks?.state;
  const { searchResult = [] } = state;

  return (
    <TableBody className={classes.tableBody}>
      {searchResult?.length > 0 &&
        searchResult?.map((row, index) => {
          const isItemSelected = isSelected(row?.id);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableListRow
              key={`${row?.id}_${labelId}`}
              name={row?.id}
              columns={state[columnsName]}
              isItemSelected={isItemSelected}
              row={row}
              labelId={labelId}
              onCheckboxChange={onCheckboxChange}
            />
          );
        })}
    </TableBody>
  );
};

export default TableListBody;

TableListBody.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
      sortOrder: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  columnsName: PropTypes.string.isRequired,
};
