//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import Select from "react-select";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Typography, TextField, Paper, MenuItem, IconButton, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
//  Getting the Common Hooks from core/store/hooks
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
//  Framework Components
import ButtonContained from "components/ButtonContained";
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: `flex`,
    flexWrap: `noWrap`,
    flex: `0 0 100%`,
    // justifyContent: `space-between`,
    color: theme.palette.text[2],
    border: `none !important`,
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.between("xs", "md")]: {
      marginRight: 0,
      // marginBottom:theme.spacing(2),
    },
    "& >div": {
      width: `45%`,
      borderColor: `#ddd`,
      borderWidth: `1px`,
      marginRight: theme.spacing(2),
      // boxShadow: `none`,
    },
    "& .css-yk16xz-control": {
      border: `1px solid ${theme.palette.line[3]}`,
      minHeight: 40,
    },
    "& :before": {
      borderBottom: "none !important",
    },
    "& :after": {
      borderBottom: "none !important",
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: `${theme.palette.background.content[2]} !important`,
    },
    "& :hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& :hover:not(.Mui-disabled):after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0 !important",
    },
    "& p": {
      color: theme.palette.text[2],
    },
    "& .MuiPaper-elevation1": {
      backgroundColor: theme.palette.background.content[2],
    },
    "& .MuiFormControl-root": {
      padding: `${theme.spacing(0.25)} 0`,
    },
    "& .css-1wa3eu0-placeholder": {
      fontSize: `0.92em`,
      opacity: 0.55,
    },
    "& .PROCESSING": {
      color: theme.palette.text[13],
    },
  },
  select: {
    margin: theme.spacing(0.3, 1.25, 0, 0),
    padding: theme.spacing(1.2, 0, 0, 0),
    width: "100%",
  },
  errorBorder: {
    border: `1px solid ${theme.palette.errorRed} !important`,
  },
  isDisabled: {
    color: theme.palette.text[2],
    background: theme.palette.background.disabled,
    "& .css-1fhf3k1-control": {
      border: `1px solid #ddd`,
    },
    "& div": {
      color: theme.palette.text[2],
      background: theme.palette.background.disabled,
    },
    "& svg": {
      color: theme.palette.text[2],
    },
    "& .MuiChip-label": {
      color: theme.palette.text[2],
      background: `none`,
    },
  },
  button: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(3)}`,
    cursor: "pointer",
    border: "none",
    borderRadius: theme.spacing(3),
    background: theme.palette.button[4],
    color: theme.palette.text[5],
    fontSize: `0.875rem`,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    marginRight: 0,
    "&.Mui-disabled": {
      color: theme.palette.text[4],
      background: theme.palette.button.disabled,
    },
  },
}));

const ClickButton = ({ inputField, onDropdownButton, hooks, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name = "",
    value = "",
    placeholder = "",
    buttonTitle = "",
    data = [],
    isMulti = false,
    errorMsg = "",
    isRequired = false,
    isTouched = false,
    isValid = false,
    isEnabled = false,
  } = inputField;
  // const { loadAsyncClickDropdown } = useForm(hooks);

  return (
    <>
      <div className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``} ${classes.root}`}>
        <ButtonContained
          color="prmiary"
          type="button"
          value="button"
          disabled={!isEnabled}
          className={classes.button}
          onClick={props.onClick}
        >
          {t(`${buttonTitle}`)}
        </ButtonContained>
      </div>
      {isTouched && isRequired && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
    </>
  );
};

export default ClickButton;

ClickButton.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // isMulti: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    // errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
