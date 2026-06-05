//  General JS Library importation
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//  Framework Components
import ButtonContained from "components/ButtonContained";
import ErrorMsg from "components/ErrorMsg";
//  Hooks
import useApiHandler from "core/store/hooks/useApiHandler";
import useAuth from "core/store/hooks/useAuth";
//   Different API(s)
import downloadAttachments from "bpmp/core/services/Download";
//  Styles
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  borderNone: {
    border: "none !important",
  },
  content: {
    flexGrow: 1,
    paddingRight: theme.spacing(4),
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    margin: theme.spacing(0, 1.25),
    minHeight: "80px",
    minWidth: "80px",
    width: "80px",
  },
  trash: {
    cursor: `pointer`,
    fontSize: `1rem`,
    lineHeight: 1.5,
    marginLeft: theme.spacing(0.5),
  },
  main: {
    backgroundColor: theme.palette.background.disabled,
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.line[3]}`,
    display: "flex",
    marginBottom: theme.spacing(1.5),
    alignItems: "center",
    overflow: "hidden",
    padding: theme.spacing(2),
    position: "relative",
    width: "100%",
  },
  mainSmall: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    position: "relative",
    width: "100%",
    border: `1px solid ${theme.palette.line[3]}`,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  overlay: {
    backgroundColor: "#03b3ff33",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  relative: {
    position: "relative",
  },
  text: {
    fontSize: `0.75rem`,
    fontWeight: 300,
    cursor: `pointer`,
    color: theme.palette.text[2],
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: `flex`,
  },
  title: {
    fontSize: `1rem`,
    fontWeight: 700,
    color: theme.palette.text[4],
    paddingBottom: theme.spacing(2.5),
  },
  titleSmall: {
    fontSize: `0.875rem`,
    fontWeight: 500,
    color: theme.palette.text[4],
  },
  placeholder: {
    color: theme.palette.text[3],
    fontSize: `0.875rem`,
    margin: 0,
  },
  turquoise: {
    backgroundColor: theme.palette.secondary.turquoise,
  },
  uploading: {
    color: theme.palette.common.white,
    left: "50%",
    marginLeft: "-30px",
    marginTop: "-30px",
    position: "absolute",
    top: "50%",
    zIndex: 9,
  },
  button: {
    outline: "none !important",
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    background: theme.palette.button[4],
    border: `none`,
    borderRadius: theme.spacing(3),
    color: theme.palette.text[5],
    textTransform: `initial`,
    "&:hover": {
      color: theme.palette.text[5],
      background: theme.palette.button[4],
    },
  },
  buttonSmall: {
    outline: "none !important",
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    // border: `1px solid ${theme.palette.text[1]}`,
    background: theme.palette.button[4],
    borderRadius: theme.spacing(3),
    color: theme.palette.text[5],
    textTransform: `initial`,
    cursor: `pointer`,
    "&:hover": {
      color: theme.palette.text[5],
      background: theme.palette.button[4],
    },
  },
  errorBorder: {
    border: `1px solid ${theme.palette.errorRed}`,
  },
  error: {
    color: theme.palette.errorRed,
    fontSize: `0.75rem`,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  loadingDiv: {
    paddingLeft: theme.spacing(2),
  },
}));

const FileUploadArea = ({ hooks, inputField, onDrop, isUploading, section, pageAction, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { dispatch } = hooks;
  const { dispatch: handDispatch } = useApiHandler();
  const { apiType } = useAuth();
  const {
    name = "",
    label = "",
    value = "",
    placeholder = "",
    fileTypes = {},
    isMulti = false,
    errorMsg = "",
    isEnabled = false,
    isRequired = false,
    isTouched = false,
    isValid = false,
    display = "normal",
    minSize = 1,
    maxSize = 26214400,
    showLabel = true,
    isDMN = false,
  } = inputField;

  const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
    disabled: !isEnabled,
    minSize,
    maxSize,
    multiple: isMulti,
    uploadMultiple: true,
    name: isMulti,
    accept:
      Object.keys(fileTypes).length === 0
        ? {
            "image/*": [],
            "application/pdf": [],
            "text/html": [],
            "application/zip": [],
            "application/x-tar": [],
            "message/rfc822": [],
            "application/xml": [],
            "text/plain": [],
            "text/xml": [],
            "text/rtf": [".rtf"],
            "application/rtf": [".rtf"],
            "application/msword": [".rtf", ".dot"],
            "application/x-7z-compressed": [],
            "application/vnd.ms-word": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [".dotx"],
            "application/vnd.ms-word.document.macroEnabled.12": [".docm"],
            "application/vnd.ms-word.template.macroEnabled.12": [".dotm"],
            "application/vnd.ms-excel": [".xlt", ".xla"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsm"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [".xltx"],
            "application/vnd.ms-excel.template.macroEnabled.12": [".xltm"],
            "application/vnd.ms-excel.addin.macroEnabled.12": [".xlam"],
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12": [".xlsb"],
            "application/vnd.ms-powerpoint": [".pot", ".pps", ".ppa"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": [],
            "application/vnd.openxmlformats-officedocument.presentationml.template": [".potx"],
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [".ppsx"],
            "application/vnd.ms-powerpoint.addin.macraEnabled.12": [".ppam"],
            "application/vnd.ms-powerpoint.presentation.macroEnabled.12": [".pptm", ".potm"],
            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12": [".ppsm"],
            "application/vnd.ms-outlook": [".msg"],
          }
        : fileTypes,
    onDrop,
  });
  const [isDownload, setIsDownload] = useState(false);
  const fileMessage = [
    {
      code: "file-invalid-type",
      message: t(`${"bpmp:bpmp.FormError.Type_Error"}`),
    },
    {
      code: "file-too-large",
      message: t(`${"bpmp:bpmp.FormError.MAX_FILE_SIZE"}`),
    },
  ];
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      <ErrorMsg
        key={errors[0].code}
        className={classes.errorMsg}
        type="error"
        label={(fileMessage.find((i) => i.code === errors[0].code) || errors[0]).message}
      />
    </div>
  ));

  const removeAll = (file, e) => {
    dispatch({ type: "REMOVE_ALL_UPLOAD_FILE", inputField, section });
    e.stopPropagation();
  };
  const remove = (file, e) => {
    // get delete fileName to update draf
    dispatch({ type: "GET_DELET_FILENAME", inputField, fileName: file?.fileName });
    dispatch({ type: "REMOVE_UPLOAD_FILE", inputField, section, fileName: file?.fileName });
    e.stopPropagation();
  };

  const handleCheckDownload = async (apiLink, attachmentId, file) => {
    // Download locally uploaded files
    if (!attachmentId || !apiLink) {
      const { fileName, content } = file;
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8",
      });
      const objectUrl = URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.setAttribute("href", objectUrl);
      el.setAttribute("download", fileName);
      el.setAttribute("target", "_blank");
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
      return;
    }
    if (apiLink.toLocaleLowerCase().endsWith(".xlsx")) {
      window.open(apiLink);
      return;
    }
    setIsDownload(true);

    try {
      const res = await downloadAttachments(attachmentId, apiLink, apiType);
      setIsDownload(false);
      res?.data && window.open(apiLink);
    } catch (error) {
      setIsDownload(false);
      handDispatch({ type: "HANDLE_ERROR", error });
    }
  };

  const changeToMB = (fileSize) => (fileSize / 1000 / 1000).toFixed(2);

  return (
    <Grid container item lg={12} md={12} className={classes.fileUpload}>
      {display === "normal" ? (
        <>
          <Box
            {...getRootProps()}
            className={`${classes.main} ${!isEnabled && classes.disabled} ${props.className} ${
              isRequired && isTouched && errorMsg && !isValid && classes.errorBorder
            }`}>
            {isDragActive && <Box className={classes.overlay} />}
            <input {...getInputProps()} />
            <Box className={classes.content}>
              <Typography className={classes.title}>{t(`commons.dragYourFileHere`)}</Typography>
              {placeholder && <p className={classes.placeholder}>{t(`${placeholder}`)}</p>}
            </Box>
            <ButtonContained color="secondary" className={classes.button} disabled={!isEnabled}>
              {t(`commons.chooseFile`)}
            </ButtonContained>
          </Box>
          <Box className={classes.content}>
            {isMulti && value && value.length > 0 && !isDownload ? (
              value.map((file, index) => {
                const { id, apiLink = "" } = file;
                return (
                  <p
                    key={file?.fileName}
                    className={classes.text}
                    onClick={() => handleCheckDownload(apiLink, id, file)}>
                    {`${index + 1}. ${file?.fileName} ${
                      file?.fileSize ? `( size: ${changeToMB(file.fileSize)}MB )` : ""
                    }`}
                    <DeleteIcon className={classes.trash} onClick={(e) => remove(file, e)} />
                  </p>
                );
              })
            ) : isMulti && value && value.length > 0 && isDownload ? (
              <Grid container item lg={12} sm={12} xs={12} className={classes.loadingDiv}>
                <CircularProgress />
              </Grid>
            ) : null}
            {!isMulti && value.length > 0 && value && !isDownload ? (
              <p
                className={classes.text}
                onClick={() =>
                  handleCheckDownload(
                    value[value.length - 1].apiLink,
                    value[value.length - 1].id,
                    value[value.length - 1],
                  )
                }>
                {`1. ${value[value.length - 1]?.fileName} ${
                  value[value.length - 1]?.fileSize
                    ? `( size: ${changeToMB(value[value.length - 1]?.fileSize)}MB )`
                    : ""
                }`}
                <DeleteIcon className={classes.trash} onClick={(e) => removeAll(inputField, e)} />
              </p>
            ) : !isMulti && value && value.length > 0 && isDownload ? (
              <Grid container item lg={12} sm={12} xs={12} className={classes.loadingDiv}>
                <CircularProgress />
              </Grid>
            ) : null}
            {isRequired && isTouched && fileRejectionItems.length === 0 && !isValid && errorMsg && (
              <ErrorMsg type="error" className={classes.error} label={t(`${errorMsg}`)} />
            )}
            {fileRejectionItems}
          </Box>
        </>
      ) : (
        <Box
          {...getRootProps()}
          className={`${classes.mainSmall} ${!isEnabled && classes.disabled} ${props.className}`}>
          {isDragActive && <Box className={classes.overlay} />}
          <input {...getInputProps()} />
          <Box className={classes.contentSmall}>
            {placeholder && (
              <p className={classes.placeholder}>
                {t(`${placeholder}`)}
                {isRequired ? ` *` : ``}
              </p>
            )}
            {isMulti &&
              value &&
              value.length > 0 &&
              value.map((file, index) => (
                <p key={file?.fileName} className={classes.text}>
                  {`${index + 1}. ${file?.fileName} ${
                    file?.fileSize ? `( size: ${changeToMB(file.fileSize)}MB )` : ""
                  }`}
                  <DeleteIcon className={classes.trash} onClick={(e) => remove(file, e)} />
                </p>
              ))}
            {!isMulti && value.length > 0 && value && (
              <p className={classes.text}>
                {`1. ${value[value.length - 1]?.fileName} ${
                  value[value.length - 1]?.fileSize
                    ? `( size: ${changeToMB(value[value.length - 1]?.fileSize)}MB )`
                    : ""
                }`}
                <DeleteIcon className={classes.trash} onClick={(e) => removeAll(inputField, e)} />
              </p>
            )}
            {isRequired && isTouched && fileRejectionItems.length === 0 && !isValid && errorMsg && (
              <ErrorMsg type="error" className={classes.error} label={t(`${errorMsg}`)} />
            )}
            {fileRejectionItems}
          </Box>
          <ButtonContained color="secondary" className={classes.buttonSmall} disabled={!isEnabled}>
            {t(`commons.chooseFile`)}
          </ButtonContained>
        </Box>
      )}
    </Grid>
  );
};

export default FileUploadArea;

FileUploadArea.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    isMulti: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
  minSize: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
};
