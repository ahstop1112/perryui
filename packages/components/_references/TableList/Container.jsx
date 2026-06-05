//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Table, CircularProgress } from "@mui/material";
import noResult from "assets/img/organization_noResult.png";
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
import SearchDateFilters from "../SearchDateFilters";
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
    padding: `${theme.spacing(2.5)} ${theme.spacing(5)}`,
    paddingTop: 0,
    margin: 0,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text[4],
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
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
  noResultTable: {
    justifyContent: `center`,
    alignItems: `center`,
    alignContent: `center`,
    minHeight: `30vh`,
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
  tableContainer: {
    display: `flex`,
    width: `100%`,
    overflowX: "auto",
    paddingTop: theme.spacing(1),
  },
  searchTitle: {
    fontSize: "1.3em",
    color: theme.palette.text[2],
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      justifyContent: `flex-start`,
      marginTop: theme.spacing(1),
    },
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

const TableListContainer = ({
  hooks,
  className,
  title,
  columnsName = "listColumns",
  resultName = "",
  subResultName = "",
  linkNameField,
  showFooter,
  showDateFilter,
  showTabs,
  tabsArr = [],
  searchDateFilters = [],
  ...props
}) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const { handleLink } = useForm(); //  Get Dynamic Form related functions from useForm
  const state = hooks?.state;
  const { isLoading, totalCount, pageSorts, pageIndex, pageSize, sortOrder } = state;

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
              className={`${classes.tab} ${window.location.href.includes(item.link) ? `active` : ``}`}
              onClick={() => handleLink(item?.link)}
            >
              {t(`${item?.label}`)}
            </div>
          ))}
        </div>
      )}
      {showDateFilter && title ? (
        <div className={classes.filterContainer}>
          {title && <h4 className={classes.searchTitle}>{title}</h4>}
          <SearchDateFilters filters={searchDateFilters} />
        </div>
      ) : (
        title && <h4 className={classes.searchTitle}>{title}</h4>
      )}
      {!isLoading &&
      Object.keys(state[resultName]).length > 0 &&
      subResultName &&
      state[resultName][subResultName]?.length > 0 ? (
        <Grid container item lg={12} md={12} sm={12}>
          <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.tableContainer}>
            <Table className={classes.table}>
              {columnsName && (
                <TableListHeader hooks={hooks} columnsName={columnsName} pageSorts={pageSorts} sortOrder={sortOrder} />
              )}
              {resultName && (
                <TableListBody
                  hooks={hooks}
                  resultName={resultName}
                  subResultName={subResultName}
                  subSubResultName="processDefinitions"
                  columnsName={columnsName}
                  linkNameField={linkNameField}
                  {...props}
                />
              )}
            </Table>
          </Grid>
          {totalCount > 5 && showFooter && (
            <TableListFooter hooks={hooks} totalCount={totalCount} pageSize={pageSize} pageIndex={pageIndex} />
          )}
        </Grid>
      ) : !isLoading && state[resultName].length > 0 ? (
        <Grid container item lg={12} md={12} sm={12}>
          <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.tableContainer}>
            <Table className={classes.table}>
              {columnsName && (
                <TableListHeader hooks={hooks} columnsName={columnsName} pageSorts={pageSorts} sortOrder={sortOrder} />
              )}
              {resultName && (
                <TableListBody
                  hooks={hooks}
                  resultName={resultName}
                  columnsName={columnsName}
                  linkNameField={linkNameField}
                  {...props}
                />
              )}
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

export default TableListContainer;

TableListContainer.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      pageSorts: PropTypes.string.isRequired,
      sortOrder: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired,
      pageIndex: PropTypes.number.isRequired,
      isLoading: PropTypes.bool.isRequired,
      searchResult: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  resultName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
