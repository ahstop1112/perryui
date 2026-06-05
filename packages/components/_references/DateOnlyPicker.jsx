//  General JS Library importation
import React from "react";
import moment from "moment"; //  Date / Time Related library
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import ErrorMsg from "components/ErrorMsg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//  Utility
import { DATE_FORMAT } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)

const useStyles = makeStyles((theme) => ({
  errorBorder: {
    border: `1px solid ${theme.palette.errorRed} !important`,
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.5),
    color: theme.palette.text[1],
  },
  container: {
    width: "100%",
    "& input": {
      outline: "none",
    },
    "& .react-datepicker-wrapper": {
      "& .react-datepicker__input-container": {
        "& input": {
          "&::placeholder": {
            fontSize: `0.92em !important`,
            opacity: `0.35 !important`,
          },
        },
      },
    },
    "& .react-datepicker-popper .react-datepicker__triangle:after, & .react-datepicker-popper .react-datepicker__triangle:before":
      {
        left: "unset",
        right: "20px",
      },
  },
  grayPlaceholder: {
    "& .react-datepicker-wrapper": {
      "& .react-datepicker__input-container": {
        "& input": {
          color: `${theme.palette.text[2]} !important`,
          "-webkit-text-fill-color": `${theme.palette.text[2]} !important`,
        },
      },
    },
  },
}));

const DateOnlyPicker = ({ inputField, onDateChange }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name,
    value = "",
    minDate,
    maxDate,
    errorMsg,
    isEnabled = false,
    isRequired = false,
    isValid = true,
    isTouched = false,
    isPreview = false,
  } = inputField;

  return (
    <>
      {isPreview ? (
        <div className={classes.preview}>{!value ? "----" : `${moment(value).format(DATE_FORMAT)}`}</div>
      ) : (
        <div className={`${classes?.container} ${!isEnabled ? classes.grayPlaceholder : ""}`}>
          <DatePicker
            className={clsx({ [classes.errorBorder]: isTouched && isRequired && !isValid })}
            name={name}
            selected={!value ? null : value}
            disabled={!isEnabled}
            dateFormat="yyyy-MM-dd"
            minDate={minDate}
            maxDate={maxDate}
            onChange={onDateChange}
            isClearable={isEnabled}
          />
        </div>
      )}
      {isTouched && isRequired && !isValid && errorMsg ? <ErrorMsg type="error" label={t(`${errorMsg}`)} /> : null}
    </>
  );
};

export default DateOnlyPicker;

DateOnlyPicker.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // value: PropTypes.instanceOf(Date).isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onDateChange: PropTypes.func.isRequired,
};
