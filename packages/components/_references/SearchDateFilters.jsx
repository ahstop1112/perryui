//  General JS Library importation
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Chip, Select, MenuItem, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm

const useStyles = makeStyles((theme) => ({
  daysLinks: {
    flex: `0 0 70%`,
    display: `flex`,
    flexWrap: `noWrap`,
    alignItems: `center`,
    justifyContent: `flex-end`,
    padding: theme.spacing(1),
    paddingRight: 0,
    [theme.breakpoints.down("md")]: {
      display: `none`,
    },
  },
  dayLink: {
    border: `1px solid ${theme.palette.background.content[3]}`,
    padding: theme.spacing(1),
    background: theme.palette.background.content[2],
    color: theme.palette.text[1],
    minWidth: 100,
    marginLeft: `2%`,
    borderRadius: theme.spacing(5),
    textAlign: `center`,
    alignItems: `center`,
    fontSize: `0.875rem`,
    fontWeight: 700,
    lineHeight: 2,
    cursor: `pointer`,
    "& span": {
      fontSize: `0.75rem`,
      lineHeight: 2,
    },
    "&.active": {
      background: theme.palette.background.content[3],
      color: theme.palette.text[5],
    },
    "&:hover": {
      background: theme.palette.background.content[3],
      color: theme.palette.text[5],
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 110,
    },
  },
  daysTitle: {
    fontSize: `0.7rem`,
    color: theme.palette.text[3],
    marginRight: theme.spacing(1),
  },
  daysLinksMobile: {
    display: `none`,
    [theme.breakpoints.down("md")]: {
      display: `block`,
      width: 100,
      "& .MuiFormLabel-root": {
        color: theme.palette.text[12],
        margin: theme.spacing(1),
        position: `absolute`,
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: 120,
    },
  },
  datesMobileFilter: {
    width: `100%`,
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.line[3]}`,
    background: `none`,
    "&.MuiInput-underline:after": {
      display: `none`,
    },
  },
}));

const SearchDateFilters = (props) => {
  const { filters = [] } = props;
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const [searchParams] = useSearchParams(); //  Used to read and modify the query string in the URL
  const dateString = searchParams.get("dateString");
  const { handleLink } = useForm();
  const [currentFilters, setCurrentFilters] = useState([
    {
      label: "bpmp:bpmp.commons.today",
      value: "today",
    },
    {
      label: "bpmp:bpmp.commons.last7days",
      value: "last7days",
    },
    {
      label: "bpmp:bpmp.commons.thisMonth",
      value: "thisMonth",
    },
    {
      label: "bpmp:bpmp.commons.earlier",
      value: "earlier",
    },
  ]);

  const handleChange = (e) => {
    handleLink(`${window.location.pathname}?dateString=${e.target.value}`);
  };

  useEffect(() => {
    if (filters?.length > 0) setCurrentFilters(filters);
  }, [filters]);

  return (
    <>
      <div className={classes.daysLinks}>
        {/* <div className={classes.daysTitle}>{t('bpmp:bpmp.commons.groupByDate')}</div> */}
        {currentFilters?.length > 0 &&
          currentFilters.map((filter) => (
            <Chip
              onClick={() => handleLink(`${window.location.pathname}?dateString=${filter?.value}`)}
              className={`${classes.dayLink} ${dateString === filter?.value && `active`}`}
              label={filter?.rawLabel ? filter.label : t(filter?.label)}
              key={filter?.value}
            />
          ))}
      </div>
      <div className={classes.daysLinksMobile}>
        <InputLabel htmlFor="daysFilter">{t("bpmp:bpmp.commons.dateFilter")}</InputLabel>
        <Select
          labelId="daysFilter"
          id="daysFilterSelect"
          value=""
          onChange={handleChange}
          className={classes.datesMobileFilter}
        >
          {currentFilters?.length > 0 &&
            currentFilters.map((filter) => (
              <MenuItem value={filter?.value} key={filter?.value}>
                {filter?.rawLabel ? filter.label : t(filter?.label)}
              </MenuItem>
            ))}
        </Select>
      </div>
    </>
  );
};

export default SearchDateFilters;
