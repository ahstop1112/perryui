//  General JS Library importation
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Collapse, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Hidden } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
//  Getting the Common Hooks from core/store/hooks
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
//  Framework Components
import ButtonContained from "components/ButtonContained";
import DynamicFormInputs from "components/DynamicForm/FormInputs";
import DynamicFormMultiple from "components/DynamicForm/Multiple";

const useStyles = makeStyles((theme) => ({
  form: {
    width: `100%`,
  },
  searchContainer: {
    display: `flex`,
    flexWrap: `wrap`,
    alignItems: `center`,
    width: `98%`,
    margin: `0 auto`,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: `100%`,
      marginTop: 0,
    },
    "& fieldset": {
      width: `100%`,
      display: `flex`,
      flexWrap: `wrap`,
      alignItems: `center`,
      border: `none`,
    },
    "& .react-datepicker__close-icon": {
      border: `none`,
    },
  },
  searchIcon: {
    // cursor: `pointer`,
    marginRight: theme.spacing(1.5),
    display: `none`,
    alignItems: `center`,
    "& svg": {
      color: theme.palette.text[1],
    },
    [theme.breakpoints.down("md")]: {
      display: `flex`,
    },
  },
  expandedIcon: {
    cursor: `pointer`,
    marginRight: theme.spacing(1),
  },
  searchLongField: {
    display: `flex`,
    flexWrap: `noWrap`,
    alignItems: `center`,
    flex: 1,
    borderRadius: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .Mui-disabled": {
      color: theme.palette.text[3],
    },
    "& >div": {
      paddingBottom: 0,
    },
    "& .MuiTextField-root": {
      paddingBottom: 0,
    },
    // '&:hover': {
    //     border: `1px solid ${theme.palette.primary.main}`,
    //     background: '#F7FDFF'
    // },
    "& input": {
      // border: `1px solid red`,
      color: theme.palette.text[2],
      padding: `${theme.spacing(1.5)} ${theme.spacing(1)}`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: `${theme.palette.background.content[2]} !important`,
      border: `none`,
      fontSize: "0.875rem",
      width: `100%`,
      outline: `none`,
      "&::placeholder": {
        fontSize: `0.92em`,
        opacity: 0.35,
      },
      "&::focus": {
        border: `none`,
      },
      "&::disabled": {
        opacity: 0.35,
        color: `${theme.palette.text[5]} !important`,
      },
    },
    "& .MuiFormHelperText-root": {
      display: `none`,
    },
  },
  searchBtnContainer: {
    display: `flex`,
    alignItems: `center`,
  },
  textField: {
    "&>div": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& input": {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
  keywordsContainer: {
    marginLeft: theme.spacing(1.5),
  },
  keyword: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: 30,
    backgroundColor: theme.palette.button[1],
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    color: theme.palette.text[5],
    fontSize: `0.75rem`,
  },
  searchLongButton: {
    marginRight: theme.spacing(0.5),
    backgroundColor: `${theme.palette.button[4]} !important`,
    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
    color: `${theme.palette.text[5]} !important`,
    display: `block`,
    borderRadius: theme.spacing(3),
    "&:hover": {
      backgroundColor: `${theme.palette.button[4]} !important`,
      color: `${theme.palette.text[5]} !important`,
    },
    "&.Mui-disabled": {
      color: theme.palette.text[13],
    },
    [theme.breakpoints.down("md")]: {
      display: `none`,
    },
  },
  resetLongButton: {
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.button.secondary,
    borderRadius: theme.spacing(3),
    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
    color: theme.palette.text[4],
    [theme.breakpoints.down("md")]: {
      display: `none`,
    },
    "&.Mui-disabled": {
      color: theme.palette.text[3],
    },
  },
  searchCollapse: {
    width: `100%`,
    [theme.breakpoints.down("md")]: {
      "& .MuiCollapse-wrapper": {
        // position: `absolute`,
        // left: 0,
        // zIndex: 999,
        padding: theme.spacing(2),
        paddingTop: 0,
      },
    },
  },
  advanceSearchContainer: {
    width: `50%`,
    maxWidth: 650,
    borderTop: `1px solid ${theme.palette.background.default}`,
    backgroundColor: theme.palette.background.navbar,
    boxShadow: theme.palette.shadow[1],
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1.5),
    alignItems: `flex-start`,
    position: `absolute`,
    marginTop: 15,
    right: 20,
    zIndex: 999,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    "& .arrow": {
      borderLeft: `10px solid transparent`,
      borderRight: `10px solid transparent`,
      borderBottom: `10px solid #fff`,
      position: `absolute`,
      right: `29%`,
      marginTop: -20,
    },
  },
  btnContainer: {
    marginTop: theme.spacing(1),
  },
  searchButton: {
    backgroundColor: theme.palette.button[1],
    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
    marginRight: theme.spacing(2),
    color: theme.palette.text[5],
    "&:hover": {
      backgroundColor: theme.palette.button[2],
      color: theme.palette.text[5],
    },
    [theme.breakpoints.down("sm")]: { marginRight: 0 },
  },
  searchItem: {
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      "& :nth-child(even)": {
        paddingRight: 0,
      },
    },
  },
  resetButton: {
    backgroundColor: theme.palette.button.secondary,
    color: theme.palette.text[4],
    padding: `0 ${theme.spacing(2.5)}`,
    marginRight: 0,
    "&:hover": {
      backgroundColor: theme.palette.background.searchBar,
      color: theme.palette.text[4],
    },
  },
  addButton: {
    backgroundColor: theme.palette.button.secondary,
    color: theme.palette.text[4],
    padding: `0 ${theme.spacing(2.5)}`,
    marginRight: 0,
    "&:hover": {
      backgroundColor: theme.palette.background.searchBar,
      color: theme.palette.text[4],
    },
  },
  dropdown: {
    "& .MuiFormControl-root": {
      padding: 0,
    },
    "& .makeStyles-placeholder-75": {
      color: theme.palette.text[3],
    },
  },
  alertDialog: {
    "& .MuiDialog-paper": {
      background: theme.palette.background.content[2],
      color: theme.palette.text[2],
    },
    "& p": {
      color: theme.palette.text[4],
    },
    "& button": {
      color: theme.palette.text[3],
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiDialog-paper": {
        maxWidth: `none`,
        maxHeight: `none`,
        width: `100%`,
        height: `100%`,
        margin: 0,
        borderRadius: 0,
      },
    },
  },
  alertDialogTitle: {
    "& h2": {
      fontSize: `1rem !important`,
    },
  },
  dialogActions: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    "& button": {
      padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
      borderRadius: theme.spacing(5),
      border: `1px solid ${theme.palette.button.secondary}`,
      background: theme.palette.button.secondary,
      color: theme.palette.text[4],
    },
    "& button.search": {
      backgroundColor: theme.palette.button[1],
      color: theme.palette.text[5],
    },
  },
  multipleSection: {
    margin: 0,
    "& h4": {
      fontWeight: 400,
      fontSize: 12,
    },
  },
  multipleItem: {
    padding: 0,
  },
}));

