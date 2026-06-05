//  General JS Library importation
import React from "react";
import moment from "moment"; //  Date / Time Related library
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import makeStyles from "@mui/styles/makeStyles";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAuth from "core/store/hooks/useAuth"; //  Getting the authentication data or functions from useAuth
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
import { DATETIME_FORMAT } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)
import { isObject, calcSinceCreate } from "utility/index"; //  Getting the re-useable functions from utility/index

const useStyles = makeStyles((theme) => ({
  tableRow: {
    maxWidth: `100%`,
    borderBottom: `1px solid ${theme.palette.line[2]}`,
    // '&:last-child': {
    //     borderBottom: 0
    // },
    "& td": {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: theme.palette.text[2],
      fontSize: `0.75rem`,
      maxWidth: 250,
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
      "& .MuiIconButton-root": {
        "& svg": {
          color: theme.palette.text[1],
        },
      },
      "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": {
        color: theme.palette.text[1],
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
      "& div.TERMINATED": {
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
      "& div.PROCESSING": {
        "& .dot": {
          backgroundColor: theme.palette.text[13],
        },
      },
      "& div.RETURNED": {
        "& .dot": {
          border: `2px solid ${theme.palette.text[13]}`,
        },
      },
      "& div.DRAFT": {
        "& .dot": {
          backgroundColor: theme.palette.text[16],
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
      "& .MuiCheckbox-colorSecondary.Mui-checked": {
        color: theme.palette.text[1],
      },
      "& .MuiTouchRipple-root:hover": {
        backgroundColor: theme.palette.text[3],
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
  dateTime: {
    whiteSpace: `break-spaces`,
    maxWidth: 100,
  },
  category: {
    padding: `${theme.spacing(0.5)} 0`,
    fontWeight: 700,
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
    border: `1px solid red`,
    flex: `0 0 100%`,
    maxWidth: `100%`,
    display: `flex`,
    flexWrap: `wrap`,
    padding: theme.spacing(1),
    margin: theme.spacing(1.5),
    backgroundColor: theme.palette.background.content[4],
    "& > div": {
      display: `flex`,
      alignItems: `flex-start`,
      padding: theme.spacing(1),
      paddingTop: 0,
      paddingBottom: 0,
      color: theme.palette.text[4],
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
  link: {
    textDecoration: "none",
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
      color: theme.palette.icon[1],
    },
  },
}));

const TableListRow = ({ name, row, columns, labelId, onCheckboxChange, isItemSelected }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const { handleLink } = useForm(); //  Get Dynamic Form related functions from useForm
  const { userStorage } = useAuth();
  const processStartDate = moment(row?.processStartDatetime);

  return (
    <TableRow
      className={classes.tableRow}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={`${row.initiatorName}_${labelId}`}
    >
      {Object.keys(columns).map((col) => (
        <TableCell key={`${col}_${name}`} id={labelId} className={columns[col].className}>
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
          ) : col === "checkbox" ? (
            <Checkbox
              checked={isItemSelected}
              onClick={(e) => onCheckboxChange(e, name)}
              inputProps={{ "aria-labelledby": labelId }}
            />
          ) : col === "add" ? (
            <MoreHorizIcon
              className={classes.actions}
              onClick={() => handleLink(`${row.link ? row.link : ""}`)}
              onKeyDown={() => handleLink(`${row.link ? row.link : ""}`)}
            />
          ) : col === "review" ? (
            <MoreHorizIcon
              className={classes.actions}
              onClick={() => handleLink(`${row.link ? row.link : ""}`)}
              onKeyDown={() => handleLink(`${row.link ? row.link : ""}`)}
            />
          ) : col === "view" ? (
            <MoreHorizIcon
              className={classes.actions}
              onClick={() => handleLink(`${row.link ? row.link : ""}`)}
              onKeyDown={() => handleLink(`${row.link ? row.link : ""}`)}
            />
          ) : col === "edit" ? (
            <MoreHorizIcon
              className={classes.actions}
              onClick={() => handleLink(`${row.link ? row.link : ""}`)}
              onKeyDown={() => handleLink(`${row.link ? row.link : ""}`)}
            />
          ) : col.includes("Date") ? (
            <div className={classes.dateTime}>{moment(row[col]).format(DATETIME_FORMAT)}</div>
          ) : col === "sinceCreate" ? (
            <div className={calcSinceCreate(processStartDate)?.colorCode}>
              <div className="dot" />
              {calcSinceCreate(processStartDate)?.calcDate} days
            </div>
          ) : col === "assignee" ? (
            <span className={row[col] === userStorage?.loginId ? `current` : ``}>{row[col]}</span>
          ) : typeof row[col] === "number" && !col.includes("Id") && !col.includes("id") ? (
            numeral(row[col]).format("0,0.00")
          ) : col.includes("status") || col.includes("Status") ? (
            <div className={`status ${row[col]}`}>
              <div className="dot" />
              {t(`commons.${row[col]}`)}
            </div>
          ) : col.includes(`category`) ? (
            <span className={`${classes.category} ${row.categoryCode1}`}>{row[col]}</span>
          ) : row[col] !== undefined ? (
            columns[col].link ? (
              <div
                aria-hidden="true"
                className={classes.link2}
                onClick={() => handleLink(`${columns[col].link ? columns[col].link : ""}${row.id}`)}
                onKeyDown={() => handleLink(`${columns[col].link ? columns[col].link : ""}${row.id}`)}
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
    </TableRow>
  );
};

TableListRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableListRow;
