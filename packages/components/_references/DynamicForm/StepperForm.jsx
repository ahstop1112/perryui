//  General JS Library importation
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Box, Stepper, Step, StepLabel, Typography, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
//  Getting the Common Hooks from core/store/hooks
import useApp from "core/store/hooks/useApp";
import useForm from "core/store/hooks/useForm";
import useTaskCommon from "bpmp/core/store/hooks/useTaskCommon";
import { checkSiReqIsNotDuplicates } from "bpmp/core/showHideInputs/SI";
import { copyReleaseCollateralFundReq, checkFWRCcyIsNotDuplicates } from "bpmp/core/showHideInputs/FWR";
//  Utility
import { filteredFormObject } from "utility/index"; //  Getting the re-useable functions from utility/index
import SectionHeader from "./SectionHeader";
import SectionBody from "./SectionBody";
import SectionButtons from "./SectionButtons";

const DynamicStepperForm = ({ hooks, pageAction, onFormSubmit, onFormCancel, onDropdownButton }) => {
  const useStyles = makeStyles((theme) => ({
    stepperHeader: {
      display: "flex",
      flexWrap: `noWrap`,
      justifyContent: `space-between`,
      alignItems: `center`,
      marginBottom: theme.spacing(2.5),
    },
    stepper: {
      flex: `0 0 90%`,
      display: "flex",
      background: `none`,
      padding: 0,
      flexWrap: `wrap`,
      fontSize: `0.875rem`,
      fontWeight: 700,
      justifyContent: `flex-start`,
      "& .MuiStepLabel-label": {
        color: theme.palette.text[2],
      },
      "& .MuiStepIcon-root.Mui-active": {
        color: theme.palette.text[1],
        border: `none`,
        "& .MuiStepIcon-text": {
          fill: theme.palette.text[5],
        },
      },
      "& .MuiStepLabel-label.Mui-active": {
        color: theme.palette.text[1],
      },
      "& .MuiStepIcon-root.Mui-completed": {
        color: theme.palette.button[4],
      },
      "& .MuiStepConnector-root": {
        flex: `1 0 auto`,
        display: `none`,
      },
      "& .MuiStep-horizontal": {
        padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
      },
      "& .MuiStepIcon-root": {
        color: theme.palette.background.content[2],
        borderRadius: theme.spacing(3),
        border: `1px solid ${theme.palette.background.content[3]}`,
      },
      "& .MuiStepIcon-text": {
        fill: theme.palette.text[1],
        fontSize: `0.875rem`,
        fontWeight: 700,
      },
    },
    section: {
      // backgroundColor: theme.palette.background.content[2],
      padding: theme.spacing(2),
    },
    submitContainer: {
      right: 0,
      bottom: 0,
      marginTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      // borderTop: `1px solid #eee`,
      justifyContent: `flex-end`,
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
        "&.BACK": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
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
        "&.REQUEST_INFO": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.button[4]}`,
          color: theme.palette.text[1],
        },
        "&.CANCEL": {
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
          background: theme.palette.button[1],
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
    },
    errorContainer: {
      justifyContent: `flex-start`,
      paddingLeft: theme.spacing(2),
      "& p": {
        color: theme.palette.errorRed,
      },
    },
    formActionsContainer: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      // borderTop: `1px solid #eee`,
      justifyContent: `flex-end`,
      "& button": {
        marginRight: theme.spacing(2),
        padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
        color: theme.palette.text[5],
        fontSize: `0.875rem`,
        background: theme.palette.button[4],
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
          backgroundColor: theme.palette.button[2],
          color: theme.palette.text[5],
        },
        "&.SAVE": {
          background: theme.palette.button[3],
          color: theme.palette.text[5],
        },
        "&.CANCEL": {
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.background.content[3]}`,
          color: theme.palette.text[1],
          "&:hover": {
            color: theme.palette.text[1],
          },
        },
        "&.REJECT": {
          background: theme.palette.apiError.background,
          color: theme.palette.text[5],
        },
        "&.TERMINATE": {
          background: theme.palette.apiError.background,
          color: theme.palette.text[5],
        },
        "&.APPROVE": {
          background: theme.palette.text[11],
          color: theme.palette.text[5],
        },
        "&.RETURN": {
          background: theme.palette.text[13],
          color: theme.palette.text[5],
        },
        "&.DELETE": {
          background: theme.palette.apiError.background,
          color: theme.palette.text[5],
        },
      },
    },
    diagramIcon: {
      color: theme.palette.text[1],
      margin: 0,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(1),
      cursor: `pointer`,
    },
  }));
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { assignee, isAPILoading, actionTypes, formInputs } = hooks?.state || {};
  const { AppState } = useApp();
  const { checkAllValid, updateSectionFormInputs } = useForm(hooks);
  const { downloadDiagram } = useTaskCommon(hooks);
  const { toggleDrawer = false } = AppState;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const stepperFormRef = useRef(null);
  const { layout = {}, error = {} } = formInputs || {};

  const steps = Object.keys(formInputs).filter(
    (formSection) =>
      filteredFormObject(formInputs[formSection], formSection) && layout?.isSectionShown.includes(formSection),
  );

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    const sectionInputs = {
      layout: formInputs.layout,
      [steps[activeStep]]: formInputs[steps[activeStep]],
    };
    const isNotDuplicates = sectionInputs.siReq
      ? checkSiReqIsNotDuplicates(sectionInputs.siReq, t)
      : sectionInputs.fundWdrlReq
      ? checkFWRCcyIsNotDuplicates(sectionInputs.fundWdrlReq, t)
      : true;
    const isValid = checkAllValid(sectionInputs);

    updateSectionFormInputs(sectionInputs);

    if (isValid && isNotDuplicates) {
      if (sectionInputs.layout.isSectionShown.includes("releaseCollateralFundReq")) {
        copyReleaseCollateralFundReq(formInputs, "releaseCollateralFundReq");
      }
      if (sectionInputs.layout.isSectionShown.includes("thirdPartyDDFundOutScope")) {
        copyReleaseCollateralFundReq(formInputs, "thirdPartyDDFundOutScope");
      }
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      stepperFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // Scroll to Top
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className={classes.stepperHeader} ref={stepperFormRef}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {Object.keys(formInputs).length > 0 &&
            Object.keys(formInputs)
              .filter(
                (formSection) =>
                  filteredFormObject(formInputs[formSection], formSection) &&
                  layout?.type === "steps" &&
                  layout?.isSectionShown.includes(formSection),
              )
              .map((section, index) => {
                const stepProps = {};
                const labelProps = {};
                //   if (isStepOptional(index)) {
                //     labelProps.optional = <Typography variant='caption'>Optional</Typography>;
                //   }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={section} {...stepProps}>
                    <StepLabel {...labelProps}>{t(`${formInputs[section]?.title}`)}</StepLabel>
                  </Step>
                );
              })}
        </Stepper>
        {formInputs?.withDiagramImage && (
          <p className={classes.diagramIcon} onClick={() => downloadDiagram(formInputs, "user")}>
            <AccountTreeIcon className={classes.diagramIcon} />
          </p>
        )}
      </div>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <Grid container item lg={12} md={12} className={classes.section}>
          {SectionHeader(formInputs[steps[activeStep]], activeStep)}
          <SectionBody
            hooks={hooks}
            section={steps[activeStep]}
            formSection={formInputs[steps[activeStep]]}
            pageAction={pageAction}
            onDropdownButton={onDropdownButton}
          />
        </Grid>
      )}
      {Object.keys(error).length > 0 && !error.isFormValid && (
        <Grid container item lg={12} md={12} sm={12} className={`${classes.errorContainer}`}>
          {error.code.length > 0 &&
            error.code
              .filter((item, index) => error.code.indexOf(item) === index)
              .map((errorItem) => <p key={errorItem}>{t(`bpmp:bpmp.FormError.${errorItem}`)}</p>)}
        </Grid>
      )}
      <Grid
        container
        item
        lg={12}
        md={12}
        sm={12}
        className={`${classes.submitContainer} submit ${layout?.type === "accordion" ? classes.sticky : ``} ${
          toggleDrawer ? "openDrawer" : "closeDrawer"
        }`}
      >
        {activeStep > 0 && (
          <Button color="inherit" onClick={handleBack} className="BACK">
            Back
          </Button>
        )}
        {/* {isStepOptional(activeStep) && (
          <Button color='inherit' onClick={handleSkip} className='BACK'>
            Skip
          </Button>
        )} */}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} className="NEXT">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        ) : (
          <Button onClick={() => onFormSubmit("SUBMIT")} className="NEXT">
            {activeStep === steps.length - 1 ? "SUBMIT" : "Next"}
          </Button>
        )}
        <SectionButtons
          layout={layout}
          pageAction={pageAction}
          onFormSubmit={onFormSubmit}
          onFormCancel={onFormCancel}
          actionTypes={actionTypes}
          assignee={assignee}
          isAPILoading={isAPILoading}
        />
      </Grid>
    </Box>
  );
};

export default DynamicStepperForm;
