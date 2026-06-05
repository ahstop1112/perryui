//  General JS Library importation
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { AlertDialogs } from "components/index";
import useTaskCommon from "bpmp/core/store/hooks/useTaskCommon"; //  Getting the common Form features from useForm
import ButtonContained from "components/ButtonContained";

const useStyles = makeStyles((theme) => ({
  filterLinks: {
    flex: `0 0 auto`,
    display: `flex`,
    alignItems: `center`,
    flexWrap: `noWrap`,
    [theme.breakpoints.down("sm")]: {
      flex: `0 0 auto`,
      padding: 0,
      justifyContent: `flex-start`,
    },
  },
  filterLink: {
    flex: `0 0 auto`,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    minWidth: 150,
    textAlign: `center`,
    cursor: `pointer`,
    "&.active": {
      borderBottom: `3px solid ${theme.palette.text[13]}`,
    },
    "& .MuiChip-root": {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down("md")]: {
      padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
      paddingBottom: theme.spacing(0.75),
      minWidth: 0,
      "&.active": {
        borderBottom: `2px solid ${theme.palette.text[13]}`,
      },
      "& .MuiChip-root": {
        marginLeft: theme.spacing(0.5),
        height: 22,
        width: 22,
      },
      "& .MuiChip-label": {
        fontSize: `0.75rem`,
        padding: 0,
      },
    },
  },
  bulkButton: {
    background: theme.palette.button.selected,
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    color: theme.palette.text[5],
    borderRadius: theme.spacing(5),
    display: `block`,
    minWidth: 130,
    maxHeight: 44,
    fontWeight: 700,
    textTransform: `capitalize`,
    "&:hover": {
      backgroundColor: theme.palette.button.selected,
      color: theme.palette.text[5],
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
}));

const ClaimFilters = ({ hooks }) => {
  const { itemListType } = useParams();
  const location = useLocation();
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { bulkClaim, bulkAdminUnclaim } = useTaskCommon(hooks); //  Get Dynamic Form related functions from useForm
  const { state } = hooks;
  const { selectedTaskIds = [] } = state || {};
  const [open, setOpen] = useState(false);

  return (
    <>
      {itemListType === `request-inbox` && (
        <ButtonContained
          type="button"
          value="button"
          color="secondary"
          className={classes.bulkButton}
          disabled={selectedTaskIds.length < 1}
          onClick={() => bulkClaim(state)}
        >
          {t("bpmp:bpmp:Task.bulkClaimT")}
        </ButtonContained>
      )}
      {location?.pathname.includes(`bpmp-admin/claimed-task`) && (
        <ButtonContained
          type="button"
          value="button"
          color="secondary"
          className={classes.bulkButton}
          disabled={selectedTaskIds.length < 1}
          onClick={() => setOpen(true)}
        >
          {t("bpmp:bpmp:Task.bulkUnclaim")}
        </ButtonContained>
      )}
      <AlertDialogs
        open={open}
        onOk={() => bulkAdminUnclaim(selectedTaskIds)}
        okColor="red"
        onCancel={() => setOpen(false)}
        text4Ok={t(`bpmp:bpmp:Task.proceed`)}
        text4Cancel={t(`bpmp:bpmp:Task.backToEdit`)}
        title={t(`bpmp:bpmp:Task.bulkUnclaim`)}
        content={<Trans i18nKey="bpmp:bpmp:Task.bulkUnclaimContent" components={{ taskIds: selectedTaskIds.length }} />}
      />
    </>
  );
};

export default ClaimFilters;
