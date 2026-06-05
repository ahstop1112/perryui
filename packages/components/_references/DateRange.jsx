//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import makeStyles from "@mui/styles/makeStyles";
import ErrorMsg from "components/ErrorMsg";
import { DATE_FORMAT, DATE_FORMAT_JS, DATETIME_FORMAT_JS } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)
import moment from "moment";

const useDatePickerStyles = makeStyles((theme) => ({
  root: {
    // border: `1px solid blue`,
    // backgroundColor: theme.palette.background.content[2],
    width: `100%`,
    display: `flex`,
    flexWrap: `noWrap`,
    "& .react-datepicker-wrapper": {
      // border: `1px solid blue`,
      padding: 0,
      "&:nth-child(1)": {
        marginRight: `${theme.spacing(1)} !important`,
      },
      "& input": {
        padding: theme.spacing(1.1),
        paddingLeft: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        border: `1px solid ${theme.palette.line[3]}`,
        fontSize: `0.875rem`,
        lineHeight: 1.5,
        color: theme.palette.text[3],
        width: "100%",
        // [theme.breakpoints.down('md')]: {
        //   width: '44%',
        // },
        "&:focus": {
          outline: `none`,
        },
        "&::placeholder": {
          opacity: 0.5,
          fontSize: `0.875em`,
        },
        "&::disabled": {
          opacity: 0.5,
          fontSize: `0.875em`,
        },
        // minWidth: "100px",
        // maxWidth: "108px",
      },
    },
  },
  startDate: {
    border: `1px solid red`,
    marginRight: theme.spacing(1),
  },
  start: {
    // borderRight:'0',
    // borderTopLeftRadius: theme.spacing(0.5),
    borderBottomLeftRadius: theme.spacing(0.5),
  },
  end: {
    // borderLeft:0,
    // borderRight:0,
  },
  to: {
    padding: "1px 0",
    color: theme.palette.text[2],
    fontSize: "1rem",
    lineHeight: 2,
    display: "inline-block",
    width: `5%`,
    textAlign: `center`,
  },
  calendarIcon: {
    width: "16px",
  },
  spanIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderLeft: 0,
    lineHeight: 1.75,
    paddingRight: theme.spacing(1),
  },
  errorBorder: {
    border: `1px solid ${theme.palette.errorRed} !important`,
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.75),
    color: theme.palette.text[1],
  },
}));

const DateRange = ({ inputField, showTime, onInputChange }) => {
  const classes = useDatePickerStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    startDate,
    endDate,
    isEnabled = false,
    isTouched = false,
    isRequired = false,
    isPreview = false,
    isValid = false,
    errorMsg = "",
  } = inputField;

  return (
    <>
      <div className={classes.root}>
        {isPreview ? (
          <div className={classes.preview}>
            {startDate && endDate
              ? `Form ${moment(new Date(startDate)).format(DATE_FORMAT)} To ${moment(new Date(endDate)).format(
                  DATE_FORMAT,
                )}`
              : "----"}
          </div>
        ) : (
          <>
            <DatePicker
              className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``}`}
              selected={startDate}
              disabled={!isEnabled}
              onChange={(date) => onInputChange(`startDate|${date}`)}
              selectsStart
              isClearable
              showTimeSelect={showTime}
              startDate={startDate}
              endDate={endDate}
              dateFormat={showTime ? DATETIME_FORMAT_JS : DATE_FORMAT_JS}
              placeholderText={t(`commons.pleaseInputStartDate`)}
            />
            <DatePicker
              className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``}`}
              selected={endDate}
              disabled={!isEnabled}
              onChange={(date) => onInputChange(`endDate|${date}`)}
              selectsEnd
              isClearable
              showTimeSelect={showTime}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat={showTime ? DATETIME_FORMAT_JS : DATE_FORMAT_JS}
              placeholderText={t(`commons.pleaseInputEndDate`)}
            />
          </>
        )}
      </div>
      {isTouched && isRequired && !isValid && errorMsg && <ErrorMsg type="error" label={t(`${errorMsg}`)} />}
    </>
  );
};

export default DateRange;

DateRange.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  showTime: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
