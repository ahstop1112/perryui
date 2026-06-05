//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Grid, FilledInput, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
//  Framework Components
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: 0,
    marginBottom: theme.spacing(1),
    padding: 0,
    borderRadius: 0,
    background: `none`,
    borderBottom: `1px solid ${theme.palette.line[3]} !important`,
    "& input": {
      padding: `${theme.spacing(2)} !important`,
      paddingLeft: 0,
      background: `none`,
      border: `0 !important`,
    },
    "& input::placeHolder": {
      fontSize: "0.875em",
    },
    "& .MuiInputAdornment-root": {
      minHeight: 30,
      marginLeft: 12,
    },
  },
  iconTextField: {
    color: theme.palette.icon[2],
  },
  errorBorder: {
    "& input": {
      border: `1px solid ${theme.palette.errorRed} !important`,
    },
  },
}));

const FilledTextFieldCustomError = ({ pageAction, autoFocus, inputField, className, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name = "",
    value = "",
    placeholder = "",
    errorMsg = "",
    type = "filledText",
    icon = "",
    isEnabled = false,
    isRequired = false,
    isTouched = false,
    isValid = false,
  } = inputField;

  return (
    <Grid container direction="column" className={className}>
      <FilledInput
        {...props}
        disableUnderline
        name={name}
        value={value || ""}
        type={type === "filledText" ? "text" : "password"}
        placeholder={t(`${placeholder}`)}
        variant="filled"
        disabled={!isEnabled}
        className={`${isTouched && !isValid ? classes.errorBorder : ``} ${classes.root}`}
        autoFocus={autoFocus}
        startAdornment={
          <InputAdornment position="start">
            {icon === "loginId" ? (
              <PersonIcon className={classes.iconTextField} />
            ) : icon === "password" ? (
              <LockIcon className={classes.iconTextField} />
            ) : null}
          </InputAdornment>
        }
      />
      {isTouched && isRequired && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
    </Grid>
  );
};

export default FilledTextFieldCustomError;

FilledTextFieldCustomError.propTypes = {
  pageAction: PropTypes.string.isRequired,
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
