//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, TablePagination } from "@mui/material";
import useList from "core/store/hooks/useList";
import PaginationActions from "components/PaginationActions";

const useStyles = makeStyles((theme) => ({
  listFooter: {
    maxWidth: `100%`,
    overflow: `hidden`,
    display: `flex`,
    padding: `${theme.spacing(0.5)} 0`,
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(0.5)} 0`,
      "& .MuiTablePagination-toolbar": {
        paddingLeft: 0,
      },
      "& .MuiTablePagination-caption": {
        display: `none`,
      },
    },
  },
  listFooterText: {
    color: theme.palette.text[2],
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 2,
    display: "flex",
    alignItems: "center",
  },
  listFooterSelectItem: {
    backgroundColor: `${theme.palette.background.content[2]} !important`,
  },
  listFooterSelectIcon: {
    color: `${theme.palette.icon[4]} !important`,
  },
}));

const TableListFooter = ({ hooks }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const state = hooks?.state;
  const { totalCount, pageIndex, pageSize } = state;
  const { handleChangePage, handleChangeRowsPerPage } = useList(hooks);

  return (
    <Grid container item lg={12} className={classes.listFooter} justifyContent="space-between">
      <div className={classes.listFooterText}>
        {t("commons.totalRows")}: {` ${numeral(totalCount).format("0,0")} `}
      </div>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { "aria-label": "Rows:" },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={PaginationActions}
        className={classes.listFooterText}
        classes={{ menuItem: "listFooterSelectItem", selectIcon: "listFooterSelectIcon" }}
      />
    </Grid>
  );
};

export default TableListFooter;

TableListFooter.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired,
      pageIndex: PropTypes.number.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
