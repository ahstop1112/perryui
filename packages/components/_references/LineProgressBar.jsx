//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  filler: {
    borderRadius: "inherit",
    textAlign: "right",
    height: theme.spacing(1),
  },
}));

const LineProgressBar = ({ bgcolors, datas, showZero }) => {
  const classes = useStyles();

  const containerStyles = {
    width: "100%",
    borderRadius: 10,
    display: "inline-flex",
  };

  return (
    <div style={containerStyles}>
      {_.map(datas, (data, key) => {
        if (data.value > 0) {
          return (
            <Tooltip key={key} title={`${data.key}: ${data.value}%`}>
              <div className={classes.filler} style={{ width: `${data.value}%`, backgroundColor: bgcolors[key] }}>
                {/* <span style={labelStyles}>{`${data.value}%`}</span> */}
              </div>
            </Tooltip>
          );
        } else if (showZero) {
          return (
            <Tooltip key={key} title={`${data.key}: ${data.value}%`}>
              <div className={classes.filler} style={{ width: `${0.5}%`, backgroundColor: bgcolors[key] }}>
                {/* <span style={labelStyles}> </span> */}
              </div>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip key={key} title={`${data.key}: ${data.value}%`}>
              <div className={classes.filler} style={{ width: "0%", backgroundColor: bgcolors[key] }}>
                {/* <span style={labelStyles}>{`${data.value}%`}</span> */}
              </div>
            </Tooltip>
          );
        }
      })}
    </div>
  );
};

export default LineProgressBar;

LineProgressBar.propTypes = {
  bgcolors: PropTypes.arrayOf(PropTypes.string).isRequired,
  datas: PropTypes.arrayOf(PropTypes.string).isRequired,
  showZero: PropTypes.bool.isRequired,
};
