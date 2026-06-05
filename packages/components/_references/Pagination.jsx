//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Button } from "@mui/material";
import { DEFAULT_PAGE_SIZE } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)

const useStyles = makeStyles((theme) => ({
  Pagination: {
    display: "flex",
    listStyle: "none",
    color: theme.palette.text[2],
  },
  pageItem: {
    color: theme.palette.text[2],
  },
  clickable: {
    display: "flex",
    // justifyContent: 'space-between'
  },
  totalRow: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    fontSize: "1em",
    color: theme.palette.text[2],
  },
  active: {
    color: theme.palette.text[2],
  },
}));

const Pagination = ({ totalCount, maxPages, currentPage, onPageChange, onPageMoveLeft, onPageMoveRight }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE);
  if (totalPages === 1 || !totalPages) return null;

  const checkPage = Math.ceil(maxPages / 2);

  const calcStartPage = (curPage) => {
    let startPage = 0;

    if (curPage < Math.ceil(maxPages / 2)) {
      startPage = 0;
    } else {
      startPage = curPage - Math.ceil(maxPages / 2) + 1;
    }
    return startPage;
  };

  const calcEndPage = (curPage) => {
    let endPage = 0;
    const checkEndPage = totalPages - Math.ceil(maxPages / 2);

    if (totalPages > maxPages && curPage < checkEndPage) {
      if (curPage < Math.ceil(maxPages / 2)) {
        endPage = maxPages - 1;
      } else {
        endPage = curPage + Math.ceil(maxPages / 2);
      }
    } else {
      endPage = totalPages;
    }

    return endPage;
  };

  const startPage = calcStartPage(currentPage);
  const endPage = calcEndPage(currentPage);
  const pages = _.range(startPage, endPage);

  return (
    <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.paginationContainer}>
      <Grid container item lg={8} md={8} sm={4} xs={3}>
        <span className={classes.totalRow}>{`${t("commons.totalRows")}:${DEFAULT_PAGE_SIZE}`}</span>
      </Grid>
      <Grid container item lg={4} md={4} sm={8} xs={9}>
        <ul className={classes.Pagination}>
          {`${t("commons.rowsPerPage")}:`}
          {currentPage > checkPage && (
            <li className="page-item">
              <Button className="page-link" onClick={onPageMoveLeft} aria-label={t("commons.previous")}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">{t("commons.previous")}</span>
              </Button>
            </li>
          )}
          {pages.map((page) => (
            <li key={page + 1} className={`${page === currentPage ? classes.active : ``} ${classes.pageItem}`}>
              <Button className="page-link" onClick={() => onPageChange(startPage, page, endPage)}>
                {page + 1}
              </Button>
            </li>
          ))}
          {currentPage < totalPages - maxPages && (
            <li className={classes.pageItem}>
              <Button className="page-link">...</Button>
            </li>
          )}
          {currentPage < totalPages - checkPage && totalPages > maxPages && (
            <li className="page-item">
              <Button className="page-link" onClick={() => onPageChange(startPage, totalPages - 1, endPage)}>
                {totalPages}
              </Button>
            </li>
          )}
          {currentPage < totalPages - checkPage && totalPages > maxPages && (
            <li className="page-item">
              <Button className="page-link" aria-label="Next" onClick={onPageMoveRight}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">{t("commons.next")}</span>
              </Button>
            </li>
          )}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageMoveLeft: PropTypes.func.isRequired,
  onPageMoveRight: PropTypes.func.isRequired,
};
