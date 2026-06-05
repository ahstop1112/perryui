//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useList from "core/store/hooks/useList";

const useStyles = makeStyles((theme) => ({
  listHeader: {
    color: theme.palette.text[2],
    fontWeight: 700,
    lineHeight: 1.6,
    letterSpacing: 0,
    padding: 0,
    "& th": {
      width: `auto !important`,
      color: theme.palette.text[2],
      fontWeight: 700,
      cursor: `pointer`,
      fontSize: `0.75rem`,
      lineHeight: `1.75rem`,
      verticalAlign: `initial`,
      whiteSpace: `nowrap`,
      [theme.breakpoints.down("sm")]: {
        minWidth: `none !important`,
        // border: `1px solid red`,
      },
      "&.sinceCreate": {
        cursor: `initial`,
      },
      "& .MuiIconButton-root": {
        // border: `1px solid red`,
        paddingTop: 0,
        paddingBottom: 0,
        [theme.breakpoints.down("sm")]: {
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(0.5),
        },
        "& svg": {
          color: theme.palette.text[1],
        },
      },
      "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": {
        color: theme.palette.text[1],
      },
      "&.field_2": {
        width: `2%`,
        // minWidth: 40,
        // maxWidth: 50,
        // [theme.breakpoints.down('md')]: {
        //   minWidth: 40,
        // },
      },
      "&.field_5": {
        width: `5%`,
        // minWidth: 60,
        // maxWidth: 80,
        // [theme.breakpoints.down('md')]: {
        //   minWidth: 80,
        // },
      },
      "&.field_10": {
        width: `10%`,
        // minWidth: 100,
        // maxWidth: 100,
      },
      "&.field_15": {
        width: `15%`,
        // minWidth: 150,
        // maxWidth: 150,
        // [theme.breakpoints.down('xs')]: {
        //   minWidth: 120,
        // },
      },
      "&.field_18": {
        width: `18%`,
        // minWidth: 180,
        // maxWidth: 180,
      },
      "&.field_20": {
        width: `20%`,
        // minWidth: 200,
        // maxWidth: 200,
      },
      "&.field_25": {
        width: `25%`,
        // minWidth: 250,
        // maxWidth: 250,
      },
      "&.field_30": {
        width: `30%`,
        // minWidth: 300,
        // maxWidth: 300,
      },
      "&.field_35": {
        width: `35%`,
        // minWidth: 350,
        // maxWidth: 350,
      },
      "&.field_45": {
        width: `45%`,
        // minWidth: 450,
        // maxWidth: 450,
      },
      "&.field_75": {
        flex: `0 0 25%`,
      },
      "& .MuiCheckbox-colorSecondary.Mui-checked": {
        color: theme.palette.text[3],
      },
    },
    "& .css-22mfpe-MuiTableCell-root": {
      padding: `0 8px`,
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

const TableListHeader = ({ hooks, columnsName, numSelected, onSelectAllClick }) => {
  const classes = useStyles();
  const state = hooks?.state;
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { handleSort } = useList(hooks);
  const { searchResult, pageSorts, sortOrder, canSort } = state;

  const renderSortIcon = (column, columnId) => {
    if (!column.isSort || !pageSorts) return "";

    if (column.isSort === true && pageSorts.includes(columnId) && sortOrder === "asc") {
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
        {Object.keys(state[columnsName])
          .filter((col) => col === "checkbox")
          .map((col) => (
            <TableCell
              className={`clickable ${state[columnsName][col].className ? state[columnsName][col].className : ""}`}
              onChange={onSelectAllClick}
              key={state[columnsName][col].label}
            >
              {col === "checkbox" && (
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < searchResult?.length}
                  checked={searchResult?.length > 0 && numSelected === searchResult?.length}
                  onChange={onSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              )}
              <span className={classes.label}>{state[columnsName][col].label}</span>
              {col !== "sinceCreate" && canSort ? renderSortIcon(state[columnsName][col], col) : ""}
            </TableCell>
          ))}
        {Object.keys(state[columnsName])
          .filter((col) => col !== "checkbox" && col !== "sinceCreate")
          .map((col) => (
            <TableCell
              className={`clickable ${state[columnsName][col].className ? state[columnsName][col].className : ""}`}
              onClick={() => col !== "checkbox" && handleSort(col)}
              key={state[columnsName][col].label}
            >
              <span className={classes.label}>{t(`${state[columnsName][col].label}`)}</span>
              {col !== "sinceCreate" ? renderSortIcon(state[columnsName][col], col) : ""}
            </TableCell>
          ))}
        {Object.keys(state[columnsName])
          .filter((col) => col === "sinceCreate")
          .map((col) => (
            <TableCell
              className={`sinceCreate ${state[columnsName][col].className ? state[columnsName][col].className : ""}`}
              key={state[columnsName][col].label}
            >
              <span className={classes.label}>{t(`${state[columnsName][col].label}`)}</span>
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
