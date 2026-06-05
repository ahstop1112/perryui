//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useList from "core/store/hooks/useList";

const useStyles = makeStyles((theme) => ({
  listHeader: {
    marginTop: theme.spacing(1),
    color: theme.palette.text[2],
    letterSpacing: 0,
    padding: 0,
    display: `flex`,
    flexWrap: `noWrap`,
    flex: `0 0 100%`,
    justifyContent: `space-between`,
    borderBottom: `1px solid rgba(224, 224, 224, 1)`,
    "& >div": {
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      color: theme.palette.text[3],
      fontSize: `0.75rem`,
      fontWeight: 700,
      cursor: `pointer`,
      display: `flex`,
      alignItems: `flex-end`,

      // '&.field_2': {
      //   flex: `0 0 2%`,
      //   minWidth: 40,
      //   maxWidth: 50,
      //   [theme.breakpoints.down('md')]: {
      //     minWidth: 40,
      //   },
      // },
      // '&.field_5': {
      //   width: `5%`,
      //   minWidth: 60,
      //   maxWidth: 80,
      //   [theme.breakpoints.down('md')]: {
      //     minWidth: 80,
      //   },
      // },
      // '&.field_10': {
      //   width: `10%`,
      //   minWidth: 100,
      //   maxWidth: 100,
      // },
      // '&.field_15': {
      //   width: `15%`,
      //   minWidth: 150,
      //   maxWidth: 150,
      // },
      // '&.field_18': {
      //   width: `18%`,
      //   minWidth: 180,
      //   maxWidth: 180,
      // },
      // '&.field_20': {
      //   width: `20%`,
      //   minWidth: 200,
      //   maxWidth: 200,
      // },
      // '&.field_25': {
      //   width: `25%`,
      //   minWidth: 250,
      //   maxWidth: 250,
      // },
      // '&.field_30': {
      //   width: `30%`,
      //   minWidth: 300,
      //   maxWidth: 300,
      // },
      // '&.field_35': {
      //   width: `35%`,
      //   minWidth: 350,
      //   maxWidth: 350,
      // },
      // '&.field_45': {
      //   width: `45%`,
      //   minWidth: 450,
      //   maxWidth: 450,
      // },
      // '&.field_75': {
      //   flex: `0 0 25%`,
      // },
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

const DivListHeader = ({ hooks, columnsName }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const state = hooks?.state;
  const { pageSorts, sortOrder, canSort } = state;
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
    <div className={classes.listHeader}>
      {Object.keys(state[columnsName]).length > 0 &&
        Object.keys(state[columnsName])
          .filter((col) => col !== "details")
          .map((col) => (
            <div
              aria-hidden="true"
              className={`clickable ${state[columnsName][col].className ? state[columnsName][col].className : ""}`}
              onClick={() => handleSort(col)}
              onKeyDown={() => handleSort(col)}
              key={state[columnsName][col].label}
            >
              <span className={classes.label}>{t(`${state[columnsName][col].label}`)}</span>
              {canSort ? renderSortIcon(state[columnsName][col], col) : null}
            </div>
          ))}
    </div>
  );
};

export default DivListHeader;

DivListHeader.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      pageSorts: PropTypes.string.isRequired,
      sortOrder: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  columnsName: PropTypes.string.isRequired,
};
