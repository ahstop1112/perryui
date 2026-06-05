import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd"; //  Draggable
import clsx from "clsx";
import { Grid, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import { Add, Remove } from "@mui/icons-material";
//  Getting the Common Hooks from core/store/hooks
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
//  Framework Components
import ButtonContained from "components/ButtonContained";
import DynamicFormInputs from "components/DynamicForm/FormInputs";
import DynamicFormMultipleChild from "components/DynamicForm/MultipleChild";

const useStyles = makeStyles((theme) => ({
  subSection: {
    // marginTop: theme.spacing(2.5),
    // paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(1.5),
    // paddingLeft: theme.spacing(1.5),
    // paddingRight: theme.spacing(1.5),
    // borderTop: `1px solid ${theme.palette.line[3]}`,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    "&:first-child": {
      marginTop: theme.spacing(0.5),
      // border: `1px solid red`,
    },
    "& h4": {
      margin: 0,
    },
  },
  header: { alignItems: `center` },
  subItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1.5),
    // borderBottom: `1px solid ${theme.palette.line[3]}`,

    "&:last-child": { borderBottom: 0 },
  },
  addButton: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(3)}`,
    cursor: "pointer",
    border: "none",
    borderRadius: theme.spacing(3),
    background: theme.palette.text[1],
    color: theme.palette.text[5],
    fontSize: `0.875rem`,
    // marginTop: theme.spacing(0.5),
    // marginBottom: theme.spacing(1),
    marginRight: 0,
    "&:hover": {
      color: theme.palette.text[5],
      background: theme.palette.button[2],
    },
    "&.Mui-disabled": {
      color: theme.palette.text[4],
      background: theme.palette.button.disabled,
    },
  },
  showButton: {
    backgroundColor: theme.palette.button.secondary,
    color: theme.palette.text[4],
    fontSize: `0.875rem`,
    padding: `0 ${theme.spacing(0.5)}`,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: 0,
  },
  removeButton: {
    border: `1px solid ${theme.palette.text[1]}`,
    background: theme.palette.background.toolsButton,
    color: theme.palette.text[1],
    fontSize: `0.875rem`,
    padding: `${theme.spacing(0.5)} ${theme.spacing(3)}`,
    borderRadius: theme.spacing(3),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    marginRight: 0,
    "&:hover": {
      backgroundColor: theme.palette.background.searchBar,
      color: theme.palette.text[4],
    },
  },
  item: {
    // border: `1px solid red`,
    display: `flex`,
    alignItems: `center`,
    // padding: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2.5),
    [theme.breakpoints.between("xs", "md")]: {
      alignItems: `flex-start`,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  itemTitle: {
    alignItems: `center`,
  },
  itemButton: {
    alignItems: `center`,
    justifyContent: `space-between`,
    [theme.breakpoints.down("sm")]: {
      justifyContent: `space-between`,
    },
  },
  itemContainer: {
    // border: `1px solid blue`,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(1.5),
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    flexBasis: "50%",
  },
  suffixBtnContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    "&.pt-8": {
      paddingTop: "8px",
    },
    "&.pt-27": {
      paddingTop: "27px",
    },
    "& .btnIcon:not(:last-child)": {
      margin: "0 5px 0 0",
    },
    "& .hideBtn": {
      visibility: "hidden",
    },
  },
  swapVerticalContainer: {
    color: theme.palette.icon[2],
    fontSize: `0.75em`,
    display: `flex`,
    alignItems: `center`,
    marginRight: theme.spacing(2),
    // position: `absolute`,
  },
  swapVertical: {
    marginRight: theme.spacing(1),
    color: theme.palette.icon[2],
  },
  tempHidden: {
    display: `none`,
  },
  tempShow: {
    display: "block",
  },
  test: {
    "& h4": {
      fontWeight: 400,
      fontSize: 12,
    },
  },
}));

const DynamicFormMultiple = ({
  index,
  pageAction,
  section,
  hooks,
  inputField,
  subSectionClass = null,
  subItemClass = null,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { addNewMultiple, removeMultiple, addFirstMultiple, addSearchInputNewMultiple, removeSearchInputMultiple } =
    useForm(hooks);

  const {
    name = "",
    label = "",
    hideButtons = false,
    multiple = {},
    removeFirstOne = false,
    canAdd = true,
    maxLength = null,
    showLabel = true,
    showItemTitle = true,
    showMultipleLabel = true,
    showHeaderButton = true,
    showSuffixButton = false,
  } = inputField;
  const [show, setShow] = useState(false);

  const updateMultiple = (inputField, section, buttonAction = "add", subItem = null) => {
    if (buttonAction === "add") {
      switch (pageAction) {
        case "search": {
          addSearchInputNewMultiple(inputField, section);
          break;
        }
        default: {
          if (Object.keys(multiple).length > 0) {
            addNewMultiple(inputField, section);
          } else {
            addFirstMultiple(inputField, section);
          }
        }
      }
    } else if (buttonAction === "remove") {
      switch (pageAction) {
        case "search": {
          removeSearchInputMultiple(inputField, section, subItem);
          break;
        }
        default: {
          removeMultiple(inputField, section, subItem);
        }
      }
    }
  };

  return (
    <Grid
      container
      item
      lg={12}
      key={index}
      className={clsx({ [classes.subSection]: true }, { [subSectionClass]: subSectionClass })}
    >
      <Grid container item lg={8} md={8} sm={8} xs={6} className={classes.header}>
        <h4>{showLabel ? t(`${label}`) : ""}</h4>
      </Grid>
      <Grid container item lg={4} md={4} sm={4} xs={6} justifyContent="flex-end">
        {pageAction !== "view" && !hideButtons && showHeaderButton && (
          <>
            <ButtonContained
              type="button"
              value="button"
              disabled={!canAdd || (maxLength && Object.keys(multiple) === maxLength)}
              className={`${classes.addButton} ${!canAdd && "Mui-disabled"}`}
              color="prmiary"
              onClick={() => updateMultiple(inputField, section, "add")}
            >
              {t("commons.add")}
            </ButtonContained>
            {name === "userCharacteristics" && show === false && (
              <ButtonContained
                type="button"
                value="button"
                className={classes.showButton}
                onClick={() => setShow(true)}
              >
                {t("commons.show")}
              </ButtonContained>
            )}
          </>
        )}
      </Grid>
      <DragDropContext>
        {/* onDragEnd={onDragEnd}> */}
        <Droppable droppableId={`${name}_droppable`}>
          {(provided) => (
            <Grid
              container
              item
              lg={12}
              className={classes.tempShow}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.keys(multiple).length > 0 &&
                Object.keys(multiple).map((subItem, subIndex) => (
                  <Grid
                    container
                    item
                    lg={12}
                    key={subItem}
                    className={clsx({ [classes.subItem]: true }, { [subItemClass]: subItemClass })}
                  >
                    <Grid container item xl={12} lg={12} md={12} sm={12} className={classes.itemButton}>
                      {showItemTitle && (
                        <Grid container item lg={8} md={8} sm={6} className={classes.itemTitle}>
                          {label ? `${t(`${label}`)} ${subIndex + 1}` : ""}
                        </Grid>
                      )}
                      {!hideButtons && showHeaderButton && (
                        <Grid container item xl={4} lg={4} md={4} sm={6} justifyContent="flex-end">
                          {pageAction !== "view" && removeFirstOne ? (
                            <ButtonContained
                              type="button"
                              value="button"
                              className={classes.removeButton}
                              disabled={!removeFirstOne}
                              color="secondary"
                              onClick={() => updateMultiple(inputField, section, "remove", subItem)}
                            >
                              {t("commons.remove")}
                            </ButtonContained>
                          ) : (
                            pageAction !== "view" &&
                            subIndex > 0 && (
                              <>
                                <ButtonContained
                                  type="button"
                                  value="button"
                                  className={classes.removeButton}
                                  color="secondary"
                                  onClick={() => updateMultiple(inputField, section, "remove", subItem)}
                                >
                                  {t("commons.remove")}
                                </ButtonContained>
                              </>
                            )
                          )}
                        </Grid>
                      )}
                    </Grid>
                    <Grid container item lg={12} justifyContent="space-between">
                      <Grid className={classes.formContainer}>
                        {Object.keys(multiple[subItem])
                          .filter((subInput) => multiple[subItem][subInput].isShown)
                          .map((subInput) => {
                            if (!showMultipleLabel) multiple[subItem][subInput].showLabel = false;
                            return (
                              <Grid
                                key={subInput}
                                container
                                item
                                xl={multiple[subItem][subInput].layoutGrid?.xl}
                                lg={multiple[subItem][subInput].layoutGrid?.lg}
                                md={multiple[subItem][subInput].layoutGrid?.md}
                                sm={multiple[subItem][subInput].layoutGrid?.sm}
                                xs={multiple[subItem][subInput].layoutGrid?.xs}
                                justifyContent="flex-start"
                                className={classes.itemContainer}
                              >
                                {multiple[subItem][subInput].type === "multipleChild" ? (
                                  <DynamicFormMultipleChild
                                    pageAction={pageAction}
                                    section={section}
                                    hooks={hooks}
                                    grandParentField={name}
                                    inputField={multiple[subItem][subInput]}
                                  />
                                ) : (
                                  <DynamicFormInputs
                                    parentField={name}
                                    autoFocus={false}
                                    inputField={multiple[subItem][subInput]}
                                    pageAction={pageAction}
                                    section={section}
                                    hooks={hooks}
                                  />
                                )}
                              </Grid>
                            );
                          })}
                      </Grid>
                      {pageAction !== "view" && !hideButtons && showSuffixButton && (
                        <div
                          className={clsx(
                            { [classes.suffixBtnContainer]: true },
                            { "pt-8": !showMultipleLabel },
                            { "pt-27": showMultipleLabel },
                          )}
                        >
                          <IconButton
                            className="btnIcon"
                            size="small"
                            onClick={() => updateMultiple(inputField, section, "add")}
                          >
                            <Add />
                          </IconButton>
                          <IconButton
                            className={clsx({ btnIcon: true }, { hideBtn: !removeFirstOne && subIndex === 0 })}
                            disabled={!removeFirstOne && subIndex === 0}
                            size="small"
                            onClick={() => updateMultiple(inputField, section, "remove", subItem)}
                          >
                            <Remove />
                          </IconButton>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                ))}

              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
};

export default DynamicFormMultiple;

DynamicFormMultiple.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  pageAction: PropTypes.string.isRequired,
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    multiple: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  section: PropTypes.string.isRequired,
};
