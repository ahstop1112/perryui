//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import moment from "moment"; //  Date / Time Related library
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
//  Framework Components
import ErrorMsg from "components/ErrorMsg";
//  Utility
import {
  DATETIME_FORMAT,
  DATETIME_FORMAT_SHORT_JS,
  TIME_FORMAT_SHORT_JS,
  DATETIME_FORMAT_SHORT,
} from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)

const useStyles = makeStyles((theme) => ({
  errorBorder: {
    border: `1px solid ${theme.palette.errorRed} !important`,
  },
  container: {
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

const DateTimePicker = ({ inputField, onDateChange }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name = "",
    value = "",
    placeholder = "",
    effectiveDate = new Date(),
    minDate = "",
    maxDate = "",
    minTime = "",
    maxTime = "",
    errorMsg = "",
    isEnabled = false,
    isRequired = false,
    isTouched = false,
    isValid = true,
  } = inputField;

  const handleMinDate = () => {
    switch (name) {
      case "notLessThanToday":
        return moment().toDate();
      case "notLessThanEffectiveDate":
        return effectiveDate?.value ? effectiveDate?.value : moment().toDate();
      default:
        return null;
    }
  };
  return (
    <>
      <div className={`${classes?.container} ${!isEnabled ? classes.grayPlaceholder : ""}`}>
        <DatePicker
          className={`${isTouched && isRequired && !isValid && errorMsg ? classes.errorBorder : ""}`}
          selected={value ? moment(value, DATETIME_FORMAT).toDate() : ""}
          startDate={value}
          disabled={!isEnabled}
          dateFormat={DATETIME_FORMAT_SHORT_JS}
          timeFormat={TIME_FORMAT_SHORT_JS}
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          placeholderText={t(`${placeholder}`)}
          onChange={onDateChange}
          isClearable={isEnabled}
          showTimeSelect
        />
      </div>
      {isTouched && isRequired && !isValid && errorMsg && <ErrorMsg type="error" label={t(`${errorMsg}`)} />}
    </>
  );
};

export default DateTimePicker;

DateTimePicker.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onDateChange: PropTypes.func.isRequired,
};
