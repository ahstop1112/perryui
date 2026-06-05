//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { Grid, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  title: {
    width: `100%`,
    color: theme.palette.text[4],
    fontSize: `0.875rem`,
    marginBottom: theme.spacing(1),
  },
  labelContainer: {
    display: `flex`,
    flexWrap: `wrap`,
    flex: `0 0 100%`,
    width: `100%`,
    "& .MuiFormControlLabel-root": {
      marginLeft: `-8px`,
      "& input": {
        zIndex: 0,
      },
      "& .Mui-disabled": {
        "& svg": {
          color: `${theme.palette.text[3]} !important`,
        },
        "& span": {
          color: theme.palette.text[4],
        },
      },
    },
    "& .MuiIconButton-root": {
      color: theme.palette.text[1],
      paddingTop: 0,
      paddingBottom: 0,
    },
    "& svg": {
      color: theme.palette.text[1],
    },
    "& .MuiIconButton-label": {
      width: 20,
      height: 20,
    },
    "& .MuiFormControlLabel-label": {
      color: theme.palette.text[3],
      fontSize: `0.875rem`,
    },
    "& .MuiFormControlLabel-label.Mui-disabled": {
      color: theme.palette.text[3],
    },
  },
  labelItem: {
    display: `flex`,
    alignItems: `flex-start`,
    // marginTop: theme.spacing(1.25),
    // marginBottom: theme.spacing(1.5),
    "& input:checkbox": {
      width: 18,
      height: 18,
    },
    "&.grid_12": {
      width: `100%`,
    },
    "&.grid_2": {
      width: `16.6666%`,
    },
    "&.grid_3": {
      width: `25%`,
    },
    "&.grid_4": {
      width: `33.3333%`,
    },
    "&.grid_6": {
      width: `50%`,
    },
    "&.hasMargin": {
      marginTop: theme.spacing(2),
    },
  },
  noLabelCheckboxGroup: {
    "& span": {
      fontSize: `0.875rem`,
      color: `${theme.palette.text[2]} !important`,
    },
  },
  label: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text[4],
    fontSize: `0.75rem`,
    lineHeight: 1.5,
    width: `100%`,
  },
  labelClass: {
    fontSize: `0.75rem`,
  },
  textField: {
    minWidth: `100%`,
    marginTop: theme.spacing(1),
  },
  checkbox: {
    // border: `1px solid red`,
  },
  fullWidth: {
    flex: `0 0 100%`,
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.75),
    color: theme.palette.text[1],
  },
}));

const CheckBox = ({ inputField, showLabel, onChange, hooks, pageAction, section, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    data = [],
    name: inputName,
    layoutGrid = "",
    errorMsg = "",
    isRequired = false,
    isEnabled = false,
    isTouched = false,
    isValid = false,
    isPreview = false,
    value = false,
    hasMargin = false,
    fromApi = false,
    labelFromApi = false,
    showValueAsLabel = false,
    setContinueBasicMsg = false,
  } = inputField;

  const formKey = hooks?.state.formKey;
  const getPreviewValue = (fieldValue, fieldLabel, index = 0) => {
    let displayValue = "";
    if (fieldValue === true) {
      if (showValueAsLabel && labelFromApi) {
        displayValue = fieldLabel || fieldValue;
      } else if (showValueAsLabel && !labelFromApi) {
        displayValue = `${t(`${fieldLabel}`)}${index < data.length - 1 ? "\xa0\xa0" : ``}`;
      } else if (!showValueAsLabel && !labelFromApi) {
        displayValue = `Yes${index < data.length - 1 ? "\xa0\xa0" : ``}`;
      }
    } else if (fieldValue === false || !fieldValue) {
      displayValue = formKey.includes("GO-SIR001")
        ? `No${index < data.length - 1 ? "\xa0\xa0" : ``}`
        : data.length <= 1
        ? "No"
        : "";
    }
    return displayValue;
  };

  return (
    <>
      {isPreview && data.length === 0 ? (
        <div className={classes.preview}>{`${!value ? `false` : value}`}</div>
      ) : isPreview && data.length > 0 ? (
        <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.labelContainer}>
          {data.length > 0 &&
            data.map((colData, index) => {
              const { name = "", checked = false, label, text, value: colValue } = colData;
              return (
                <div key={index} className={classes.preview}>
                  {getPreviewValue(colValue, label, index)}
                </div>
              );
            })}
          {setContinueBasicMsg && (
            <ErrorMsg className={classes.errorMsg} type="error" label={t("flows:flows.WOC.continueBasicErrorMsg")} />
          )}
        </Grid>
      ) : (
        <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.labelContainer}>
          {data.map((colData) => {
            const { name = "", checked = false, label, text, value: colValue } = colData;
            return (
              <FormGroup
                key={`${name}_${label}`}
                className={`${classes.labelItem} ${layoutGrid && `grid_${colData.layoutGrid}`} ${
                  hasMargin && `hasMargin`
                }  ${!showValueAsLabel && classes.noLabelCheckboxGroup}`}
              >
                <FormControlLabel
                  control={
                    <Checkbox checked={colValue} className={classes.checkbox} name={name} disabled={!isEnabled} />
                  }
                  onChange={onChange}
                  label={fromApi || labelFromApi ? label : t(`${label}`)}
                />
              </FormGroup>
            );
          })}
          {isRequired && isTouched && !isValid && errorMsg && (
            <ErrorMsg className={classes.errorMsg} type="error" label={labelFromApi ? errorMsg : t(`${errorMsg}`)} />
          )}
        </Grid>
      )}
    </>
  );
};

CheckBox.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
};

export default CheckBox;
