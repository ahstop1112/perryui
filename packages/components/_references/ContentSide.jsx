//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: theme.palette.background.grey,
    display: "flex",
    flexDirection: "column",
  },
}));

const ContentSide = ({ children, className, ...props }) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.grid, className)} {...props}>
      {children}
    </Grid>
  );
};

export default ContentSide;

ContentSide.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
