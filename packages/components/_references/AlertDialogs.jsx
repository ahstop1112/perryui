//  General JS Library importation
import React from "react";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ButtonContained } from "components/index";

const useStyles = makeStyles((theme) => ({
  alertDialog: {
    "& #alert-dialog-title": {
      color: theme.palette.text[2],
      fontWeight: `bold`,
      padding: `${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      marginBottom: theme.spacing(1),
    },
    "& .MuiDialog-paper": {
      minWidth: 600,
      background: theme.palette.background.content[2],
      color: theme.palette.text[2],
      [theme.breakpoints.down("md")]: {
        minWidth: 400,
      },
    },
    "& p": {
      color: theme.palette.text[3],
    },
  },
  button: {
    background: theme.palette.button.selected,
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    color: theme.palette.text[5],
    borderRadius: theme.spacing(5),
    display: `block`,
    textTransform: `capitalize`,
    "&:hover": {
      backgroundColor: theme.palette.button.selected,
      color: theme.palette.text[5],
    },
    "&.red": {
      background: theme.palette.text[5],
      border: `1px solid ${theme.palette.text[7]}`,
      color: theme.palette.text[7],
    },
    "&.CANCEL": {
      background: theme.palette.text[5],
      border: `1px solid ${theme.palette.text[1]}`,
      color: theme.palette.text[1],
    },
    "&.Mui-disabled": {
      border: `1px solid ${theme.palette.button.disabled}`,
      color: theme.palette.text[4],
      backgroundColor: theme.palette.button.disabled,
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
      padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
      fontSize: `0.82rem`,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: `0.75rem`,
      padding: theme.spacing(1.5),
    },
  },
  dialogActions: {
    // borderTop: `1px solid ${theme.palette.line[3]}`,
    padding: theme.spacing(2),
  },
  labelClass: {
    width: `100%`,
    fontSize: `0.75rem`,
    color: theme.palette.text[3],
    paddingLeft: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
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

const AlertDialog = (props) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { open, okColor, title, content, contentTable, text4Cancel, text4Ok, onCancel, onOk, keyId } = {
    ...props,
  };
  const defText4Cancel = t("logout.alertDialog.cancel");
  const defText4OK = t("logout.alertDialog.ok");
  const defContent = t("logout.alertDialog.content");
  const defTitle = t("logout.alertDialog.title");

  const handleCancel = () => onCancel && onCancel();
  const handleOK = () => onOk && onOk();

  return (
    <Dialog
      className={classes.alertDialog}
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title || defTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content || defContent}
          {keyId && `: ${keyId}`}
        </DialogContentText>
        {contentTable && Object.keys(contentTable).length > 0 && contentTable}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {onCancel && (
          <ButtonContained onClick={handleCancel} color="secondary" className={`${classes.button} CANCEL`}>
            {text4Cancel || defText4Cancel}
          </ButtonContained>
        )}
        {onOk && (
          <ButtonContained
            onClick={handleOK}
            color="primary"
            autoFocus
            className={`${classes.button} ${okColor && `red`}`}
          >
            {text4Ok || defText4OK}
          </ButtonContained>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
