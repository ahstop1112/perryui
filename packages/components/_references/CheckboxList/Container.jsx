import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Table, CircularProgress } from "@mui/material";
import noResult from "assets/img/organization_noResult.png";
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
import SearchDateFilters from "../SearchDateFilters";
import ClaimFilters from "../ClaimFilters";
import BulkAssign from "../BulkAssign";
import TableListHeader from "./Header";
import TableListBody from "./Body";
import TableListFooter from "./Footer";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    // boxShadow: theme.palette.shadow[1],
    // background: theme.palette.background.content[2],
    // borderRadius: theme.spacing(0.5),
    display: "flex",
    flexWrap: "wrap",
    alignItems: `center`,
    width: "100%",
    maxWidth: `100%`,
    minHeight: `100%`,
    padding: theme.spacing(2.5),
    paddingTop: 0,
    margin: 0,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text[4],
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      paddingTop: 0,
    },
  },
  noResultTable: {
    justifyContent: `center`,
    alignItems: `center`,
    alignContent: `center`,
    minHeight: `50vh`,
    [theme.breakpoints.down("sm")]: {
      minHeight: 0,
    },
    "& span": {
      color: theme.palette.text[4],
      fontSize: `1.2em`,
      width: `100%`,
      textAlign: `center`,
    },
  },
  noResult: {
    margin: `0 auto`,
  },
  bulkActions: {
    display: `flex`,
    justifyContent: `flex-end`,
    alignItems: `flex-end`,
    // border: `1px solid red`,
    flex: `0 0 auto`,
    "& button": {
      whiteSpace: "nowrap",
      textAlign: `center`,
      width: `auto`,
      margin: 0,
      marginBottom: 14,
      paddingTop: 4,
      paddingBottom: 4,
      textTransform: `initial !important`,
    },
  },
  table: {
    marginBottom: "0",
    background: theme.palette.background[1],
    fontSize: "0.875rem",
  },
  tableSearch: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingTable: {
    justifyContent: `center`,
    alignItems: `center`,
    alignContent: `center`,
    "& .MuiCircularProgress-root": {
      position: `absolute`,
      marginTop: 150,
    },
  },
  tableContainer: {
    display: `flex`,
    width: `auto`,
    overflowX: "auto",
    paddingTop: theme.spacing(1),
  },
  lastUpdated: {
    fontSize: "0.875em",
    color: theme.palette.text[4],
    marginBottom: theme.spacing(2),
    justifyContent: `flex-end`,
    [theme.breakpoints.down("sm")]: {
      justifyContent: `flex-start`,
      marginBottom: theme.spacing(2),
    },
  },
  filterContainer: {
    width: `100%`,
    justifyContent: `space-between`,
    alignItems: `flex-end`,
    display: `flex`,
    flexWrap: `nowrap`,
    paddingLeft: theme.spacing(1),
  },
  searchTitle: {
    fontSize: "1.3em",
    lineHeight: 1.2,
    color: theme.palette.text[2],
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2em",
      justifyContent: `flex-start`,
      margin: 0,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      justifyContent: `flex-start`,
      paddingBottom: theme.spacing(1),
    },
  },
  tabsContainer: {
    width: `100%`,
    alignItems: `flex-end`,
    display: `flex`,
    flexWrap: `nowrap`,
  },
  tab: {
    justifyContent: `center`,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
    paddingBottom: 0,
    fontSize: `1.5rem`,
    fontWeight: 500,
    lineHeight: 2,
    color: theme.palette.text[2],
    fontFamily: `"Avenir-Heavy","Helvetica Neue",Arial,sans-serif;`,
    borderBottom: `2px solid ${theme.palette.line[4]}`,
    cursor: `pointer`,
    "&.active": {
      borderBottom: `2px solid ${theme.palette.line[5]}`,
      color: theme.palette.text[1],
    },
  },
}));

const CheckboxListContainer = ({
  hooks,
  className,
  title,
  columnsName = "listColumns",
  showFooter,
  showTabs,
  showDateFilter,
  showClaimFilter,
  showBulkAssign,
  processStatus,
}) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const { state, dispatch } = hooks;
  const [selected, setSelected] = useState([]);
  const { handleLink } = useForm(); //  Get Dynamic Form related functions from useForm
  const [searchParams] = useSearchParams(); //  Used to read and modify the query string in the URL
  const assigned = searchParams.get("assigned") ? searchParams.get("assigned") : `true`;
  const { searchResult, isLoading, pageSorts, pageIndex, pageSize, sortOrder, totalCount, tabsArr } = state;

  const onCheckboxChange = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
    dispatch({ type: "UPDATE_SELECTED_CHECKBOXES", selected: newSelected });
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = searchResult.map((n) => n?.id);
      setSelected(newSelecteds);
      dispatch({ type: "UPDATE_SELECTED_CHECKBOXES", selected: newSelecteds });
      return;
    } else {
      dispatch({ type: "UPDATE_SELECTED_CHECKBOXES", selected: [] });
    }
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Grid container item className={`${classes.listContainer} ${className}`}>
      {isLoading && (
        <Grid container item lg={12} sm={12} xs={12} className={classes.loadingTable}>
          <CircularProgress />
        </Grid>
      )}
      {showTabs && tabsArr.length > 0 && (
        <div className={classes.tabsContainer}>
          {tabsArr.map((item, index) => (
            <div
              key={item?.label}
              className={`${classes.tab} ${
                window.location.href.includes(item.link) || item?.link.includes(processStatus) ? `active` : ``
              }`}
              onClick={() => handleLink(item?.link)}
            >
              {t(`${item?.label}`)}
            </div>
          ))}
        </div>
      )}
      {showDateFilter ? (
        <div className={classes.filterContainer}>
          {title && <h4 className={classes.searchTitle}>{title}</h4>}
          <SearchDateFilters />
        </div>
      ) : null}
      <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.filterContainer}>
        {!showDateFilter && title && <h4 className={classes.searchTitle}>{title}</h4>}
        {showClaimFilter || showBulkAssign ? (
          <div className={classes.bulkActions}>
            {showClaimFilter && <ClaimFilters hooks={hooks} />}
            {showBulkAssign && <BulkAssign hooks={hooks} />}
          </div>
        ) : null}
      </Grid>
      {!isLoading && searchResult.length > 0 ? (
        <Grid container item lg={12} md={12} sm={12}>
          <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableListHeader
                hooks={hooks}
                columnsName={columnsName}
                pageSorts={pageSorts}
                sortOrder={sortOrder}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableListBody
                hooks={hooks}
                columnsName={columnsName}
                onCheckboxChange={onCheckboxChange}
                isSelected={isSelected}
              />
            </Table>
          </Grid>
          {totalCount > 5 && showFooter && (
            <TableListFooter hooks={hooks} totalCount={totalCount} pageSize={pageSize} pageIndex={pageIndex} />
          )}
        </Grid>
      ) : (
        <Grid container item lg={12} sm={12} xs={12} className={classes.noResultTable}>
          <img className={classes.noResult} src={noResult} alt="no result" />
          <br />
          <span>{t("commons.noResult")}</span>
        </Grid>
      )}
    </Grid>
  );
};

export default CheckboxListContainer;

CheckboxListContainer.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      pageSorts: PropTypes.string.isRequired,
      sortOrder: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired,
      pageIndex: PropTypes.number.isRequired,
      isLoading: PropTypes.bool.isRequired,
      searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showFooter: PropTypes.bool.isRequired,
};
