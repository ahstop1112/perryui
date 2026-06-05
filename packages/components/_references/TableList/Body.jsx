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

const TableListBody = ({
  hooks,
  resultName,
  subResultName,
  subSubResultName,
  columnsName,
  linkNameField,
  ...props
}) => {
  const classes = useStyles();
  const state = hooks?.state;

  return (
    <TableBody className={classes.tableBody}>
      {subResultName
        ? state[resultName][subResultName]?.length > 0 &&
          state[resultName][subResultName]?.map((row, index) => {
            return row[subSubResultName]?.map((item) => (
              <TableListRow
                key={`categary_${item?.id}_${item?.name}_${index}`}
                hooks={hooks}
                name={`${item.id}_${item?.name}_${index}`}
                columns={state[columnsName]}
                row={item}
                {...props}
              />
            ));
          })
        : state[resultName]?.length > 0 &&
          state[resultName]?.map((row, index) => (
            <TableListRow
              key={`search_${row?.id}_${row?.name}_${index}`}
              hooks={hooks}
              name={`${row.id}_${row?.name}_${index}`}
              columns={state[columnsName]}
              row={row}
              {...props}
            />
          ))}
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
  resultName: PropTypes.string.isRequired,
};
