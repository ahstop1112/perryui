import React, { useState } from "react";
import moment from "moment"; //  Date / Time Related library
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import makeStyles from "@mui/styles/makeStyles";
import { Table, TableRow, TableCell, Checkbox, FormControlLabel } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import useAuth from "core/store/hooks/useAuth"; //  Getting the authentication data or functions from useAuth
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
import { DATETIME_FORMAT } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)
import { isObject, calcSinceCreate } from "utility/index"; //  Getting the re-useable functions from utility/index

const useStyles = makeStyles((theme) => ({
  tableRow: {
    borderBottom: `1px solid ${theme.palette.line[2]}`,
    "&:nth-child(even)": {
      backgroundColor: theme.palette.background.disabled,
    },
    "& td": {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: theme.palette.text[3],
      fontSize: `0.75rem`,
      "&.field_2": {
        width: `2%`,
      },
      "&.field_5": {
        width: `5%`,
      },
      "&.field_10": {
        width: `12%`,
      },
      "&.field_15": {
        width: `15%`,
      },
      "&.field_20": {
        width: `20%`,
      },
      "& table": {
        padding: 0,
      },
      "& .dot": {
        width: theme.spacing(1.75),
        height: theme.spacing(1.75),
        borderRadius: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      "& .status": {
        color: theme.palette.text[2],
        textTransform: `capitalize`,
        display: `flex`,
        alignItems: `center`,
      },
      "& span.current": {
        color: theme.palette.text[13],
      },
      "& div.PROCESSING": {
        "& .dot": {
          backgroundColor: theme.palette.text[13],
        },
      },
      "& div.NORMAL": {
        "& .dot": {
          backgroundColor: theme.palette.text[13],
        },
      },
      "& div.PENDING": {
        "& .dot": {
          backgroundColor: theme.palette.text[13],
        },
      },
      "& div.ACTIVE": {
        "& .dot": {
          backgroundColor: theme.palette.price.up,
        },
      },
      "& div.COMPLETED": {
        "& .dot": {
          backgroundColor: theme.palette.price.up,
        },
      },
      "& div.CANCELLED": {
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.DELETED": {
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.REJECTED": {
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.EXPIRED": {
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.DRAFT": {
        "& .dot": {
          backgroundColor: theme.palette.text[16],
        },
      },
      "& div.RETURNED": {
        "& .dot": {
          border: `2px solid ${theme.palette.text[13]}`,
        },
      },
      "& div.TERMINATED": {
        textTransform: `capitalize`,
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.LOCKED": {
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.ISSUE": {
        "& .dot": {
          backgroundColor: theme.palette.price.down,
        },
      },
      "& div.green": {
        // color: theme.palette.price.up,
        display: `flex`,
        alignItems: `center`,
        "& .dot": {
          width: theme.spacing(1.75),
          height: theme.spacing(1.75),
          backgroundColor: theme.palette.price.up,
          borderRadius: theme.spacing(1),
          marginRight: theme.spacing(1),
        },
      },
      "& div.yellow": {
        // color: theme.palette.price.up,
        display: `flex`,
        alignItems: `center`,
        "& .dot": {
          width: theme.spacing(1.75),
          height: theme.spacing(1.75),
          backgroundColor: theme.palette.text[16],
          borderRadius: theme.spacing(1),
          marginRight: theme.spacing(1),
        },
      },
      "& div.red": {
        // color: theme.palette.price.up,
        display: `flex`,
        alignItems: `center`,
        "& .dot": {
          width: theme.spacing(1.75),
          height: theme.spacing(1.75),
          backgroundColor: theme.palette.price.down,
          borderRadius: theme.spacing(1),
          marginRight: theme.spacing(1),
        },
      },
      "& span.COMPLETED": {
        color: theme.palette.price.up,
      },
      "& span.REJECTED": {
        color: theme.palette.price.down,
      },
    },
    "& .MuiCollapse-root": {
      flex: `0 0 100%`,
    },
    "& . MuiCollapse-entered": {
      width: `100%`,
      // border: '1px solid blue',
    },
    "&:last-child": {
      borderBottom: `none`,
    },
    ".MuiCheckbox-colorSecondary.Mui-checked": {
      color: theme.palette.text[9],
    },
    // display: `none`
  },
  tableRowCategory: {
    "&:nth-child(even)": {
      backgroundColor: "transparent",
    },
    "& td": {
      color: theme.palette.text[2],
    },
  },
  rowCategoryName: {
    fontWeight: 900,
  },
  subTableCell: {
    // border: `1px solid red`,
    paddingTop: `0 !important`,
    paddingBottom: `0 !important`,
    "&td": {
      borderBottom: `none`,
    },
  },
  category: {
    padding: `${theme.spacing(0.5)} 0`,
    fontSize: `0.82rem`,
    whiteSpace: `nowrap`,
    "&.GO": {
      color: theme.palette.text[13],
    },
    "&.FI": {
      color: theme.palette.text[11],
    },
    "&.DEMO": {
      color: theme.palette.text[11],
    },
    "&.TBI": {
      color: theme.palette.text[13],
    },
    "&.CAI": {
      color: theme.palette.text[16],
    },
  },
  tableCollaspeRow: {
    flex: `0 0 100%`,
    maxWidth: `100%`,
    display: `block`,
    flexWrap: `wrap`,
    padding: theme.spacing(1),
    margin: 0,
    marginBottom: theme.spacing(1),
    "& > div": {
      display: `flex`,
      alignItems: `flex-start`,
      padding: theme.spacing(1),
      paddingTop: 0,
      paddingBottom: 0,
      color: theme.palette.text[3],
      borderTop: `none`,
      "&:last-child": {
        borderBottom: 0,
      },
    },
    "& .MuiCollapse-root": {
      flex: `0 0 100%`,
    },
    "& .MuiCollapse-wrapper": {
      width: `100%`,
    },
  },
  up: {
    color: theme.palette.price.up,
  },
  down: {
    color: theme.palette.price.down,
  },
  green: {
    // color: theme.palette.price.up,
    display: `flex`,
    alignItems: `center`,
    "& .dot": {
      width: theme.spacing(1.75),
      height: theme.spacing(1.75),
      backgroundColor: theme.palette.price.up,
      borderRadius: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  yellow: {
    // color: theme.palette.price.up,
    display: `flex`,
    alignItems: `center`,
    "& .dot": {
      width: theme.spacing(1.75),
      height: theme.spacing(1.75),
      backgroundColor: theme.palette.text[16],
      borderRadius: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  red: {
    // color: theme.palette.price.up,
    display: `flex`,
    alignItems: `center`,
    "& .dot": {
      width: theme.spacing(1.75),
      height: theme.spacing(1.75),
      backgroundColor: theme.palette.price.down,
      borderRadius: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  link: {
    textDecoration: "none",
  },
  dateTime: {
    whiteSpace: `break-spaces`,
    maxWidth: 100,
  },
  actions: {
    fontSize: `1.2rem`,
    cursor: `pointer`,
    alignItems: `center`,
    backgroundColor: theme.palette.text[19],
    color: theme.palette.text[5],
    // padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    width: 18,
    height: 18,
    marginTop: theme.spacing(0.5),
  },
  favorite: {
    fontSize: `1.2rem`,
    cursor: `pointer`,
    alignItems: `center`,
    color: theme.palette.text[14],
    // padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    width: 24,
    height: 24,
    marginTop: theme.spacing(0.5),
  },
  btn: {
    color: theme.palette.text[5],
    boxShadow: `none`,
    borderRadius: theme.spacing(0.5),
    alignItems: "flex-end",
    flex: "0 0 20%",
    fontSize: `0.875em`,
    height: `auto`,
    zIndex: 2,
    minWidth: theme.spacing(7),
    background: theme.palette.button[1],
    "&:hover": {
      backgroundColor: theme.palette.button[2],
      color: theme.palette.text[5],
    },
    [theme.breakpoints.down("md")]: {
      // position:"fixed",
      // right:theme.spacing(1),
      // marginRight: theme.spacing(10)
    },
  },
  link2: {
    color: theme.palette.text[13],
    cursor: `pointer`,
  },
  subTable: {},
  tableSubRow: {
    fontSize: `0.75rem`,
    borderBottom: `1px solid #efefef`,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  radioGroup: {
    // padding: theme.spacing(1),
    paddingLeft: 0,
    "& label": {
      paddingRight: theme.spacing(1.5),
      "& .MuiTypography-root": {
        fontSize: `0.875em`,
      },
      "& .MuiCheckbox-colorSecondary.Mui-checked": {
        color: theme.palette.text[1],
      },
      "& .Mui-disabled": {
        color: theme.palette.text[3],
      },
      "& span.Mui-disabled": {
        color: `${theme.palette.text[3]} !important`,
      },
    },
  },
  checkboxField: {
    fontSize: theme.spacing(2),
    position: `absolute`,
    "& svg": {
      color: theme.palette.text[13],
    },
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      color: theme.palette.text[14],
    },
  },
  delegationPara: {
    marginTop: theme.spacing(1),
    display: `flex`,
    "& .field_10": {
      flex: `0 0 50%`,
      "&:nth-child(2)": {
        paddingLeft: theme.spacing(1),
      },
    },
  },
}));

const TableListRow = ({ hooks, row, columns, rowSetting = false }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { userStorage } = useAuth();
  const { onCheckboxChange, handleLink, addToMyFavourite } = useForm(hooks);
  const checkboxesName = columns?.checkboxes?.checkboxesName;
  const matchCheckboxName = columns?.checkboxes?.matchCheckboxName;
  const checkboxLabel = columns?.checkboxes?.checkboxLabel;
  const checkboxMatching = (checkboxId) => row[matchCheckboxName].filter((item) => item === checkboxId).length > 0;
  const listSubColumns = hooks?.state?.listSubColumns;
  const processStartDate = moment(row?.processStartDatetime);
  const dateNow = moment();

  const checkStatusWithTime = (startDateTime, endDateTime) => {
    const now = moment();
    let status = "";
    if (now > moment(startDateTime) && now < moment(endDateTime)) {
      status = "ACTIVE";
    } else if (now > moment(endDateTime)) {
      status = "EXPIRED";
    } else if (now < moment(startDateTime)) {
      status = "PENDING";
    }
    return status;
  };

  return (
    <>
      <TableRow className={`${classes.tableRow} ${rowSetting ? classes.tableRowCategory : null}`}>
        {/* {columns?.details && Object.keys(columns?.details).length > 0 && (
          <div className={classes.checkboxField}>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        )} */}
        {Object.keys(columns)
          .filter((col) => col !== "details" && col !== "content")
          .map((col) => (
            <TableCell key={col} className={columns[col].className}>
              {isObject(row[col]) ? (
                <div className={classes.subTable}>
                  {row[col] && Object.keys(row[col]).length > 0 ? (
                    Object.keys(row[col]).map((item) => (
                      <div key={item} className={classes.tableSubRow}>
                        {Object.keys(row[col][item]).map((subItem) => (
                          <div key={subItem}>{`${subItem}: ${row[col][item][subItem]}`}</div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div>/</div>
                  )}
                </div>
              ) : col === "checkboxes" ? (
                row[checkboxesName] && (
                  <div className={classes.radioGroup}>
                    {row[checkboxesName].map((checkbox) => (
                      <FormControlLabel
                        key={checkbox.id}
                        control={
                          <Checkbox
                            className={classes.checkbox}
                            checked={checkboxMatching(checkbox.id)}
                            value={checkbox.name}
                            onChange={(e) => onCheckboxChange(e, matchCheckboxName)}
                            name={checkbox.name}
                          />
                        }
                        label={`${checkbox[checkboxLabel]} (${checkbox.id})`}
                      />
                    ))}
                  </div>
                )
              ) : col === "add" ? (
                <MoreHorizIcon className={classes.actions} onClick={() => handleLink(`${row.link ? row.link : ""}`)} />
              ) : col === "review" ? (
                <MoreHorizIcon className={classes.actions} onClick={() => handleLink(`${row.link ? row.link : ""}`)} />
              ) : col === "view" ? (
                <MoreHorizIcon
                  className={classes.actions}
                  onClick={() => handleLink(`${row.viewLink ? row.viewLink : ""}`)}
                />
              ) : col === "view2" ? (
                <MoreHorizIcon className={classes.actions} onClick={() => handleLink(`${row.link ? row.link : ""}`)} />
              ) : col === "edit" && window.location.href.includes("delegation") ? (
                <MoreHorizIcon
                  className={classes.actions}
                  onClick={() => handleLink(`${row.editLink ? row.editLink : ""}`)}
                />
              ) : col === "edit" ? (
                <MoreHorizIcon
                  className={classes.actions}
                  onClick={() => handleLink(`${row.editLink ? row.editLink : ""}`)}
                />
              ) : col === "edit2" ? (
                <MoreHorizIcon
                  className={classes.actions}
                  onClick={() => handleLink(`${row.editLink2 ? row.editLink2 : ""}`)}
                />
              ) : col === "favourite" ? (
                <StarOutlineIcon
                  className={classes.favorite}
                  onClick={() => addToMyFavourite(`${row.key ? row.key : ""}`)}
                />
              ) : col === "sinceCreate" ? (
                <div className={calcSinceCreate(processStartDate)?.colorCode}>
                  <div className="dot" />
                  {calcSinceCreate(processStartDate)?.calcDate} days
                </div>
              ) : col.includes("Datetime") ? (
                <div className={classes.dateTime}>{moment(row[col]).format(DATETIME_FORMAT)}</div>
              ) : col === "assignee" ? (
                <span className={row[col] === userStorage?.loginId && `current`}>{row[col]}</span>
              ) : typeof row[col] === "number" && !col.includes("Id") && !col.includes("id") ? (
                numeral(row[col]).format("0,0.00")
              ) : col.includes("status") && window.location.href.includes("delegation") ? (
                <div className={`status ${checkStatusWithTime(row?.startDatetime, row?.endDatetime)}`}>
                  <div className="dot" />
                  {checkStatusWithTime(row?.startDatetime, row?.endDatetime)}
                </div>
              ) : col.includes("status") || col.includes("Status") ? (
                <div className={`status ${row[col]}`}>
                  <div className="dot" />
                  {t(`commons.${row[col]}`)}
                </div>
              ) : col === "categoryName1" ? (
                <span className={`${classes.category} ${row.categoryCode1}`}>{row[col]}</span>
              ) : col === "name" && rowSetting ? (
                <div className={classes.rowCategoryName}>{row[col].toString()}</div>
              ) : row[col] !== undefined ? (
                columns[col].link ? (
                  <div
                    className={classes.link2}
                    onClick={() => handleLink(`${columns[col].link ? columns[col].link : ""}${row.id}`)}
                  >
                    {row[col].toString()}
                  </div>
                ) : (
                  <div>{row[col].toString()}</div>
                )
              ) : (
                <></>
              )}
            </TableCell>
          ))}
        {row?.details && window.location.href.includes("/delegation/") && (
          <TableCell colSpan={Object.keys(listSubColumns).length} className={classes.subTableCell}>
            {Object.keys(row)
              .filter((col) => (col === "details" || col === "content") && row[col].length)
              .map((col) => (
                <React.Fragment key={col}>
                  {row[col].map((subRow, subIndex) => (
                    <div key={subIndex} className={`${classes.delegationPara}`}>
                      {Object.keys(subRow).length > 0 &&
                        Object.keys(subRow)
                          .filter((col) => Object.keys(listSubColumns).includes(col))
                          .map((col, index) => (
                            <div key={listSubColumns[col].label} className={listSubColumns[col].className}>
                              {col.includes("Date") ? moment(row[col]).format(DATETIME_FORMAT) : subRow[col]}
                            </div>
                          ))}
                    </div>
                  ))}
                </React.Fragment>
              ))}
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

TableListRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableListRow;
