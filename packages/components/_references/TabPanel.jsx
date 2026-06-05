//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  tabContent: {
    width: "100%",
    "& .MuiBox-root": {
      paddingTop: theme.spacing(1.5),
      padding: 0,
    },
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={classes.tabContent}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

export default TabPanel;

TabPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
