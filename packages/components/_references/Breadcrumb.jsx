//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Breadcrumbs as MuiBreadcrumb, Link, Typography } from "@mui/material";
//  Utility
import { DEFAULT_PAGE_PATH } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    width: `100%`,
    fontSize: "0.75rem",
    marginLeft: theme.spacing(2.5),
    marginBottom: 0,
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(0),
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(0),
      display: `none`,
    },
    "& a": {
      color: theme.palette.text[4],
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
      "&.lv1Link": {
        color: theme.palette.text[4],
      },
      "&.lv2Link": {
        color: theme.palette.text[4],
      },
    },
    "& .currentLink": {
      fontSize: "0.75rem",
      color: theme.palette.text[1],
    },
    "& .MuiBreadcrumbs-separator": {
      color: theme.palette.text[4],
      opacity: 0.9,
    },
  },
}));

const Breadcrumb = ({ currentLinkTag, ...props }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();

  return (
    <MuiBreadcrumb aria-label="breadcrumb" className={classes.breadcrumb}>
      <Link color="inherit" href={DEFAULT_PAGE_PATH}>
        {t("commons.home")}
      </Link>
      {props.lv1Tag && (
        <Link color="inherit" href={props.lv1Link} className="lv1Link">
          {props.lv1Tag}
        </Link>
      )}
      {props.lv2Tag && (
        <Link color="inherit" href={props.lv2Link} className="lv2Link">
          {props.lv2Tag}
        </Link>
      )}
      {currentLinkTag && (
        <Typography className="currentLink" color="textPrimary" aria-current="page">
          {currentLinkTag}
        </Typography>
      )}
    </MuiBreadcrumb>
  );
};

Breadcrumb.propTypes = {
  currentLinkTag: PropTypes.string.isRequired,
};

export default Breadcrumb;
