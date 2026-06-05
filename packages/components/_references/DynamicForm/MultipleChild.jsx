import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd"; //  , Draggable
import Grid from "@mui/material/Grid";
// import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import useForm from "core/store/hooks/useForm"; //  Getting the common Form features from useForm
import ButtonContained from "components/ButtonContained";
import DynamicFormInputs from "components/DynamicForm/FormInputs";
import { isObject } from "utility/index"; //  Getting the re-useable functions from utility/index
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  subSection: {
    marginTop: theme.spacing(1.5),
    padding: `${theme.spacing(1.5)} 0`,
    borderTop: `1px dotted ${theme.palette.line[3]}`,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    // "& div": {
    //   justifyContent: `flex-start`,
    //   alignItems: `center`,
    // },
    "& h4": {
      margin: 0,
    },
  },
  header: { alignItems: `center`, marginBottom: 0 },
  subItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1.5),
    borderBottom: `1px solid ${theme.palette.line[3]}`,
    "&:last-child": { borderBottom: 0 },
    // background: theme.palette.background.content[2],
  },
  addButton: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    cursor: "pointer",
    border: "none",
    borderRadius: theme.spacing(3),
    background: theme.palette.button[4],
    color: theme.palette.text[5],
    fontSize: `0.875rem`,
    marginRight: 0,
    "&:hover": {
      color: theme.palette.text[5],
      background: theme.palette.button[4],
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
    // '&:hover': {
    //   backgroundColor: theme.palette.background.searchBar,
    //   color: theme.palette.text[4],
    // },
  },
  removeButton: {
    border: `1px solid ${theme.palette.button[4]}`,
    background: theme.palette.background.content[2],
    color: theme.palette.text[1],
    fontSize: `0.875rem`,
    borderRadius: theme.spacing(3),
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: 0,
    "&:hover": {
      backgroundColor: theme.palette.background.content[2],
      color: theme.palette.text[1],
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
    fontSize: `0.875rem`,
  },
  itemButton: {
    alignItems: `center`,
    justifyContent: `flex-end`,
    [theme.breakpoints.down("sm")]: {
      justifyContent: `space-between`,
    },
  },
  itemContainer: {
    // border: `1px solid red`,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(1.5),
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
}));

const DynamicFormMultipleChild = ({ index, pageAction, section, hooks, inputField, grandParentField }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { addNewMultipleChild, removeMultipleChild } = useForm(hooks);
  const { name = "", label = "", multipleChild = {} } = inputField;
  const parentField = name;
  const [show, setShow] = useState(false);

  return (
    <Grid container item lg={12} key={index} className={classes.subSection}>
      <Grid container item lg={8} md={8} sm={8} xs={6} className={classes.header}>
        <h4>{t(`${label}`)}</h4>
      </Grid>
      <Grid container item lg={4} md={4} sm={4} xs={6} justifyContent="flex-end">
        {pageAction !== "view" && (
          <>
            <ButtonContained
              type="button"
              value="button"
              disabled={pageAction === "view"}
              className={`${classes.addButton}`}
              color="prmiary"
              onClick={() => addNewMultipleChild(inputField, section)}
            >
              {t("commons.add")}
            </ButtonContained>
            {parentField === "userCharacteristics" && show === false && (
              <ButtonContained
                type="button"
                value="button"
                className={classes.showButton}
                disabled={false}
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
              className={
                // input === 'userCharacteristics' && show === false
                //   ? classes.tempHidden
                //   : input === 'userCharacteristics' && show === true
                //   ? classes.tempShow
                //   : ''
                classes.tempShow
              }
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.keys(multipleChild).length > 0 &&
                Object.keys(multipleChild)
                  .filter((subItem) => isObject(multipleChild[subItem]))
                  .map((subItem, subIndex) => (
                    <Grid container item lg={12} key={subItem} className={classes.subItem}>
                      <Grid container item lg={8} md={8} sm={6} className={classes.itemTitle}>
                        {label ? `${t(`${label}`)} ${subIndex + 1}` : ""}
                      </Grid>
                      <Grid container item lg={4} md={4} sm={6} className={classes.itemButton}>
                        {subIndex > 0 && (
                          <>
                            {/* <div className={classes.swapVerticalContainer}>
                              <SwapVerticalCircleIcon className={classes.swapVertical} />
                              {t('commons.swapTochangePos')}
                            </div> */}
                            <ButtonContained
                              type="button"
                              value="button"
                              className={classes.removeButton}
                              disabled={false}
                              color="secondary"
                              onClick={() => removeMultipleChild(inputField, section, subItem)}
                            >
                              {t("commons.remove")}
                            </ButtonContained>
                          </>
                        )}
                      </Grid>
                      <Grid container item lg={12}>
                        {Object.keys(multipleChild[subItem])
                          .filter(
                            (subInput) =>
                              multipleChild[subItem][subInput].isShown && isObject(multipleChild[subItem][subInput]),
                          )
                          .map((subInput) => (
                            <Grid
                              key={subInput}
                              container
                              item
                              lg={multipleChild[subItem][subInput].layoutGrid?.lg}
                              md={multipleChild[subItem][subInput].layoutGrid?.md}
                              sm={multipleChild[subItem][subInput].layoutGrid?.sm}
                              xs={multipleChild[subItem][subInput].layoutGrid?.xs}
                              justifyContent="flex-start"
                              className={`${classes.itemContainer} itemContainer`}
                            >
                              <DynamicFormInputs
                                grandParentField={grandParentField}
                                parentField={parentField}
                                showLabel
                                autoFocus={false}
                                inputField={multipleChild[subItem][subInput]}
                                pageAction={pageAction}
                                section={section}
                                hooks={hooks}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  ))}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
};

export default DynamicFormMultipleChild;

DynamicFormMultipleChild.propTypes = {
  hooks: PropTypes.shape({
    state: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  pageAction: PropTypes.string.isRequired,
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    multipleChild: PropTypes.objectOf(PropTypes.any).isRequired,
  }).isRequired,
  section: PropTypes.string.isRequired,
};
