//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Grid, TextareaAutosize } from "@mui/material";
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    resize: `none !important`,
    outline: `none`,
    boxSizing: `border-box`,
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.line[3]}`,
    fontFamily: [`"Avenir-Book"`, "Helvetica Neue", "Arial", "sans-serif"].join(","),
    fontSize: "0.875rem !important",
    color: theme.palette.text[3],
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "&textarea": {
      padding: theme.spacing(1.5),
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.line[3]}`,
      maxHeight: 40,
    },
    "&::placeholder": {
      opacity: 0.35,
    },
  },
  disabled: {
    color: theme.palette.text[3],
    background: theme.palette.background.disabled,
  },
  errorBorder: {
    border: `1px solid ${theme.palette.errorRed} !important`,
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: `${theme.spacing(0.5)} !important`,
    paddingBottom: theme.spacing(1.5),
    color: theme.palette.text[1],
    wordBreak: "break-all",
    whiteSpace: "pre-line",
  },
}));

const TextAreaCustomError = ({ pageAction, inputField, rows, children, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name,
    value = "",
    placeholder = "",
    errorMsg = "",
    isPreview = false,
    isEnabled = false,
    isValid = false,
    isRequired = false,
    isTouched = false,
    maxSize = 4000,
  } = inputField;

  return (
    <Grid container direction="column">
      {isPreview ? (
        <div className={classes.preview}>{!value ? `----` : value}</div>
      ) : (
        <TextareaAutosize
          name={name}
          minRows={!rows ? 5 : rows}
          placeholder={t(`${placeholder}`)}
          disabled={!isEnabled}
          maxLength={maxSize}
          {...props}
          value={value}
          className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``} ${
            !isEnabled && classes.disabled
          } ${classes.root}`}
        />
      )}
      {isTouched && isRequired && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
    </Grid>
  );
};

export default TextAreaCustomError;

TextAreaCustomError.propTypes = {
  rows: PropTypes.string.isRequired,
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
