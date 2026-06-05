//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { IMaskInput } from "react-imask";
import { Grid, TextField } from "@mui/material";
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: 0,
    marginBottom: `-3px`,
    padding: 0,
    width: `100%`,
    "& > div": {
      width: `100%`,
      paddingTop: 0,
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
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderWidth: `0px !important`,
    },
    // '&:hover': {
    //     border: `1px solid ${theme.palette.primary.main}`,
    //     background: '#F7FDFF'
    // },
    "& input": {
      background: theme.palette.background.content[2],
      color: theme.palette.text[2],
      padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.line[3]}`,
      fontSize: "0.875rem",
      // maxHeight: 40,
      height: `1.1876em`,
      width: `100%`,
      "&::placeholder": {
        fontSize: `0.92em`,
        opacity: 0.35,
      },
      "&::disabled": {
        opacity: 0.35,
        color: `${theme.palette.text[4]} !important`,
      },
      "&::-internal-autofill-selected": {
        background: `none !important`,
      },
    },
    "& .MuiFormHelperText-root": {
      display: `none`,
    },
  },
  errorBorder: {
    "& input": {
      border: `1px solid ${theme.palette.errorRed} !important`,
    },
  },
  isDisabled: {
    "& input": {
      color: theme.palette.text[3],
      background: theme.palette.background.disabled,
    },
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: `${theme.spacing(0.5)} !important`,
    paddingBottom: theme.spacing(1.5),
    color: theme.palette.text[1],
    wordBreak: "break-all",
    "& >a": {
      color: theme.palette.text[1],
      textDecoration: `underline`,
    },
    "&.acRedColor": {
      color: `${theme.palette.errorRed} !important`,
    },
  },
  statusColor: {
    color: `${theme.palette.apiError.text} !important`,
    "& input": {
      border: `1px solid ${theme.palette.apiError.text} !important`,
      // color: `${theme.palette.apiError.text} !important`,
      "-webkit-text-fill-color": `${theme.palette.apiError.text} !important`,
    },
  },
  mask: {
    marginBottom: theme.spacing(1),
    minHeight: 40,
  },
}));

const TextFieldCustomError = ({ autoFocus, inputField, children, className, onChange, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name,
    value,
    type = "text",
    placeholder = "",
    errorMsg = "",
    max = 100,
    regex = "",
    color = "",
    setColorFont = false,
    isEnabled = false,
    isValid = false,
    isRequired = false,
    isTouched = false,
    isPreview = false,
    mask = "",
    maskChar = {
      "#": /[1-9]/,
    },
  } = inputField;

  // const checkStatus = (value) => value === 'REJECTED' || value === 'CLOSED' || value === 'SUSPENDED';

  return (
    <Grid container direction="column" className={className}>
      <div
        className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``} ${classes.root} ${
          !isEnabled && classes.isDisabled
        }`}
      >
        {isPreview ? (
          <div className={`${classes.preview} ${setColorFont ? "acRedColor" : ""}`}>
            {!value ? `----` : type === "email" ? <a href={`mailto:${value}`}>{value}</a> : `${value}`}
          </div>
        ) : mask && mask.length > 0 ? (
          <IMaskInput
            className={classes.mask}
            mask={mask}
            definitions={maskChar}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
          />
        ) : (
          <TextField
            {...props}
            id={name}
            className={color ? classes.statusColor : ""}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder ? t(`${placeholder}`) : ``}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") e.preventDefault();
            }}
            disabled={!isEnabled}
            InputProps={{ maxLength: max }}
            mask={regex}
          >
            {children}
          </TextField>
        )}
      </div>
      {isTouched && isRequired && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
      {color && <ErrorMsg className={classes.errorMsg} type="error" label={t("flows:flows.COA.acStsWaringMessage")} />}
    </Grid>
  );
};

export default TextFieldCustomError;

TextFieldCustomError.propTypes = {
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
