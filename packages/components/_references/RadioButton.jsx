//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Radio, RadioGroup, FormLabel, FormControlLabel, FormControl } from "@mui/material";
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    // border: `1px solid red`,
    // paddingLeft: theme.spacing(0.5),
    "& .MuiFormControl-root": {
      // paddingTop: 0,
      flex: `0 0 100%`,
      flexWrap: `wrap`,
      paddingTop: `0px`,
      paddingBottom: `0px`,
      "& div": {
        flex: `0 0 100%`,
      },
    },
    "& span": {
      fontSize: `0.875rem`,
      color: theme.palette.text[3],
    },
    "& svg": {
      color: theme.palette.text[1],
    },
    "& .MuiIconButton-colorSecondary": {
      color: theme.palette.text[1],
      padding: `0 ${theme.spacing(1)}`,
    },
    "& .MuiFormControlLabel-root": {
      color: theme.palette.text[1],
      "& input": {
        zIndex: 0,
      },
    },
    "& .Mui-disabled": {
      "& span": {
        color: `${theme.palette.text[3]} !important`,
      },
      "& svg": {
        color: theme.palette.text[3],
      },
    },
  },
  noLabelRadioGroup: {
    "& span": {
      fontSize: `0.875rem`,
      color: `${theme.palette.text[2]} !important`,
    },
  },
  previewRadioGroup: {
    "& .MuiFormControl-root": {
      paddingTop: 0,
    },
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: theme.spacing(0.5),
    // paddingBottom: theme.spacing(1.5),
    color: theme.palette.text[1],
  },
  radioButton: {
    marginTop: 14,
  },
}));

const RadioButton = ({ inputField, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name = "",
    label = "",
    value = "",
    errorMsg = "",
    data = [],
    isEnabled = false,
    isRequired = false,
    isTouched = false,
    isValid = false,
    isPreview = false,
    labelFromApi = false,
    showValueAsLabel = false,
    showLabelAsValue = false,
    isReadOnly = false,
  } = inputField;

  const getPreviewValue = (v) => {
    let previewValue =
      `${v}`.includes(`bpmp:bpmp`) || `${v}`.includes(`flows:flows`)
        ? t(`${v}`)
        : v === false || v === "N"
        ? `No`
        : v === true || v === "Y"
        ? `Yes`
        : !v
        ? `----`
        : `${v}`;
    if (showLabelAsValue) {
      const current = data.find((item) => item.value === v);
      if (current) {
        previewValue =
          `${current.label}`.includes(`bpmp:bpmp`) || `${current.label}`.includes(`flows:flows`)
            ? t(`${current.label}`)
            : current.label;
      }
    }
    return previewValue;
  };

  return (
    <div
      className={`${classes.radioGroup} ${isPreview && classes.previewRadioGroup} ${
        !showValueAsLabel && classes.noLabelRadioGroup
      }`}
    >
      <FormControl component="fieldset" disabled={!isEnabled}>
        {isPreview ? (
          <div className={classes.preview}>{getPreviewValue(value)}</div>
        ) : (
          <RadioGroup
            row
            aria-label={name}
            name={`row-radio-buttons-group-${name}`}
            className={label?.length <= 0 ? classes.radioButton : ""}
            onChange={onChange}
            value={value}
          >
            {data.map((colData) => {
              const { label: colLabel, value: colValue } = colData;
              return (
                <FormControlLabel
                  key={colValue}
                  value={colValue}
                  control={<Radio disabled={isReadOnly || !isEnabled} />}
                  label={t(`${colLabel}`)}
                />
              );
            })}
          </RadioGroup>
        )}
      </FormControl>
      {isRequired && isTouched && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={labelFromApi ? errorMsg : t(`${errorMsg}`)} />
      )}
    </div>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
