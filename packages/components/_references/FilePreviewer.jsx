import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button, IconButton, Dialog, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close, GetApp } from "@mui/icons-material";
import PDFViewer from "components/PDFViewer";
import clsx from "clsx";

const useStyle = (props) =>
  makeStyles((theme) => ({
    root: {},
    previewTitle: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `0 ${theme.spacing(2)}`,
    },
    previewContent: {
      width: "auto",
      minWidth: "30vw",
      padding: `0 ${theme.spacing(2)}`,
    },
    actionContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: `0 0 ${theme.spacing(0.1)} 0`,
    },
    imageContainer: {
      width: "100%",
      minHeight: "20vh",
      "& .image": {
        width: "100%",
      },
    },
    noDisplayElement: {
      display: "none",
    },
  }));

const FilePreviewer = (props) => {
  const {
    file,
    open = false,
    handleDownload,
    handleClose,
    actionAllowed = true,
    fileTypeAllowed = ["jpeg", "png", "pdf"],
  } = props;
  const { t } = useTranslation();
  const classes = useStyle(props)();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkType = (type) => {
    if (!type || type.length === 0 || fileTypeAllowed?.length === 0) return false;
    let typeName = "";
    fileTypeAllowed.map((item) => {
      if (item?.length > 0 && type.includes(item)) typeName = item;
      return item;
    });
    return typeName?.length > 0 ? typeName : false;
  };

  const handleLoad = () => {
    return (
      <Grid container justifyContent="center" className={clsx({ [classes.noDisplayElement]: !isLoading })}>
        <CircularProgress />
      </Grid>
    );
  };

  useEffect(() => {
    if (file?.type && checkType(file?.type)) {
      setIsOpen(open);
    } else if (open && file && handleDownload) {
      handleDownload(null, file);
    }
  }, [open]);

  return (
    <Dialog className={classes.previewer} open={isOpen} maxWidth="lg">
      <Grid container className={classes.previewTitle}>
        <h3>{file.label}</h3>
        <IconButton size="small" onClick={handleClose}>
          <Close />
        </IconButton>
      </Grid>
      <DialogContent className={classes.previewContent}>
        <Grid container>
          {actionAllowed && (
            <div className={classes.actionContainer}>
              {handleDownload && (
                <div className="download">
                  <IconButton size="small" onClick={(event) => handleDownload(event, file)}>
                    <GetApp />
                  </IconButton>
                </div>
              )}
            </div>
          )}
          {file?.type && (checkType(file?.type) === "jpeg" || checkType(file?.type) === "png") && (
            <div className={classes.imageContainer}>
              <img
                src={file.path}
                className={clsx({ image: true }, { [classes.noDisplayElement]: isLoading })}
                onLoad={() => setIsLoading(false)}
                alt={file.label}
              />
              {handleLoad()}
            </div>
          )}
          {file?.type && checkType(file?.type) === "pdf" && (
            <PDFViewer pdf={file} maxHeight="75vh" handleDownload={handleDownload} />
          )}
          {!file && <div className={classes.imageContainer}>no file is found.</div>}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button size="medium" onClick={handleClose} color="primary">
          {t("commons.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilePreviewer;
