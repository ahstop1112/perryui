//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Typography, TextField, Paper, MenuItem, IconButton, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorMsg from "components/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text[2],
    background: theme.palette.background.content[2],
    border: `none !important`,
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
    "& .MuiChip-root": {
      margin: 0,
    },
    "& .css-1rhbuit-multiValue": {
      background: `none`,
      "& >div": {
        fontSize: `0.875rem`,
      },
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
      "&.css-1rhbuit-multiValue >div.MuiChip-root": {
        background: `#dedede`,
      },
    },
    "& svg": {
      color: theme.palette.text[3],
    },
    "& .MuiChip-label": {
      color: theme.palette.text[3],
      background: `none`,
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

const MultiValue = ({ children, selectProps, isFocused = false }) => {
  return (
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
};

MultiValue.propTypes = {
  children: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
  selectProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
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

const AutoCompleteWithFreeText = ({ inputField, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const {
    name = "",
    value = "",
    placeholder = "",
    data = [],
    isMulti = false,
    errorMsg = "",
    isShown = false,
    isRequired = false,
    isTouched = false,
    isValid = false,
    isEnabled = false,
    isPreview = false,
    fromApi = false,
  } = inputField;

  const convertI18nArr = (data) => {
    const newData = [];

    data.map((item) => {
      if (item?.size && item?.price) {
        newData.push({ label: t(item.label), value: item.value, size: item.size, price: item.price });
      } else {
        newData.push({ label: t(item.label), value: item.value });
      }
      return newData;
    });
    return newData;
  };

  const convertI18nValue = (dropdownVal) => {
    return { label: t(dropdownVal.label), value: dropdownVal.value };
  };

  return (
    <>
      {isPreview && isShown ? (
        <div className={classes.preview}>{/* {!value.label ? `----` : t(`${value.label}`)} */}</div>
      ) : (
        <div
          className={`${isTouched && isRequired && !isValid ? classes.errorBorder : ``} ${classes.root} ${
            !isEnabled && classes.isDisabled
          }`}
        >
          <CreatableSelect
            style={colourStyles}
            className={classes.select}
            name={name}
            value={!isMulti ? value && convertI18nValue(value) : value && value.length > 0 && value}
            openOnFocus
            isClearable
            isMulti={isMulti}
            placeholder={placeholder ? `Please Select ${t(`${placeholder}`)}` : ""}
            options={fromApi ? data : convertI18nArr(data)}
            textFieldProps={{
              InputLabelProps: {
                shrink: true,
              },
            }}
            components={{ MultiValueLabel: MultiValue }}
            isDisabled={!isEnabled}
            required={isRequired}
            {...{ ...props, classes }}
            fullWidth
          />
        </div>
      )}
      {isTouched && isRequired && !isValid && !isPreview && errorMsg && (
        <ErrorMsg className={classes.errorMsg} type="error" label={t(`${errorMsg}`)} />
      )}
    </>
  );
};

export default AutoCompleteWithFreeText;

AutoCompleteWithFreeText.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    placeholder: PropTypes.string.isRequired,
    isMulti: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
