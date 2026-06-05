//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import ErrorMsg from "components/ErrorMsg";
//  Utility
import { checkIsValid } from "utility/index"; //  Getting the re-useable functions from utility/index

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: 0,
    marginBottom: theme.spacing(1),
    padding: 0,
    "& > div": {
      width: `100%`,
      // paddingTop: 0,
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
    "& .Mui-disabled": {
      color: theme.palette.text[2],
    },
    // '&:hover': {
    //     border: `1px solid ${theme.palette.primary.main}`,
    //     background: '#F7FDFF'
    // },
    "& input": {
      color: theme.palette.text[2],
      padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.line[3]}`,
      fontSize: "0.875rem",
      maxHeight: 40,
      width: `100%`,
      "&::placeholder": {
        fontSize: `0.92em`,
        opacity: 0.35,
      },
      "&::disabled": {
        color: `${theme.palette.text[2]} !important`,
      },
      "&::-internal-autofill-selected": {
        background: `none !important`,
      },
    },
    "& .MuiFormHelperText-root": {
      display: `none`,
    },
  },
  isDisabled: {
    "& input": {
      color: theme.palette.text[2],
      background: theme.palette.background.disabled,
    },
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.5),
    color: theme.palette.text[1],
  },
  errorBorder: {
    "& input": {
      border: `1px solid ${theme.palette.errorRed} !important`,
    },
  },
}));

const NumberFieldCustomError = ({ inputField, className, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name = "",
    value = name === "irregSettDate" || name === "commiRate" ? "" : 0,
    placeholder = "",
    prefix = "",
    min = 0,
    max = 0,
    errorMsg = "",
    isEnabled = false,
    isRequired = false,
    isTouched = false,
    isValid = false,
    isPreview = false,
    allowNegative = true,
    decimalScale = 2,
  } = inputField;

  const getPreviewValue = (fieldValue, fieldName) => {
    let displayValue = "";
    if (!fieldValue && (fieldName === "irregSettDate" || fieldName === "commiRate")) {
      displayValue = "----";
    } else if (!fieldValue) {
      displayValue = 0;
    } else {
      displayValue = fieldValue.toLocaleString("en");
    }
    return displayValue;
  };

  return (
    <Grid container direction="column" className={className}>
      <div
        className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``} ${classes.root} ${
          !isEnabled && classes.isDisabled
        }`}
      >
        {isPreview ? (
          <div className={classes.preview}>{getPreviewValue(value, name)}</div>
        ) : (
          <NumberFormat
            value={value}
            thousandSeparator
            prefix={!checkIsValid(prefix) ? "" : prefix}
            className="some"
            inputMode="numeric"
            disabled={!isEnabled}
            placeholder={t(`${placeholder}`)}
            min={min}
            max={max}
            decimalSeparator="."
            decimalScale={decimalScale}
            allowNegative={allowNegative}
            id={name}
            name={name}
            onValueChange={onChange}
          />
        )}
      </div>
      {isTouched && isRequired && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
    </Grid>
  );
};

export default NumberFieldCustomError;

NumberFieldCustomError.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
