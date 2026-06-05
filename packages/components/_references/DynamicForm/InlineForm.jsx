//  General JS Library importation
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
// import Lightbox from 'react-image-lightbox';
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
//  Getting the Common Hooks from core/store/hooks
import useApp from "core/store/hooks/useApp";
//  Framework Components
//  Utility
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_XL } from "utility/constants"; //  Getting the Constants from utiltiy/constants (Basic System Settings)
import { filteredFormObject } from "utility/index"; //  Getting the re-useable functions from utility/index
//  Child Components
import SectionBody from "./SectionBody";
import SectionButtons from "./SectionButtons";

const DynamicInlineForm = ({
  onFormSubmit,
  onFormCancel,
  onDropdownButton,
  hooks,
  formInputs,
  pageAction,
  disabled,
}) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { actionTypes, assignee, isAPILoading } = hooks?.state || {};
  const { AppState } = useApp();
  const { toggleDrawer = false } = AppState || {};
  const stickyContainerWidth = window.innerWidth - SIDEBAR_WIDTH;
  const stickyContainerWidthXL = window.innerWidth - SIDEBAR_WIDTH_XL;
  const [stickyWidth, setStickyWidth] = useState(stickyContainerWidth);
  const [stickyWidthXL, setStickyWidthXL] = useState(stickyContainerWidthXL);

  const { layout = {} } = formInputs;

  const useStyles = makeStyles((theme) => ({
    accordion: {
      // border: `1px solid red`,
      background: `none`,
    },
    accoridonSummary: {
      minHeight: `0 !Important`,
      "& .MuiAccordion-root.Mui-expanded": {
        "&:first-child": {
          marginTop: 0,
        },
      },
      "& .MuiAccordionSummary-content": {
        margin: `${theme.spacing(1.5)} 0`,
      },
    },
    form: {
      width: "98%",
      margin: "0 auto",
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& .MuiAccordion-root": {
        boxShadow: `none`,
      },
    },
    section: {
      // backgroundColor: theme.palette.background.content[2],
      padding: `${theme.spacing(1.5)} ${theme.spacing(0.5)}`,
    },
    submitContainer: {
      right: 0,
      bottom: 0,
      marginTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      // borderTop: `1px solid #eee`,
      justifyContent: `flex-end`,
      "& div": {
        justifyContent: `flex-end`,
      },
      "& div:nth-child(1)": {
        justifyContent: `flex-start`,
        paddingLeft: theme.spacing(2),
      },
      "& button": {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
        color: theme.palette.text[5],
        fontSize: `0.875rem`,
        fontWeight: 700,
        background: theme.palette.button[4],
        textTransform: `capitalize`,
        cursor: "pointer",
        outline: "medium",
        border: "none",
        borderRadius: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
          marginRight: theme.spacing(1),
          padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
          fontSize: `0.75rem`,
        },
        "&:hover": {
          backgroundColor: theme.palette.button[4],
          color: theme.palette.text[5],
        },
        "&:last-child": {
          marginRight: 0,
        },
        "&.SAVE": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.RELEASE": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.EVALUATION": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.EVALUATE": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.WITHDRAW": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.REQUEST_INFO": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.CANCEL": {
          // background: theme.palette.button[4],
          // color: theme.palette.text[5],
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.BULK_ASSIGN": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.STOP_EVALUATE": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.REJECT": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.apiError.background}`,
          color: theme.palette.apiError.background,
        },
        "&.RETURN_FOR_REJECT": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.apiError.background}`,
          color: theme.palette.apiError.background,
        },
        "&.TERMINATE": {
          background: theme.palette.apiError.background,
          color: theme.palette.text[5],
        },
        "&.APPROVE": {
          background: theme.palette.button[4],
          color: theme.palette.text[5],
        },
        "&.INIT_RETURN": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.apiError.background}`,
          color: theme.palette.apiError.background,
        },
        "&.RETURN": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.apiError.background}`,
          color: theme.palette.apiError.background,
        },
        "&.DELETE": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.apiError.background}`,
          color: theme.palette.apiError.background,
        },
        "&.REQ_DATA": {
          background: theme.palette.button.secondary,
          color: theme.palette.text[4],
          "&:hover": {
            color: theme.palette.text[3],
          },
        },
      },
      "& .assignToMe": {
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.background.content[3]}`,
        color: theme.palette.text[1],
        "&:hover": {
          border: `1px solid ${theme.palette.background.content[3]}`,
          background: theme.palette.common.white,
          color: theme.palette.text[1],
        },
      },
    },
    sticky: {
      display: `flex`,
      justifyContent: `flex-end`,
      background: theme.palette.text[18],
      position: `fixed`,
      overflow: `hidden`,
      bottom: 0,
      // paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginBottom: 0,
      zIndex: 999,
      borderTop: `1px solid #f9f9f9`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("lg")]: {
        width: `100%`,
        // left: 0,
        zIndex: 999,
      },
      [theme.breakpoints.down("md")]: {
        bottom: 0,
        background: `rgba(255,255,255,0.9)`,
      },
      [theme.breakpoints.up("xl")]: {
        left: SIDEBAR_WIDTH_XL,
        width: stickyWidth,
      },

      "&.openDrawer": {
        left: SIDEBAR_WIDTH,
        width: stickyWidth,
        // width: `100%`,
        zIndex: 990,
        "& button": {
          "&:last-child": {
            marginRight: theme.spacing(3),
          },
        },
      },
      "&.closeDrawer": {
        left: 0,
        width: `100%`,
      },
    },
    loadingBG: {
      background: `rgba(255,255,255,0)`,
      left: 0,
      width: stickyWidth - 8,
      [theme.breakpoints.up("xl")]: {
        left: 0,
        width: stickyWidthXL,
      },
      [theme.breakpoints.down("md")]: {
        left: 0,
        width: `100%`,
      },
      height: window.innerHeight,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      position: `fixed`,
      top: 0,
      zIndex: 9999999,
      "&.login": {
        left: 0,
        width: `100%`,
      },
    },
    errorContainer: {
      color: theme.palette.errorRed,
    },
  }));

  const classes = useStyles();

  //  KeyPress action handling
  const handleKeyPress = (e) => {
    if (
      pageAction === "search" ||
      pageAction === "login" ||
      pageAction === "reject" ||
      pageAction === "cancel" ||
      pageAction === "return" ||
      pageAction === "bulkAssign"
    ) {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        onFormSubmit("SUBMIT");
      }
    } else {
      return false;
    }
    return false;
  };

  //  Handle the Main Form layout with
  const handleResize = () => {
    setStickyWidth(window.innerWidth - SIDEBAR_WIDTH);
    setStickyWidthXL(window.innerWidth - SIDEBAR_WIDTH_XL);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {formInputs &&
        Object.keys(formInputs).length > 0 &&
        Object.keys(formInputs)
          .filter((section) => filteredFormObject(formInputs[section]))
          .map((section, index) => (
            <React.Fragment key={section}>
              <Grid container item lg={12} md={12} className={classes.section}>
                <SectionBody
                  hooks={hooks}
                  section={section}
                  formSection={formInputs[section]}
                  pageAction={pageAction}
                  onDropdownButton={onDropdownButton}
                />
              </Grid>
            </React.Fragment>
          ))}
      {actionTypes && (
        <SectionButtons
          layout={layout}
          pageAction={pageAction}
          onFormSubmit={onFormSubmit}
          onFormCancel={onFormCancel}
          actionTypes={actionTypes}
          assignee={assignee}
          isAPILoading={isAPILoading}
          disabled={disabled}
        />
      )}
    </>
  );
};

DynamicInlineForm.propTypes = {
  pageAction: PropTypes.string.isRequired,
  hooks: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  formInputs: PropTypes.objectOf(PropTypes.any).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default DynamicInlineForm;
