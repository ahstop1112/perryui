//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { TableHead, TableRow, TableCell } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  tableSubHeader: {
    width: `100%`,
    maxWidth: `100%`,
    marginBottom: 0,
    padding: theme.spacing(1.5),
    "& tr": {
      width: `100%`,
      maxWidth: `100%`,
    },
    "& th": {
      borderBottom: `2px solid ${theme.palette.line[3]}`,
      fontWeight: 500,
      border: `none`,
      lineHeight: 2,

      "&.field_5": {
        flex: `0 0 5%`,
        width: `5%`,
      },
      "&.field_15": {
        flex: `0 0 15%`,
        width: `15%`,
      },
      "&.field_20": {
        flex: `0 0 20%`,
        width: `20%`,
      },
      "&.field_25": {
        flex: `0 0 25%`,
        width: `25%`,
      },
      "&.field_30": {
        flex: `0 0 30%`,
        width: `30%`,
      },
      "&.field_35": {
        flex: `0 0 35%`,
        width: `35%`,
      },
      "&.field_40": {
        flex: `0 0 40%`,
        width: `40%`,
      },
      "&.field_45": {
        flex: `0 0 40%`,
        width: `40%`,
      },
      "&.field_75": {
        flex: `0 0 75%`,
        width: `75%`,
      },
    },
  },
  downup: {
    marginTop: -theme.spacing(0.5),
  },
  clickable: {
    display: "flex",
    // justifyContent: 'space-between'
  },
}));

const SubHeader = ({ listSubColumns, className }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion

  return (
    <TableHead className={`${classes.tableSubHeader} ${className}`}>
      <TableRow>
        {Object.keys(listSubColumns).map((col) => (
          <TableCell
            key={listSubColumns[col].id}
            className={`clickable ${listSubColumns[col].className ? listSubColumns[col].className : ""}`}
          >
            <span className={classes.label}>{t(`${listSubColumns[col]?.label}`)}</span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SubHeader;

SubHeader.propTypes = {
  listSubColumns: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
};
