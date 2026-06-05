//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Fab } from "@mui/material";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  tooltipBtn: {
    backgroundColor: `${theme.palette.background.content[3]} !important`,
    "&:hover": {
      backgroundColor: theme.palette.brandColor,
    },
    [theme.breakpoints.down("md")]: {
      display: `block`,
      zIndex: 990,
      bottom: 30,
      right: 15,
      "& .MuiFab-label": {
        height: 24,
      },
    },
  },
}));

const TooltipAddButton = ({ addTitle, addUrl }) => {
  const classes = useStyles();

  return (
    <Tooltip
      className={classes.tooltipBtn}
      title={addTitle}
      aria-label={addTitle}
      onClick={() => {
        window.location.href = addUrl;
      }}
    >
      <Fab color="primary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default TooltipAddButton;

TooltipAddButton.propTypes = {
  addTitle: PropTypes.string.isRequired,
  addUrl: PropTypes.string.isRequired,
};
