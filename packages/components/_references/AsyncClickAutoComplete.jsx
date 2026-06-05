//  General JS Library importation
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import Select from "react-select";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Typography, TextField, Paper, MenuItem, IconButton, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
//  Getting the Common Hooks from core/store/hooks
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
//  Getting the BPMP Hooks from bpmp/core/store/hooks
import useCounterParty from "bpmp/core/store/hooks/useCounterParty";
//  Framework Components
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: `flex`,
    flexWrap: `noWrap`,
    flexGrow: 1,
    color: theme.palette.text[2],
    // border: `none !important`,
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.between("xs", "md")]: {
      marginRight: 0,
      // marginBottom:theme.spacing(2),
    },
    "& div": {
      borderColor: `#ddd`,
      borderWidth: `1px`,
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
    "& .css-1rhbuit-multiValue": {
      background: `none`,
      margin: 0,
      "& >div": {
        fontSize: `0.875rem`,
        color: theme.palette.text[2],
        margin: 0,
      },
    },
  },
  select: {
    margin: theme.spacing(0.3, 1.25, 0, 0),
    padding: theme.spacing(1.2, 0, 0, 0),
    width: "100%",
  },
  errorBorder: {
    "& > div": {
      border: `1px solid ${theme.palette.errorRed} !important`,
      borderRadius: theme.spacing(0.5),
    },
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
  search: {
    fontSize: `1.75rem`,
    maxHeight: 30,
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    color: theme.palette.text[3],
    cursor: "pointer",
    outline: "medium",
    border: "none",
  },
  cancel: {
    fontSize: `1.75rem`,
    maxHeight: 30,
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    color: theme.palette.button[1],
    cursor: "pointer",
    outline: "medium",
    border: "none",
  },
  preview: {
    lineHeight: 1.43,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.75),
    color: theme.palette.text[1],
  },
}));

const NoOptionsMessage = ({ children }) => <Typography color="textSecondary">{children}</Typography>;
NoOptionsMessage.propTypes = { children: PropTypes.string.isRequired };

const inputComponent = ({ inputRef, inputProps }) => <div ref={inputRef} {...inputProps} />;

const Control = ({ innerRef, children, innerProps, selectProps }) => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        innerRef,
        children,
        ...innerProps,
      },
    }}
    {...selectProps.textFieldProps}
  />
);
Control.propTypes = {
  innerRef: PropTypes.string.isRequired,
  children: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  innerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400,
      fontSize: "0.875rem",
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);
Option.propTypes = {
  innerRef: PropTypes.string.isRequired,
  // isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  innerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  children: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const SingleValue = ({ selectProps, innerProps, children }) => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>
);
SingleValue.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  innerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  children: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const ValueContainer = ({ selectProps, children }) => (
  <div className={selectProps.classes.valueContainer}>{children}</div>
);
ValueContainer.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  children: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const Menu = ({ selectProps, innerProps, children }) => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);
Menu.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  innerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  children: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const ClearIndicator = ({ innerProps, selectProps }) => (
  <IconButton {...innerProps} className={selectProps.classes.removeIcon} size="large">
    <CancelIcon />
  </IconButton>
);
ClearIndicator.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  innerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const MultiValue = ({ children, selectProps, isFocused }) => (
  <Chip
    tabIndex={-1}
    label={children}
    className={clsx(selectProps.classes.chip, {
      [selectProps.classes.chipFocused]: isFocused,
    })}
    // onDelete={removeProps.onClick}
    // deleteIcon={<CancelIcon {...removeProps} />}
  />
);
MultiValue.propTypes = {
  children: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
  // selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  // isFocused: PropTypes.bool.isRequired,
};

