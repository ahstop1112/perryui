//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@mui/material";

const Loading = ({ size }) => (
  <Grid container justifyContent="center" alignItems="center">
    <CircularProgress size={size} />
  </Grid>
);

export default Loading;

Loading.propTypes = {
  size: PropTypes.number.isRequired,
};