const SearchContainer = ({ searchResult, resetSearch, hooks, searchName, resetOptions = {} }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();
  const navigate = useNavigate();
  const { keywordField: SearchLongInput, fields: SearchInputs, suggestedKeywords } = hooks?.state[searchName].search;
  const [open, setOpen] = useState(false);

  const onSearch = (e) => {
    setOpen(false);
    searchResult(e);
  };

  const onReset = () => {
    hooks?.dispatch({ type: "RESET_SEARCH_INPUT", title: searchName });
    resetSearch();
    navigate({ search: resetOptions?.search?.length > 0 ? resetOptions?.search : "" });
  };

  const showAdvancedSearch = () => {
    setOpen((prev) => !prev);
    hooks?.dispatch({ type: "SET_SEARCH_TYPE", open });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      onSearch();
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={(e) => onSearch(e)} onKeyPress={handleKeyPress} className={classes.searchContainer}>
      <Grid container item lg={12} md={12} sm={12} xs={12} alignItems="center">
        <div className={classes.searchLongField}>
          {Object.keys(SearchLongInput).length > 0 &&
            Object.keys(SearchLongInput).map((item) => (
              <DynamicFormInputs
                key={item}
                autoFocus={false}
                pageAction="search"
                hooks={hooks}
                inputField={SearchLongInput[item]}
                section="search"
                formSection={SearchInputs}
              />
            ))}

          <div aria-hidden="true" className={classes.searchIcon} onClick={onSearch} onKeyDown={onSearch}>
            <SearchIcon />
          </div>
        </div>
        <div className={classes.searchBtnContainer}>
          {Object.keys(SearchInputs).length > 0 && (
            <FilterListIcon className={classes.expandedIcon} onClick={showAdvancedSearch} />
          )}
          <ButtonContained
            type="button"
            value="button"
            color="primary"
            className={classes.searchLongButton}
            onClick={(e) => onSearch(e)}
            disabled={false}
          >
            {t("commons.search")}
          </ButtonContained>
          <ButtonContained
            type="button"
            value="button"
            color="secondary"
            className={classes.resetLongButton}
            onClick={onReset}
            disabled={false}
          >
            {t("commons.reset")}
          </ButtonContained>
        </div>
      </Grid>
      <Hidden only={["xs", "sm"]}>
        <Collapse className={classes.searchCollapse} in={open}>
          <Grid container item lg={12} alignItems="center" className={classes.advanceSearchContainer}>
            <div className="arrow" />
            <Grid container item lg={12} md={12} sm={12} xs={12}>
              {Object.keys(SearchInputs).length > 0 &&
                Object.keys(SearchInputs)
                  .filter((item) => SearchInputs[item].isShown)
                  .map((item, index) =>
                    SearchInputs[item]?.type === "multiple" ? (
                      <DynamicFormMultiple
                        pageAction="search"
                        key={`multiple_search_${item}`}
                        index={`multiple_search_${item}`}
                        section="search"
                        hooks={hooks}
                        subSectionClass={classes.multipleSection}
                        subItemClass={classes.multipleItem}
                        inputField={SearchInputs[item]}
                      />
                    ) : (
                      <Grid
                        container
                        item
                        xl={SearchInputs[item]?.layoutGrid?.xl}
                        lg={SearchInputs[item]?.layoutGrid?.lg}
                        md={SearchInputs[item]?.layoutGrid?.md}
                        sm={SearchInputs[item]?.layoutGrid?.sm}
                        xs={SearchInputs[item]?.layoutGrid?.xs}
                        key={SearchInputs[item].label}
                        className={classes.searchItem}
                      >
                        <DynamicFormInputs
                          autoFocus={false}
                          pageAction="search"
                          hooks={hooks}
                          inputField={SearchInputs[item]}
                          section="search"
                          formSection={SearchInputs}
                        />
                      </Grid>
                    ),
                  )}
            </Grid>
          </Grid>
        </Collapse>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Dialog className={classes.alertDialog} open={open}>
          <DialogTitle className={classes.alertDialogTitle}>{t(`commons.filterYourResult`)}</DialogTitle>
          <DialogContent>
            <Grid container item lg={12} md={12} sm={12} xs={12}>
              {Object.keys(SearchInputs).length > 0 &&
                Object.keys(SearchInputs)
                  .filter((item) => SearchInputs[item].isShown)
                  .map((item) =>
                    SearchInputs[item]?.type === "multiple" ? (
                      <DynamicFormMultiple
                        pageAction="search"
                        key={`multiple_search_${item}`}
                        index={`multiple_search_${item}`}
                        section="search"
                        hooks={hooks}
                        subSectionClass={classes.multipleSection}
                        subItemClass={classes.multipleItem}
                        inputField={SearchInputs[item]}
                      />
                    ) : (
                      <Grid
                        container
                        item
                        xl={SearchInputs[item]?.layoutGrid?.xl}
                        lg={SearchInputs[item]?.layoutGrid?.lg}
                        md={SearchInputs[item]?.layoutGrid?.md}
                        sm={SearchInputs[item]?.layoutGrid?.sm}
                        xs={SearchInputs[item]?.layoutGrid?.xs}
                        key={SearchInputs[item].label}
                        className={classes.searchItem}
                      >
                        <DynamicFormInputs
                          autoFocus={false}
                          pageAction="search"
                          hooks={hooks}
                          inputField={SearchInputs[item]}
                          section="search"
                          formSection={SearchInputs}
                        />
                      </Grid>
                    ),
                  )}
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={() => setOpen((prev) => !prev)} color="primary">
              {t("commons.CANCEL")}
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                onReset();
              }}
              color="secondary"
            >
              {t("commons.reset")}
            </Button>
            <Button onClick={(e) => onSearch(e)} className="search" color="primary" autoFocus>
              {t("commons.search")}
            </Button>
          </DialogActions>
        </Dialog>
      </Hidden>

      <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.keywordsContainer}>
        {suggestedKeywords.length > 0 &&
          suggestedKeywords.map((item) => (
            <span key={item} className={classes.keyword}>
              {item}
            </span>
          ))}
      </Grid>
    </form>
  );
};
export default SearchContainer;

SearchContainer.propTypes = {
  searchResult: PropTypes.func.isRequired,
  hooks: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
