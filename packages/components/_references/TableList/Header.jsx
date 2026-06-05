//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { TableHead, TableRow, TableCell } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useList from "core/store/hooks/useList";

const useStyles = makeStyles((theme) => ({
  listHeader: {
    marginTop: theme.spacing(2.75),
    color: theme.palette.text[2],
    fontWeight: 700,
    lineHeight: 1.6,
    letterSpacing: 0,
    padding: 0,
    "& th": {
      color: theme.palette.text[2],
      fontFamily: `"Avenir-Heavy","Helvetica Neue",Arial,sans-serif;`,
      fontWeight: 500,
      cursor: `pointer`,
      fontSize: `0.75rem`,
      verticalAlign: `bottom`,
      whiteSpace: `nowrap`,
      "&.sinceCreate": {
        cursor: `initial`,
      },
      "&.field_2": {
        width: `2%`,
        [theme.breakpoints.down("lg")]: {
          minWidth: 40,
        },
      },
      "&.field_5": {
        width: `5%`,
        [theme.breakpoints.down("lg")]: {
          minWidth: 80,
        },
      },
      "&.field_10": {
        width: `10%`,
      },
      "&.field_15": {
        width: `15%`,
      },
      "&.field_18": {
        width: `18%`,
      },
      "&.field_20": {
        width: `20%`,
        minWidth: 200,
        maxWidth: 200,
      },
      "&.field_25": {
        width: `25%`,
        minWidth: 250,
        maxWidth: 250,
      },
      "&.field_30": {
        width: `30%`,
        minWidth: 300,
        maxWidth: 300,
      },
      "&.field_35": {
        width: `35%`,
        minWidth: 350,
        maxWidth: 350,
      },
      "&.field_45": {
        width: `45%`,
        minWidth: 450,
        maxWidth: 450,
      },
      "&.field_75": {
        flex: `0 0 25%`,
      },
    },
  },
  downup: {
    // border: `1px solid red`,
    width: 5,
    "& svg": {
      paddingTop: theme.spacing(0.5),
    },
  },
  clickable: {
    display: "flex",
    // justifyContent: 'space-between'
  },
}));

const TableListHeader = ({ hooks, columnsName }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const state = hooks?.state;
  const { pageSorts, sortOrder, [columnsName]: listColumns, listSubColumns, canSort } = state || {};
  const { handleSort } = useList(hooks);

  const renderSortIcon = (column, columnId) => {
    if (
      column.label.includes("view") ||
      column.label.includes("edit") ||
      column.label.includes("add") ||
      !column.isSort ||
      !pageSorts
    )
      return false;

    if (
      !column.label.includes("view") &&
      !column.label.includes("edit") &&
      !column.label.includes("add") &&
      column.isSort === true &&
      pageSorts.includes(columnId) &&
      sortOrder === "asc"
    ) {
      // console.log(pageSorts);
      return (
        <span className={classes.downup}>
          <ArrowDropUpIcon />
        </span>
      );
    } else {
      return (
        <span className={classes.downup}>
          <ArrowDropDownIcon />
        </span>
      );
    }
  };

  return (
    <TableHead className={classes.listHeader}>
      <TableRow>
        {listColumns &&
          Object.keys(listColumns).length > 0 &&
          Object.keys(listColumns)
            .filter((col) => col !== "details" && col !== "sinceCreate")
            .map((col) => (
              <TableCell
                className={`clickable ${listColumns[col].className ? listColumns[col].className : ""}`}
                onClick={() => handleSort(col)}
                key={listColumns[col].label}
              >
                <span className={classes.label}>{t(`${listColumns[col].label}`)}</span>
                {canSort ? renderSortIcon(listColumns[col], col) : null}
              </TableCell>
            ))}
        {listColumns &&
          Object.keys(listColumns).length > 0 &&
          Object.keys(listColumns)
            .filter((col) => col === "sinceCreate")
            .map((col) => (
              <TableCell
                className={`sinceCreate ${listColumns[col].className ? listColumns[col].className : ""}`}
                key={listColumns[col].label}
              >
                <span className={classes.label}>{t(`${listColumns[col].label}`)}</span>
              </TableCell>
            ))}
        {listSubColumns &&
          Object.keys(listSubColumns).length > 0 &&
          window.location.href.includes("/delegation/list/request") &&
          Object.keys(listSubColumns)
            // .filter((col) => col === 'details')
            .map((col) => (
              <TableCell
                className={`clickable ${listSubColumns[col].className ? listSubColumns[col].className : ""}`}
                onClick={() => handleSort(col)}
                key={state?.listSubColumns[col].label}
              >
                <span className={classes.label}>{t(`${listSubColumns[col].label}`)}</span>
                {canSort ? renderSortIcon(listSubColumns[col], col) : null}
              </TableCell>
            ))}
      </TableRow>
    </TableHead>
  );
};

export default TableListHeader;

TableListHeader.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      pageSorts: PropTypes.string.isRequired,
      sortOrder: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  columnsName: PropTypes.string.isRequired,
};
