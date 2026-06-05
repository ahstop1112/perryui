//  General JS Library importation
import React from "react";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import DynamicForm from "components/DynamicForm";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  alertDialog: {
    "& #alert-dialog-title": {
      padding: theme.spacing(2.5),
      paddingBottom: theme.spacing(1),

      "& h2": {
        fontWeight: 700,
        color: theme.palette.text[2],
      },

      // marginBottom: theme.spacing(1),
      // borderBottom: `1px solid ${theme.palette.line[3]}`,
    },
    "& .MuiDialog-paper": {
      minWidth: 600,
      background: theme.palette.background.content[2],
      color: theme.palette.text[2],
      [theme.breakpoints.down("md")]: {
        minWidth: 400,
      },
    },
    "& .MuiDialogContent-root": {
      padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
      color: theme.palette.text[3],

      "& button.CANCEL": {
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.button[4]}`,
        color: theme.palette.text[1],
      },
    },
    "& .itemContainer": {
      paddingLeft: 0,
    },
    "& p": {
      color: theme.palette.text[3],
    },
    "& button": {
      color: theme.palette.text[3],
    },
    "& .form": {
      padding: 0,
      width: `100%`,
    },
    "& .form > div": {
      paddingLeft: 0,
      paddingRight: 0,
    },
    "& div.submit": {
      justifyContent: `flex-end`,
      paddingRight: theme.spacing(1),
    },
  },
  button: {
    background: theme.palette.button.selected,
    color: theme.palette.text[4],
    "&:hover": {
      color: theme.palette.text[3],
    },
  },
  dialogActions: {
    // borderTop: `1px solid ${theme.palette.line[3]}`,
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  },
  textarea: {
    width: `100%`,
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    resize: `none !important`,
    outline: `none`,
    boxSizing: `border-box`,
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.line[3]}`,
    fontFamily: [`"Avenir-Medium"`, "Helvetica Neue", "Arial", "sans-serif"].join(","),
    fontSize: "0.875rem !important",
    color: theme.palette.text[4],
    [theme.breakpoints.down("md")]: {
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
    "&textarea": {
      padding: theme.spacing(1.5),
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.line[3]}`,
      maxHeight: 40,
    },
    "&::placeholder": {
      opacity: 0.35,
    },
  },
}));

const FormDialogs = ({ open, title, content, onCancel, handleSubmit, handleCancel, dialogType, hooks, formInputs }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const defContent = t("logout.alertDialog.content");
  const defTitle = t("logout.alertDialog.title");

  const handleLink = () => onCancel && onCancel();
  return (
    <Dialog
      className={classes.alertDialog}
      open={open}
      onClose={handleLink}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title || defTitle}</DialogTitle>
      <DialogContent>
        {content || defContent}
        {formInputs && (
          <DynamicForm
            pageAction={dialogType}
            id={dialogType}
            hooks={hooks}
            formInputs={formInputs}
            onFormSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            onFormCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialogs;
