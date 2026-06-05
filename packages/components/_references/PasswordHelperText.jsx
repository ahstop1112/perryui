//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";

import CrossRedIcon from "assets/svg/icons/CrossRed.svg";
import GreenTickIcon from "assets/svg/icons/GreenTick.svg";
import GreyTickIcon from "assets/svg/icons/GreyTick.svg";

const PasswordHelperText = ({ password, success, label }) => {
  const useStyles = makeStyles((theme) => ({
    grid: {
      marginTop: theme.spacing(1.5),
    },
    icon: {
      height: 16,
      width: 16,
    },
    label: {
      color: password ? theme.palette.common.black : theme.palette.grey.dark,
      fontSize: 12,
      padding: theme.spacing(0, 1),
    },
  }));
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.grid}>
      {(() => {
        if (success && password) {
          return <img src={GreenTickIcon} className={classes.icon} alt="Green Tick Icon" />;
        }
        if (!success && password) {
          return <img src={CrossRedIcon} className={classes.icon} alt="Cross Icon" />;
        }
        return <img src={GreyTickIcon} className={classes.icon} alt="Grey Tick Icon" />;
      })()}
      <Typography className={classes.label}>{label}</Typography>
    </Grid>
  );
};

export default PasswordHelperText;

PasswordHelperText.propTypes = {
  success: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
