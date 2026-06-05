//  General JS Library importation
import React from "react";
import moment from "moment"; //  Date / Time Related library
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DATETIME_FORMAT, DATE_FORMAT } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)

const useStyles = makeStyles((theme) => ({
  listContainer: {
    // background: theme.palette.background.content[2],
    borderRadius: theme.spacing(0.5),
    color: theme.palette.text[4],
    width: `100%`,
    overflowX: `auto`,
    marginBottom: theme.spacing(2),
  },
  listHeader: {
    marginTop: theme.spacing(2.75),
    color: theme.palette.text[2],
    fontWeight: 700,
    fontSize: `0.875rem`,
    lineHeight: 1.2,
    letterSpacing: 0,
    padding: 0,
    "& th": {
      fontSize: `0.75rem`,
      fontWeight: 700,
      color: theme.palette.text[2],
      padding: theme.spacing(1.5),
      cursor: `pointer`,
      "&.field_5": {
        width: `5%`,
        minWidth: 50,
        maxWidth: 50,
      },
      "&.field_10": {
        width: `10%`,
        minWidth: 100,
        maxWidth: 100,
      },
      "&.field_15": {
        width: `15%`,
        minWidth: 150,
        maxWidth: 150,
      },
      "&.field_18": {
        width: `18%`,
        minWidth: 180,
        maxWidth: 180,
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
  tableRow: {
    maxWidth: `100%`,
    borderBottom: `1px solid ${theme.palette.line[3]}`,
    fontSize: `0.875rem`,
    "&:last-child": {
      borderBottom: 0,
    },
    "& td": {
      borderBottom: 0,
      padding: theme.spacing(1.5),
      color: theme.palette.text[2],
      fontSize: "0.82rem",
      wordBreak: "break-all",
    },
    "& .delegator": {
      margin: 0,
    },
    "& .user": {
      margin: theme.spacing(0.2),
    },
  },
  noResult: {
    fontSize: `0.82rem`,
    textAlign: `center`,
  },
}));

const DataTable = ({ inputField, listColumns }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { value: arrayList, name } = inputField;
  const dateColumn = Object.keys(listColumns).filter((item) => item.includes("Date"))[0];

  let sortingByDateArrList = [];
  if (arrayList.length > 0) {
    sortingByDateArrList =
      name === "stkBorrowBookings" || name === "stkReturnBookings"
        ? arrayList.sort((a, b) => a.id - b.id)
        : arrayList.sort((a, b) => new Date(b[dateColumn]).getTime() - new Date(a[dateColumn]).getTime());
  }

  const formatterCol = (row, col) => {
    if (row[col]) {
      if (row[col] === true) {
        return "Yes";
      } else {
        if (col === "userName") {
          // return row.releasedByUserName ? row.releasedByUserName : row[col];
          return (
            <div>
              <p className="user">
                <span>{row.releasedByUserName ? row.releasedByUserName : row[col]}</span>
              </p>
              {row.delegators && row.delegators.length > 0 ? (
                <p className="delegator">
                  <span>
                    ({`${t(`commons.delegatorInfo`)}`}
                    {row.delegators.map((delegatorItem, delegatorIndex) => {
                      let str = "";
                      if (row.delegators.length === 1 || delegatorIndex === row.delegators.length - 1) {
                        str = `${str} ${delegatorItem.username}`;
                      } else {
                        str = `${str} ${delegatorItem.username}, `;
                      }
                      return str;
                    })}
                    )
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
          );
        }
        return col === "createdDatetime"
          ? `${moment(row[col]).format(DATETIME_FORMAT)}`
          : col === "borwValDate" || col === "borwDate" || col === "retnValDate"
          ? `${moment(row[col]).format(DATE_FORMAT)}`
          : col === "sblFeeRate" || col === "htiFeeRate" || col === "minIntrstAmt"
          ? `${row[col].toFixed(4).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}`
          : col === "borwQuantity" || col === "retnQuantity"
          ? `${row[col].toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}`
          : row[col];
      }
    } else if (row[col] === false) {
      return "No";
    } else {
      return "----";
    }
  };

  return (
    <div className={classes.listContainer}>
      <Table className={classes.table}>
        <TableHead className={classes.listHeader}>
          <TableRow>
            {Object.keys(listColumns).map((col) => (
              <TableCell
                className={`clickable ${listColumns[col].className ? listColumns[col].className : ""}`}
                key={listColumns[col].label}
              >
                {listColumns[col].label ? t(`${listColumns[col].label}`) : ``}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {sortingByDateArrList?.length > 0 &&
            sortingByDateArrList?.map((row) => (
              <TableRow className={classes.tableRow} key={row?.id}>
                {Object.keys(listColumns).map((col) => (
                  <TableCell key={`${row[col]}_${col}`}>{formatterCol(row, col)}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

DataTable.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.any).isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
};

export default DataTable;
