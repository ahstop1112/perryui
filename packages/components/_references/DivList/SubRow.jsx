//  General JS Library importation
import React from "react";
import { TableRow, TableCell } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  tableSubRow: {
    padding: `0 !important`,
    width: `100%`,
    maxWidth: `100%`,
    "& tr": {
      width: `100%`,
      maxWidth: `100%`,
    },
    "& td": {
      orderBottom: `2px solid ${theme.palette.line[3]}`,
      fontWeight: 500,
      border: `none`,
      lineHeight: 2,
      padding: theme.spacing(1.5),
      "&.field_5": {
        width: `5%`,
      },
      "&.field_15": {
        width: `15%`,
      },
      "&.field_20": {
        width: `20%`,
      },
      "&.field_25": {
        width: `25%`,
      },
      "&.field_30": {
        width: `30%`,
      },
      "&.field_35": {
        width: `35%`,
      },
      "&.field_45": {
        width: `40%`,
      },
      "&.field_75": {
        width: `75%`,
      },
    },
    "&:last-child": {
      "& > div": {
        borderBottom: 0,
      },
    },
  },
  subRowAssetTypeField: {
    borderBottom: `1px solid ${theme.palette.line[3]}`,
    flex: `0 0 40%`,
    minWidth: theme.spacing(40),
    padding: theme.spacing(1.5),
  },
  subRowNumberField: {
    borderBottom: `1px solid ${theme.palette.line[3]}`,
    flex: `0 0 15%`,
    minWidth: theme.spacing(14),
    padding: theme.spacing(1.5),
  },
  downup: {
    marginTop: -theme.spacing(0.5),
  },
  clickable: {
    display: "flex",
    // justifyContent: 'space-between'
  },
}));

const SubRow = ({ subListColumns, subRow }) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableSubRow}>
      {Object.keys(subRow).length > 0 &&
        Object.keys(subRow).map((col) => (
          <TableCell
            key={subListColumns[col].id}
            className={`${subListColumns[col].className} ${
              col.includes("assetType") ? classes.subRowAssetTypeField : classes.subRowNumberField
            }
                    ${col !== "changePercent" && subRow[col] < 0 ? classes.negativeColor : ""}`}
          >
            {typeof subRow[col] === "number"
              ? col.includes("changePercent")
                ? numeral(subRow[col]).format("0.00%")
                : numeral(subRow[col]).format("0,0.00")
              : subRow[col]}
          </TableCell>
        ))}
    </TableRow>
  );
};

SubRow.propTypes = {
  subListColumns: PropTypes.objectOf(PropTypes.string).isRequired,
  subRow: PropTypes.shape({
    assetType: PropTypes.string.isRequired,
    priorNAV: PropTypes.number.isRequired,
    currentNAV: PropTypes.number.isRequired,
    changeNAV: PropTypes.number.isRequired,
    changePercent: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubRow;
