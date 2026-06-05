//  General JS Library importation
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AsyncPaginate } from "react-select-async-paginate";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import ErrorMsg from "components/ErrorMsg";
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text[2],
    background: theme.palette.background.content[2],
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    display: `flex`,
    flexWrap: `none`,
    [theme.breakpoints.between("xs", "md")]: {
      marginRight: 0,
      // marginBottom:theme.spacing(2),
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
    "& .css-1rhbuit-multiValue": {
      "& >div": {
        fontSize: `0.875rem`,
      },
    },
  },
  button: {
    marginLeft: theme.spacing(1),
    fontSize: `0.75rem`,
    backgroundColor: `${theme.palette.charts[3]} !important`,
    color: `${theme.palette.text[5]} !important`,
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    [theme.breakpoints.between("xs", "md")]: {
      marginRight: 0,
    },
    [theme.breakpoints.down("md")]: {
      display: `none`,
    },
    "&:hover": {
      backgroundColor: theme.palette.charts[4],
    },
  },
  select: {
    border: `1px solid red`,
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
      border: `1px solid ${theme.palette.line[3]}`,
    },
    "& div": {
      color: theme.palette.text[2],
    },
    "& svg": {
      color: theme.palette.text[3],
    },
    "& .MuiChip-label": {
      color: theme.palette.text[3],
    },
  },
  errorMsg: {
    // position: "absolute",
    // marginTop: "40px",
  },
  input: {
    // border:'1px solid red',
    display: "flex",
    height: "auto",
    padding: 0,
    paddingLeft: "0.5em",
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  singleValue: {
    fontSize: "0.875rem",
    padding: 0,
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  paper: {
    marginTop: theme.spacing(1),
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },
  placeholder: {
    border: `1px solid red !important`,
    // bottom: 6,
    // left: 10,
    // position: 'absolute',
    // fontSize: '0.86em',
    // color: `${theme.palette.text.disabled} !important`,
  },
  removeIcon: {
    padding: theme.spacing(0),
  },
  chip: {
    margin: `calc(${theme.spacing(0.5)} ${theme.spacing(0.25)})`,
  },
  chipFocused: {
    backgroundColor: "#E5F9FF",
    "& :hover": {
      backgroundColor: "#E5F9FF",
    },
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: `${theme.spacing(0.5)} !important`,
    paddingBottom: theme.spacing(1.5),
    color: theme.palette.text[1],
    wordBreak: "break-all",
  },
}));

const AsyncAutoComplete = ({ inputField, hooks, onChange, section, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { loadAsyncDropdown } = useForm(hooks);
  const [optionValue, setOptionValue] = useState("");
  const {
    name = "",
    value = "",
    isMulti = false,
    errorMsg = "",
    isRequired = false,
    placeholder = "",
    isTouched = false,
    isValid = false,
    isEnabled = false,
    isPreview,
    sameError = false,
    autoDelay = 700,
  } = inputField;
  const acIDArr = ["acId", "acIdTo", "acIdFr"];

  // handle input change event
  const handleInputChange = (tmpValue) => setOptionValue(tmpValue);

  return (
    <>
      {isPreview ? (
        <div className={classes.preview}>
          {isMulti &&
            value?.length > 0 &&
            value.map((v, i) => {
              const valueDisplay = v?.label ? v?.label : value?.value || "----";
              return i === value.length - 1 ? (
                <div key={`itemDisplay-${i}`}>{valueDisplay}</div>
              ) : (
                <div key={`itemDisplay-${i}`}>{`${valueDisplay}, `}</div>
              );
            })}
          {isMulti && (!value || value?.length === 0) && <div>----</div>}
          {!isMulti && value && <div>{value?.label || value?.value || "----"}</div>}
        </div>
      ) : (
        <div
          className={`${isRequired && isTouched && !isValid ? classes.errorBorder : ``} ${classes.root} ${
            !isEnabled && classes.isDisabled
          }`}
        >
          <AsyncPaginate
            key={name}
            id={name}
            name={name}
            value={value}
            components={!optionValue ? { LoadingIndicator: null } : ""}
            // loadOptions={() =>
            //   acIDArr.includes(name)
            //     ? [3, 13].includes(optionValue.length) && loadAsyncDropdown(inputField, optionValue)
            //     : optionValue && optionValue.length > 2 && loadAsyncDropdown(inputField, optionValue)
            // }
            loadOptions={() => optionValue && optionValue.length > 2 && loadAsyncDropdown(inputField, optionValue)}
            debounceTimeout={autoDelay}
            className={classes.async}
            isClearable
            isMulti={isMulti || false}
            isDisabled={!isEnabled}
            required={isRequired || false}
            handleChange={onChange}
            onInputChange={handleInputChange}
            placeholder={placeholder ? `${t(`${placeholder}`)}` : ""}
            onChange={onChange}
            {...{ ...props, classes }}
            fullWidth
          />
        </div>
      )}

      {isRequired && isTouched && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
      {sameError && <ErrorMsg className={classes.errorMsg} type="error" label={t(`${"bpmp:bpmp.sameErrorMsg"}`)} />}
    </>
  );
};

export default AsyncAutoComplete;

AsyncAutoComplete.propTypes = {
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