const LoadingMessage = ({ selectProps, innerProps, children }) => (
  <Typography color="textSecondary" className={selectProps.classes.noOptionsMessage} {...innerProps}>
    {children}
  </Typography>
);
LoadingMessage.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  innerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  children: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const colors = data.color;
    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? colors.alpha(0.1).css() : null,
      // color: data.color,
      color: `#ff0000`,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : colors.alpha(0.3).css()),
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const AsyncClickAutoComplete = ({ inputField, hooks, section, onChange, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { loadAsyncClickDropdown } = useForm(hooks);
  const { updateCounterPartyFields } = useCounterParty(hooks);
  const {
    name = "",
    value = "",
    placeholder = "",
    data = [],
    isEnabled = false,
    isMulti = false,
    isRequired = false,
    isTouched = false,
    isValid = false,
    isPreview = false,
    autoDelay = null,
    errorMsg,
    sameError = false,
    searchLength = 0,
  } = inputField;

  const [dropdownValue, setDropdownValue] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setInputChange = (inputValue, e) => {
    if (e.action !== "input-blur" && e.action !== "menu-close") {
      setDropdownValue(inputValue);
    }
    // console.log(inputValue);
    if (inputValue.length === 0 && name.includes("counterpartyCcassId"))
      updateCounterPartyFields(inputField, section, "");

    if (inputValue.length === 0 && name.includes("counterpartyName")) updateCounterPartyFields(inputField, section, "");
  };

  useEffect(() => {
    if (autoDelay && autoDelay !== 0 && dropdownValue?.length > searchLength) {
      const handleDelay = setTimeout(() => {
        setIsLoading(true);
        loadAsyncClickDropdown(inputField, section, dropdownValue).then(() => {
          setMenuIsOpen(true);
          setIsLoading(false);
        });
      }, autoDelay);
      return () => {
        clearTimeout(handleDelay);
      };
    }
    return () => false;
  }, [dropdownValue]);

  return (
    <>
      <div
        className={`${classes.root} ${isTouched && isRequired && !isValid && errorMsg ? classes.errorBorder : ``} ${
          !isEnabled && classes.isDisabled
        }`}
      >
        {isPreview ? (
          <div className={classes.preview}>
            {/* {Object.keys(value).length > 0 && value?.value === '' ? '----' : value?.value} */}
            {/* {value &&
            Array.isArray(value) &&
            value.length > 0 &&
            value.map((item) =>
              !item.label ? (
                `----`
              ) : dataFromApi ? (
                <span key={item.value}>{`${item.label} `}</span>
              ) : (
                t(`${item.label}`)
              ),
            )}
          {!Array.isArray(value) && value ? value : ''} */}
          </div>
        ) : (
          <>
            <Select
              style={colourStyles}
              className={`${classes.select}`}
              arrowRenderer={null}
              name={name}
              inputValue={dropdownValue}
              value={value}
              menuIsOpen={menuIsOpen}
              openOnFocus={!menuIsOpen}
              isLoading={isLoading}
              isClearable
              isMulti={isMulti || false}
              placeholder={placeholder ? `${t(`${placeholder}`)}` : ""}
              options={data}
              textFieldProps={{
                InputLabelProps: {
                  shrink: true,
                },
              }}
              onInputChange={setInputChange}
              onChange={onChange}
              onBlur={() => setMenuIsOpen(false)}
              components={{ MultiValueLabel: MultiValue }}
              isDisabled={!isEnabled}
              required={isRequired || false}
              {...{ ...props, classes }}
              fullWidth
            />
            <SearchIcon
              onClick={() => {
                setMenuIsOpen(true);
                loadAsyncClickDropdown(inputField, section, dropdownValue);
              }}
              onBlur={() => setMenuIsOpen(false)}
              className={classes.search}
            />
          </>
        )}
      </div>
      {isTouched && isRequired && !isValid && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
      {sameError && <ErrorMsg className={classes.errorMsg} type="error" label={t(`${"bpmp:bpmp.sameErrorMsg"}`)} />}
    </>
  );
};

export default AsyncClickAutoComplete;

AsyncClickAutoComplete.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // value: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.any)]).isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
