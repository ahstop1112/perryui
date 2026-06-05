// TODO: Deprecate in favour of IconText

//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  grid: {
    fontSize: "0.86em",
    padding: 0,
  },
  label: {
    padding: theme.spacing(0, 1.25),
    paddingLeft: 0,
    paddingBottom: 0,
  },
  paddingBottom16: {
    paddingBottom: theme.spacing(2),
  },
  img: {
    marginTop: theme.spacing(1),
  },
  typography: {
    fontSize: "0.75rem !important",
    paddingBottom: 0,
    lineHeight: 1.5,
    color: `${theme.palette.errorRed} !important`,
  },
}));

const ErrorMsg = ({ label }) => {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" alignItems="flex-start" className={`${classes.grid}`}>
      <Grid className={classes.label}>
        {Array.isArray(label) ? (
          label.length > 0 &&
          label.map((text) => (
            <Typography key={Math.random()} className={clsx(classes.typography, classes.paddingBottom16)}>
              {text}
            </Typography>
          ))
        ) : (
          <Typography className={classes.typography}>{label}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ErrorMsg;

ErrorMsg.propTypes = {
  label: PropTypes.string.isRequired,
};
