//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Div, CircularProgress } from "@mui/material";
import noResult from "assets/img/organization_noResult.png";
import SearchDateFilters from "../SearchDateFilters";
import DivListHeader from "./Header";
import DivListBody from "./Body";
import DivListFooter from "./Footer";

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
  table: {
    minWidth: `100%`,
    margin: `0 auto`,
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
    width: `auto`,
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
}));

const DivListContainer = ({
  hooks,
  className,
  title,
  columnsName,
  resultName,
  linkNameField,
  showFooter,
  showDateFilter,
  ...props
}) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const state = hooks?.state;
  const { isLoading, totalCount, pageSorts, pageIndex, pageSize, sortOrder } = state;

  console.log({
    hooks,
    className,
    title,
    columnsName,
    resultName,
    linkNameField,
    showFooter,
    showDateFilter,
    ...props,
  });

  return (
    <Grid container item className={`${classes.listContainer} ${className}`}>
      {isLoading && (
        <Grid container item lg={12} sm={12} xs={12} className={classes.loadingDiv}>
          <CircularProgress />
        </Grid>
      )}
      {showDateFilter ? (
        <div className={classes.filterContainer}>
          {title && <h4 className={classes.searchTitle}>{title}</h4>}
          <SearchDateFilters />
        </div>
      ) : (
        title && <h4 className={classes.searchTitle}>{title}</h4>
      )}
      {!isLoading && state[resultName].length > 0 ? (
        <Grid container item lg={12} md={12} sm={12}>
          <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.tableContainer}>
            <div className={classes.table}>
              <DivListHeader hooks={hooks} columnsName={columnsName} pageSorts={pageSorts} sortOrder={sortOrder} />
              <DivListBody
                hooks={hooks}
                resultName={resultName}
                columnsName={columnsName}
                linkNameField={linkNameField}
                {...props}
              />
            </div>
          </Grid>
          {totalCount > 5 && showFooter && (
            <DivListFooter hooks={hooks} totalCount={totalCount} pageSize={pageSize} pageIndex={pageIndex} />
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

export default DivListContainer;

DivListContainer.propTypes = {
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
  columnsName: PropTypes.string.isRequired,
  resultName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showFooter: PropTypes.bool.isRequired,
};
