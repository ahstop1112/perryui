//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, CircularProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "44px",
    borderRadius: 24,
    fontWeight: 500,
    minWidth: 108,
    padding: theme.spacing(0.75),
    textTransform: "none",
    fontFamily: `"Avenir-Heavy","Helvetica Neue",Arial,sans-serif;`,
    fontSize: "1rem",
    outline: "none !important",
  },
  disabled: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
  },
  loading: {
    color: theme.palette.grey.main,
    marginLeft: theme.spacing(2.5),
  },
  primary: {
    "&.Mui-disabled": {
      backgroundColor: "#F7F7F7",
      border: "1px solid #D1D4D3",
    },
    "&:focus:active": {
      backgroundColor: theme.palette.dark,
    },
    "&:hover": {
      backgroundColor: theme.palette.brandColor,
    },
    backgroundColor: theme.palette.brandColor,
    color: theme.palette.white,
  },
  secondary: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey.medium}`,
    color: theme.palette.common.black,
  },
}));

const ButtonContained = ({ children, color, disabled, isLoading, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      classes={{ disabled: classes.disabled }}
      className={clsx(
        classes.button,
        color === "primary" && classes.primary,
        color === "secondary" && classes.secondary,
        props.className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      {(() => isLoading && <CircularProgress size={20} className={classes.loading} />)()}
    </Button>
  );
};

export default ButtonContained;

ButtonContained.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
