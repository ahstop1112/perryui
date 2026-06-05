//  General JS Library importation
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import makeStyles from "@mui/styles/makeStyles";
//  Different API(s)
import downloadAttachments from "bpmp/core/services/Download";
//  Hooks
import useApiHandler from "core/store/hooks/useApiHandler";
import useAuth from "core/store/hooks/useAuth";
//  Framework Components
import FilePreviewer from "components/FilePreviewer";
import { FSRFile, CCSFile, DueDiligenceForm } from "components/Icons";

const useStyles = makeStyles((theme) => ({
  list: {
    background: theme.palette.background.disabled,
    borderRadius: theme.spacing(0.5),
    color: theme.palette.text[3],
    width: `100%`,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    marginBottom: 0,
    display: `flex`,
    alignItems: `center`,

    "& span": {
      fontSize: `0.75rem`,
      lineHeight: 1.5,
      textDecoration: `none`,
    },
  },
  item: {
    cursor: `pointer`,
    marginTop: 0,
    lineHeight: 1.5,
    paddingLeft: theme.spacing(1),
  },
  noResult: {
    fontSize: `0.875rem`,
    textAlign: `center`,
  },
  loadingDiv: {
    paddingLeft: theme.spacing(2),
  },
}));

const DataList = ({ inputField, hasAttach }) => {
  const classes = useStyles();
  const { value: arrayList, filePreview = false, name } = inputField;
  const { t } = useTranslation();
  const { apiType } = useAuth();
  const [openFilePreview, setOpenFilePreview] = useState(false);
  const [currentFile, setCurrentFile] = useState({});
  const { dispatch } = useApiHandler();
  const [isDownload, setIsDownload] = useState(false);

  const checkType = (type) => {
    const typeAllowed = ["pdf", "jpeg", "png"];
    let typeName = "";
    typeAllowed
      .filter((item) => type.includes(item))
      .forEach((item) => {
        typeName = item;
      });

    return typeName?.length > 0 ? typeName : false;
  };

  const handleDirectDownload = (event, { label, apiLink, type = "" }) => {
    const el = document.createElement("a");
    el.setAttribute("href", apiLink);
    el.setAttribute("download", label);
    el.setAttribute("target", "_blank");
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const handleCheckDownload = async (apiLink, attachmentId, label) => {
    setIsDownload(true);
    if (apiLink.toLocaleLowerCase().endsWith(".xlsx")) {
      setIsDownload(false);
      window.open(apiLink);
      return;
    }
    try {
      const res = await downloadAttachments(attachmentId, apiLink, apiType);
      const data = res?.data;
      const fileType = res?.headers?.["content-type"]?.toLowerCase();
      setIsDownload(false);
      if (filePreview && data && fileType) {
        const typeName = checkType(fileType);
        switch (typeName) {
          case "pdf":
          case "png":
          case "jpeg": {
            setCurrentFile({
              path: apiLink,
              apiLink,
              label,
              attachmentId,
              type: fileType,
            });
            setOpenFilePreview(true);
            break;
          }
          default:
            data && window.open(apiLink);
            break;
        }
      } else {
        handleDirectDownload(null, { label, apiLink });
      }
    } catch (error) {
      setIsDownload(false);
      dispatch({ type: "HANDLE_ERROR", error });
    }
  };

  const handleFilePreviewClose = () => setOpenFilePreview(false);

  // download local file
  const apiLinkObj = {
    fundOrdAppr: {
      path: `${FSRFile}`,
      label: "FundSubscriptionRedemptionOrderTemplate.xlsx",
    },
    download: {
      path: `${CCSFile}`,
      label: "InstructionRequestTemplate.xlsx",
    },
    eFormDownload: {
      path: `${DueDiligenceForm}`,
      label: "ThirdPartyFundTransferDueDiligenceE-form.pdf",
    },
  };
  const { path: apiLink, label: fileLabel } = apiLinkObj[name] || {};
  apiLinkObj[name] && !arrayList.some((i) => i.apiLink === apiLink) && arrayList.push({ apiLink, label: fileLabel });

  return (
    <List className={classes.list}>
      {arrayList && arrayList.length > 0 && !isDownload ? (
        arrayList.map((item, index) => {
          const { id = index, label = "", apiLink = "", errorParams = [] } = item;
          return (
            <ListItem key={id} className={classes.listItem}>
              {hasAttach ? (
                <>
                  <DescriptionIcon />
                  <ListItemText
                    className={classes.item}
                    primary={label}
                    onClick={() => handleCheckDownload(apiLink, id, label)}
                  />
                </>
              ) : (
                <>
                  {`${index + 1}. `}
                  {id && `${id} --- `}
                  {errorParams?.length ? (
                    <ListItemText
                      className={classes.item}
                      primary={t(`bpmp:errors.${id}`, {
                        ...errorParams,
                      })}
                    />
                  ) : (
                    <ListItemText className={classes.item} primary={label} />
                  )}
                </>
              )}
            </ListItem>
          );
        })
      ) : arrayList && arrayList.length > 0 && isDownload ? (
        <Grid container item lg={12} sm={12} xs={12} className={classes.loadingDiv}>
          <CircularProgress />
        </Grid>
      ) : (
        <p className={classes.noResult}>{hasAttach ? "No Attachment!" : "No Record!"}</p>
      )}
      <FilePreviewer
        file={currentFile}
        open={openFilePreview}
        actionAllowed={currentFile?.type && !currentFile?.type?.includes("pdf")}
        handleDownload={handleDirectDownload}
        handleClose={handleFilePreviewClose}
      />
    </List>
  );
};

DataList.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.any).isRequired,
    isRequired: PropTypes.bool.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }).isRequired,
};

export default DataList;
