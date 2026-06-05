import React from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
//  Getting the Common Hooks from core/store/hooks
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
//  Framework Form Components
//  TransferList
import TransferList from "components/TransferList";
//  Text: TextField, NumberField, FilltedTextField, TextArea
import TextFieldCustomError from "components/TextFieldCustomError";
import TextAreaCustomError from "components/TextAreaCustomError";
import NumberFieldCustomError from "components/NumberFieldCustomError";
import FilledTextFieldCustomError from "components/FilledTextFieldCustomError";
//  Select: Radio Butotn, CheckBox, Switcher
import RadioButton from "components/RadioButton";
import CheckBox from "components/CheckBox";
import Switcher from "components/Switcher";
//  Dropdown: Dropdown (fill in and call the API), Dropdown (fill in and click to call the API), Dropdown (normal), Dropdown with Free Text, Dropdown with Button
import AsyncAutoComplete from "components/AsyncAutoComplete";
import AsyncClickAutoComplete from "components/AsyncClickAutoComplete";
import AutoComplete from "components/AutoComplete";
import AutoCompleteWithFreeText from "components/AutoCompleteWithFreeText";
import AutoCompleteWithButton from "components/AutoCompleteWithButton";
//  Data List: Data List, Data Table,
import DataList from "components/DataList";
import DataTable from "components/DataTable";
//  Date Fields: Date, Date and Time, Date Range
import DateOnlyPicker from "components/DateOnlyPicker";
import DateTimePicker from "components/DateTimePicker";
import DateRange from "components/DateRange";
//  File Upload Area
import FileUploadArea from "components/FileUploadArea";
import ClickButton from "../ClickButton";
import InputLabel from "./InputLabel";

