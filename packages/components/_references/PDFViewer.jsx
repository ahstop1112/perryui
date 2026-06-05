import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";
import { Grid, IconButton, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, Remove, GetApp } from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyle = (props) =>
  makeStyles((theme) => ({
    root: {},
    actionContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `0 0 ${theme.spacing(0.1)} 0`,
      "& .zoom": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      },
    },
    zoomLabel: {
      fontSize: 16,
      padding: `0 ${theme.spacing(1)} 0 0`,
    },
    pdfDoc: {
      width: "100%",
      maxHeight: props.maxHeight || "80vh",
      overflow: "auto",
      "& .react-pdf__Page": {
        padding: theme.spacing(1),
        background: "#f0f0f0",
      },
      "& .react-pdf__Page__canvas": {
        borderRadius: theme.spacing(0.2),
        margin: "auto",
      },
      "& .react-pdf__Page__svg": {
        borderRadius: theme.spacing(0.2),
        margin: "auto",
      },
      "& .react-pdf__Page__annotations": {
        display: "none",
      },
    },
  }));

const PDFViewer = (props) => {
  const { pdf, handleDownload, actionAllowed = true, zoomable = true } = props;
  const { t } = useTranslation();
  const classes = useStyle(props)();
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(null);
  const [completedLoading, setCompletedLoading] = useState(false);

  const onDocumentLoadSuccess = (file) => {
    const { numPages } = file;
    setCompletedLoading(true);
    setNumPages(numPages);
  };

  const initScale = () => {
    pdfjs.getDocument(pdf?.path).promise.then((data) => {
      data.getPage(1).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        const diff = viewport.width > 2600 ? 1 : Math.round((2800 - viewport.width) / 200);
        setScale(0.1 * diff);
      });
    });
  };

  useEffect(() => {
    if (pdf?.path) initScale();
  }, [pdf]);

  return (
    <Grid container>
      {actionAllowed && completedLoading && (
        <Grid container className={classes.actionContainer}>
          {zoomable && (
            <Grid item className="zoom" lg md sm xs>
              <div className={classes.zoomLabel}>{t("commons.zoom")}</div>
              <IconButton size="small" onClick={() => setScale((v) => v + 0.1)}>
                <Add />
              </IconButton>
              <IconButton size="small" onClick={() => setScale((v) => v - 0.1)}>
                <Remove />
              </IconButton>
            </Grid>
          )}
          {handleDownload && (
            <Grid className="download">
              <IconButton size="small" onClick={(event) => handleDownload(event, pdf)}>
                <GetApp />
              </IconButton>
            </Grid>
          )}
        </Grid>
      )}
      {scale && (
        <Document
          className={classes.pdfDoc}
          file={pdf?.path}
          renderMode="canvas"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} renderTextLayer={false} />
          ))}
        </Document>
      )}
    </Grid>
  );
};

export default PDFViewer;
