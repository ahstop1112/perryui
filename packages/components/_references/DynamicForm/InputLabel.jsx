import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
//  Getting the Common Hooks from core/store/hooks
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const useStyles = makeStyles((theme) => ({
  labelContainer: {
    display: `flex`,
    justifyContent: `flex-start`,
  },
  spaceBetween: {
    justifyContent: `space-between`,
  },
  labelClass: {
    fontSize: `0.75rem`,
    lineHeight: 1.5,
    color: theme.palette.text[2],
    paddingBottom: 0,
    marginBottom: 0,
  },
  tooltipText: {
    fontSize: `1.12rem`,
    color: theme.palette.text[1],
    marginLeft: 5,
  },
  remarks: {
    fontSize: `0.75rem`,
    color: theme.palette.text[2],
    paddingRight: theme.spacing(0.5),
  },
}));

const InputLabel = ({ inputField }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    label = "",
    type = "text",
    isValid = false,
    isTouched = false,
    isRequired = false,
    isPreview = false,
    labelFromApi = false,
    tooltipText = "",
    remarks = "",
  } = inputField;

  const underLineLabel = (label) => {
    const underlineString = t(`${label}`).substring(t(`${label}`).indexOf("<u>") + 3, t(`${label}`).indexOf("</u>"));
    return (
      <>
        {t(`${label}`).split("<u>")[0]}
        <u>{underlineString}</u>
        {t(`${label}`).split("</u>")[1]}
      </>
    );
  };

  return (
    type !== `sectionHeader` && (
      <div className={`${classes.labelContainer} ${remarks && classes.spaceBetween}`}>
        <label
          htmlFor={labelFromApi ? label : t(`${label}`)}
          className={`${classes.labelClass} ${!isValid && isTouched ? `error` : ""}`}>
          {/* If the label is come from API, show the label directly, else use react i18n Text */}
          {type === "button"
            ? ""
            : labelFromApi
            ? label
            : !t(`${label}`).includes("<u>")
            ? t(`${label}`)
            : underLineLabel(label)}
          {isRequired && !isPreview ? ` *` : ``}
        </label>
        {tooltipText && !isPreview && (
          <Tooltip
            arrow
            disableFocusListener
            className={classes.tooltipText}
            placement="right"
            title={t(`${tooltipText}`)}>
            <HelpOutlineIcon />
          </Tooltip>
        )}
        {remarks && !isPreview && <span className={classes.remarks}>({remarks})</span>}
      </div>
    )
  );
};

export default InputLabel;

InputLabel.propTypes = {
  inputField: PropTypes.objectOf(PropTypes.any).isRequired,
};
