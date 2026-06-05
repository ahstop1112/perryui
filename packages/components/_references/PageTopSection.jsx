//  General JS Library importation
import React, { useEffect, useState, useRef, useCallback } from "react";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    padding: theme.spacing(2),
    paddingBottom: 0,
    display: `flex`,
    alignItems: `center`,
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      borderBottom: `1px solid #dedede`,
    },
    "& .makeStyles-backContainer-64": {
      alignItems: `center`,
      justifyContent: `flex-end`,
      [theme.breakpoints.down("sm")]: {
        display: `none`,
      },
    },
    "& button": {
      background: theme.palette.common.white,
      border: `1px solid ${theme.palette.button[4]}`,
      color: theme.palette.text[1],
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.5),
        height: `auto`,
        fontSize: `0.875rem`,
      },
      "&.add": {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.charts[3],
        color: theme.palette.text[5],
        borderRadius: theme.spacing(0.5),
        padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
        [theme.breakpoints.between("xs", "md")]: {
          marginRight: 0,
        },
        [theme.breakpoints.between("sm", "lg")]: {
          marginRight: theme.spacing(2),
        },
        "&:hover": {
          backgroundColor: theme.palette.charts[4],
        },
      },
      "&.react-datepicker__navigation": {
        border: `none !important`,
        background: `none !important`,
      },
      "&.react-datepicker__close-icon": {
        border: `none !important`,
        background: `none !important`,
      },
    },
  },
}));

const PageTopSection = ({ children }) => {
  const classes = useStyles();
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSticky = useCallback(
    ({ top, bottom }) => {
      if (top <= 0 && bottom > 2 * 68) {
        !isSticky && setIsSticky(true);
      } else {
        isSticky && setIsSticky(false);
      }
    },
    [isSticky],
  );

  useEffect(() => {
    const handleScroll = () => {
      toggleSticky(headerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleSticky]);

  return (
    <Grid container item lg={12} className={classes.pageHeader} ref={headerRef}>
      {children}
    </Grid>
  );
};

export default PageTopSection;