const useStyles = makeStyles((theme) => ({
  row: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
  form: {
    width: "100%",
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid #eee`,
    textAlign: `center`,
    "& button": {
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
      color: theme.palette.text[5],
      background: theme.palette.button[1],

      cursor: "pointer",
      outline: "medium",
      border: "none",
      borderRadius: theme.spacing(0.5),
    },
  },
  tagline: {
    width: `100%`,
    margin: `${theme.spacing(2)} 0`,
    borderTop: `1px solid ${theme.palette.line[3]}`,
  },
  sectionLine: {
    width: `100%`,
    height: 10,
    margin: `${theme.spacing(2)} 0`,
    color: theme.palette.text[13],
    borderBottom: `1px solid ${theme.palette.line[3]}`,
  },
  addButton: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.searchBar,
    color: theme.palette.text[4],
    borderRadius: theme.spacing(0.5),
    padding: `0 ${theme.spacing(2)}`,
    [theme.breakpoints.between("xs", "md")]: {
      marginRight: 0,
    },
    [theme.breakpoints.between("sm", "lg")]: {
      marginRight: theme.spacing(2),
    },
    "&:hover": {
      backgroundColor: theme.palette.background.searchBar,
      color: theme.palette.text[4],
    },
  },
  header: {
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  notice: {
    paddingTop: theme.spacing(3),
  },
  subTitle: {
    lineHeight: 1.2,
    fontSize: `1rem`,
    color: theme.palette.text[2],
    margin: `${theme.spacing(1)} 0 0`,
    [theme.breakpoints.down("sm")]: {
      fontSize: `1rem`,
    },
  },
  subSubSubTitle: {
    fontSize: `0.75rem`,
    lineHeight: 1.5,
    color: theme.palette.text[2],
  },
  sectionHeader: {
    backgroundColor: theme.palette.text[1],
    color: theme.palette.text[5],
    fontSize: `1rem`,
    margin: `${theme.spacing(2)}  -${theme.spacing(1.5)}`,
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    width: `110%`,
  },
  item: {
    width: "100%",
    alignItems: `flex-start`,
    "& div.react-datepicker-wrapper": {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(1),
      },
    },
    "& input": {
      width: "100%",
      color: theme.palette.text[2],
      padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
      lineHeight: 1,
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.line[3]}`,
      "&:disabled": {
        backgroundColor: theme.palette.background.disabled,
        color: theme.palette.text[2],
        "-webkit-text-fill-color": theme.palette.text[2],
        fontSize: `0.875rem`,
      },
    },
    "& fieldset": {
      borderColor: `${theme.palette.line[3]} !important`,
    },
  },
  textField: {
    width: `100%`,
  },
  checkbox: {
    width: `auto`,
  },
  async: {
    width: `100%`,
  },
  descHasLabel: {
    fontSize: `0.85rem`,
    lineHeight: 4.6,
    color: theme.palette.text[2],
  },
  descNoLabel: {
    fontSize: `0.85rem`,
    lineHeight: 3.2,
    color: theme.palette.text[2],
  },
  descNoLabelLineHeight: {
    fontSize: `0.85rem`,
    lineHeight: 1.8,
    color: theme.palette.text[2],
  },
  descNoLabelTitle: {
    fontSize: `0.85rem`,
    lineHeight: 1.8,
    fontWeight: "bold",
    color: theme.palette.text[2],
  },
}));

const DynamicFormInputs = ({
  autoFocus,
  hooks,
  inputField,
  section,
  pageAction,
  parentField,
  grandParentField,
  onDropdownButton,
  fields,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { onInputChange, onClick } = useForm(hooks);
  const {
    label = "",
    value = "",
    showLabel = true,
    type = "text",
    isPreview = false,
    display = "normal",
    minSize = 0,
    maxSize = 5242880,
  } = inputField;

  return (
    <>
      {type === "notice" ? (
        <div className={classes.notice} style={{ color: inputField.color }}>
          <Trans
            i18nKey={label}
            components={{
              title: <strong />,
              bold: <strong />,
              list: <ul />,
              point: <li />,
              br: <br />,
              small: <small />,
            }}
          />
        </div>
      ) : null}
      {type === "subTitle" ? (
        <h4 className={classes.subTitle}>
          <Trans i18nKey={label} components={{ nextLine: <br /> }} />
        </h4>
      ) : null}
      {type === "subSubTitle" ? <h6 className={classes.subSubTitle}>{t(`${label}`)}</h6> : null}
      {type === "subSubSubTitle" ? <span className={classes.subSubSubTitle}>{t(`${label}`)}</span> : null}
      {type === "sectionHeader" ? <h4 className={classes.sectionHeader}>{t(`${label}`)}</h4> : null}
      {type === "tagline" ? <div className={classes.tagline} /> : null}
      {
        //  If the input Type is not the title / subTitle / tagline / dataTable / notice, it will use the Form Label
        label &&
          showLabel &&
          type !== "notice" &&
          type !== "sectionHeader" &&
          type !== "subTitle" &&
          type !== "subSubTitle" &&
          type !== "subSubSubTitle" &&
          type !== "tagline" &&
          display !== "small" &&
          type !== "dataTable" &&
          type !== "descHasLabel" &&
          type !== "descNoLabel" &&
          !isPreview && <InputLabel inputField={inputField} />
      }

      {isPreview &&
        type !== "notice" &&
        type !== "subTitle" &&
        type !== "subSubTitle" &&
        type !== "subSubSubTitle" &&
        type !== "descHasLabel" &&
        type !== "descNoLabel" && <InputLabel inputField={inputField} />}
      <div className={classes.item}>
        {type === "text" || type === "password" || type === "email" ? (
          <TextFieldCustomError
            className={classes.textField}
            autoFocus={autoFocus}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        ) : null}
        {type === "number" ? (
          <NumberFieldCustomError
            className={classes.textField}
            autoFocus={autoFocus}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        ) : null}
        {type === "filledText" || type === "filledPassword" ? (
          <FilledTextFieldCustomError
            className={classes.textField}
            autoFocus={autoFocus}
            pageAction={pageAction}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        ) : null}
        {type === "radioButton" && (
          <RadioButton
            className={classes.radioButton}
            showLabel={showLabel}
            autoFocus={autoFocus}
            pageAction={pageAction}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "checkbox" && (
          <CheckBox
            className={classes.checkbox}
            showLabel={showLabel}
            autoFocus={autoFocus}
            inputField={inputField}
            hooks={hooks}
            section={section}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "switcher" && (
          <Switcher
            className={classes.switcher}
            autoFocus={autoFocus}
            pageAction={pageAction}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "button" && (
          <ClickButton
            color="prmiary"
            type="button"
            value="button"
            className={classes.button}
            section={section}
            inputField={inputField}
            onClick={(e) => onClick(e, inputField, pageAction, section, fields, parentField, grandParentField)}
          />
        )}
        {type === "dropdown" && (
          <AutoComplete
            className={classes.dropdown}
            autoFocus={autoFocus}
            section={section}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "dropdownFreeText" && (
          <AutoCompleteWithFreeText
            className={classes.dropdown}
            autoFocus={autoFocus}
            section={section}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "dropdownButton" && onDropdownButton && (
          <AutoCompleteWithButton
            className={classes.dropdown}
            autoFocus={autoFocus}
            section={section}
            inputField={inputField}
            hooks={hooks}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "asyncDropdown" && (
          <AsyncAutoComplete
            className={classes.async}
            inputField={inputField}
            section={section}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
            hooks={hooks}
          />
        )}
        {type === "asyncClickDropdown" && (
          <AsyncClickAutoComplete
            className={classes.async}
            inputField={inputField}
            section={section}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
            hooks={hooks}
          />
        )}
        {type === "textArea" && (
          <TextAreaCustomError
            rows="5"
            className={classes.textArea}
            autoFocus={autoFocus}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
            additional={{
              page: 1,
            }}
          />
        )}
        {type === "dataList" && <DataList className={classes.dataList} inputField={inputField} hasAttach={false} />}
        {type === "attachmentList" && <DataList className={classes.dataList} inputField={inputField} hasAttach />}
        {type === "dataTable" && value && value.length > 0 && (
          <DataTable
            className={classes.dataList}
            inputField={inputField}
            listColumns={inputField?.dataTableColumns ? inputField?.dataTableColumns : hooks?.state?.dataTableColumns}
          />
        )}
        {type === "date" && (
          <DateOnlyPicker
            className={classes.datePicker}
            autoFocus={autoFocus}
            pageAction={pageAction}
            inputField={inputField}
            onDateChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
            hooks={hooks}
          />
        )}
        {type === "dateTime" && (
          <DateTimePicker
            className={classes.datePicker}
            autoFocus={autoFocus}
            pageAction={pageAction}
            inputField={inputField}
            onDateChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "dateRange" && (
          <DateRange
            className={classes.datePicker}
            autoFocus={autoFocus}
            inputField={inputField}
            showTime={false}
            onInputChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "dateTimeRange" && (
          <DateRange
            className={classes.datePicker}
            autoFocus={autoFocus}
            pageAction={pageAction}
            inputField={inputField}
            showTime
            onInputChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "transferList" && (
          <TransferList
            className={classes.transferList}
            pageAction={pageAction}
            inputField={inputField}
            onChange={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "fileUpload" && (
          <FileUploadArea
            className={classes.fileUploadArea}
            pageAction={pageAction}
            inputField={inputField}
            minSize={minSize}
            maxSize={maxSize}
            hooks={hooks}
            section={section}
            onDrop={(e) => onInputChange(e, inputField, pageAction, section, parentField, grandParentField)}
          />
        )}
        {type === "descHasLabel" ? <span className={classes.descHasLabel}>{t(`${label}`)}</span> : null}
        {type === "descNoLabel" ? (
          <span
            className={
              inputField.descNoLabelTitle
                ? classes.descNoLabelTitle
                : inputField.lineHeight
                ? classes.descNoLabelLineHeight
                : classes.descNoLabel
            }
          >
            {t(`${label}`)}
          </span>
        ) : null}
      </div>
    </>
  );
};

export default DynamicFormInputs;

DynamicFormInputs.propTypes = {
  inputField: PropTypes.objectOf(PropTypes.any).isRequired,
  pageAction: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
};
