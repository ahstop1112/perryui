//  General JS Library importation
import React, { useState } from "react";
import moment from "moment"; //  Date / Time Related library
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import makeStyles from "@mui/styles/makeStyles";
import { Table, TableBody, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//  Getting the Common Hooks from core/store/hooks
import useAuth from "core/store/hooks/useAuth"; //  Getting the authentication data or functions from useAuth
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
//  Utility
import { isObject } from "utility/index"; //  Getting the re-useable functions from utility/index
import { DATETIME_FORMAT } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)
//  Child Page Components
import SubHeader from "./SubHeader";
import SubRow from "./SubRow";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    position: `relative`,
    flex: `0 0 100%`,
    maxWidth: `100%`,
    display: `flex`,
    flexWrap: `nowrap`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text[4],
    "&:last-child": {
      borderBottom: 0,
    },
    "& > div": {
      display: `flex`,
      alignItems: `center`,
      fontFamily: `Avenir-Medium`,
      color: theme.palette.text[4],
      lineHeight: 1.5,
      cursor: `pointer`,
      padding: theme.spacing(1.5),
      borderBottom: `1px solid ${theme.palette.line[3]}`,
      "&.field_5": {
        flex: `0 0 5%`,
      },
      "&.field_15": {
        flex: `0 0 15%`,
      },
      "&.field_18": {
        flex: `0 0 18%`,
      },
      "&.field_20": {
        flex: `0 0 20%`,
      },
      "&.field_25": {
        flex: `0 0 25%`,
      },
      "&.field_30": {
        flex: `0 0 30%`,
      },
      "&.field_35": {
        flex: `0 0 35%`,
      },
      "&.field_45": {
        flex: `0 0 40%`,
      },
      "&.field_75": {
        flex: `0 0 25%`,
      },
    },
    "& .MuiCollapse-root": {
      flex: `0 0 100%`,
    },
    "& .MuiCollapse-wrapper": {
      width: `100%`,
    },
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
  tableCollaspeRow: {
    flex: `0 0 100%`,
    maxWidth: `100%`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.content[4],
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
  link: {
    textDecoration: "none",
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
  subTable: {},
  tableSubBody: {
    maxWidth: `100%`,
  },
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
    },
  },
  checkboxField: {
    flex: `0 0 1%`,
    fontSize: theme.spacing(2),
    padding: `0 !important`,
    marginTop: 5,
    // marginLeft: `-2%`,
    border: `0 !important`,
    "& svg": {
      color: theme.palette.icon[2],
    },
  },
}));

const DivListRow = ({ hooks, row, columns }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const { userStorage } = useAuth();
  const { handleLink } = useForm(hooks);
  const state = hooks?.state;
  const { listSubColumns = {} } = state;
  const [open, setOpen] = useState(true);

  console.log(row);

  return (
    <>
      <div className={classes.tableRow}>
        {row.details && row.details.length > 0 && (
          <div className={classes.checkboxField}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        )}
        {Object.keys(columns)
          .filter((col) => col !== "details")
          .map((col) => (
            <div key={columns[col].id} className={columns[col].className}>
              {isObject(row[col]) ? (
                <div className={classes.subTable}>
                  {row[col] && Object.keys(row[col]).length > 0 ? (
                    Object.keys(row[col]).map((item) => (
                      <div key={row[col][item].id} className={classes.tableSubRow}>
                        {Object.keys(row[col][item]).map((subItem) => (
                          <div key={row[col][item][subItem].id}>{`${subItem}: ${row[col][item][subItem]}`}</div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div>/</div>
                  )}
                </div>
              ) : col === "view" ? (
                <MoreHorizIcon
                  className={classes.actions}
                  onClick={() => handleLink(`${row.viewLink ? row.viewLink : ""}`)}
                />
              ) : col === "edit" ? (
                <MoreHorizIcon
                  className={classes.actions}
                  onClick={() => handleLink(`${row.editLink ? row.editLink : ""}`)}
                />
              ) : col.includes("Date") ? (
                moment(row[col]).format(DATETIME_FORMAT)
              ) : typeof row[col] === "number" ? (
                numeral(row[col]).format("0,0.00")
              ) : row[col] !== undefined ? (
                row[col].toString()
              ) : (
                <>
                  <div>{col}</div>
                  <div className={classes.arrow}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      {Object.keys(row).length > 0 &&
        Object.keys(listSubColumns).length > 0 &&
        Object.keys(row)
          .filter((col) => col === "details" && row[col]?.length)
          .map((col) => (
            <Collapse key={row[col].id} in={open} timeout="auto" unmountOnExit>
              <Box margin={1} className={classes.tableCollaspeRow}>
                <Table className={classes.table}>
                  <SubHeader listSubColumns={listSubColumns} />
                  <TableBody className={classes.tableSubBody}>
                    {/* {row[col].map((subRow) => (
                      <SubRow listSubColumns={listSubColumns} key={row[col][subRow]?.id} subRow={subRow} />
                    ))} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          ))}
    </>
  );
};
DivListRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.string).isRequired,
  columns: PropTypes.string.isRequired,
  subcolumns: PropTypes.string.isRequired,
  checkboxLabel: PropTypes.string.isRequired,
  checkboxesName: PropTypes.string.isRequired,
  matchCheckboxName: PropTypes.string.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default DivListRow;
