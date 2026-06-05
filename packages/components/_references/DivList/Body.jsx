//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import DivListRow from "./Row";

const useStyles = makeStyles((theme) => ({
  tableBody: {
    marginTop: theme.spacing(2.75),
    fontFamily: "Avenir-Book",
    color: theme.palette.text[4],
    letterSpacing: 0,
    padding: 0,
  },
}));

const DivListBody = ({ hooks, resultName, columnsName, linkNameField, ...props }) => {
  const classes = useStyles();
  const state = hooks?.state;

  return (
    <div className={classes.tableBody}>
      {state[resultName].length > 0 &&
        state[resultName].map((row) => (
          <DivListRow
            key={`${row?.id}_${row?.name}`}
            hooks={hooks}
            name={`${row.id}_${row?.name}`}
            columns={state[columnsName]}
            row={row}
            {...props}
          />
        ))}
    </div>
  );
};

export default DivListBody;

DivListBody.propTypes = {
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
