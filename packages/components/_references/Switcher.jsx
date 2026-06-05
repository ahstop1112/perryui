//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  switcher: {
    "& .Mui-checked": {
      color: theme.palette.button[1],
    },
    "& .MuiSwitch-track": {
      backgroundColor: theme.palette.button[1],
    },
    "& .Mui-disabled": {
      color: `${theme.palette.button.disabled} !important`,
      "& .MuiSwitch-track": {
        backgroundColor: theme.palette.text[13],
      },
    },
    "& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.button[1],
      opacity: 0.38,
    },
  },
}));

const Switcher = ({ inputField, onChange }) => {
  const classes = useStyles();
  const { name = "", value = "", isEnabled } = inputField;

  return (
    <Switch
      className={classes.switcher}
      disabled={!isEnabled}
      checked={!value}
      onChange={onChange}
      color="primary"
      name={name}
      inputProps={{ "aria-label": name }}
    />
  );
};

export default Switcher;

Switcher.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
