//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import { Breadcrumbs, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    color: theme.palette.base.black[1],
  },
}));

const BackButton = ({ navigate }) => {
  const classes = useStyles();
  const { t } = useTranslation(); //  Using the react i18n for translateion

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link className={classes.breadcrumb} href={navigate(-1)}>
        &larr; {`${t("commons.back")} `}
      </Link>
    </Breadcrumbs>
  );
};

export default BackButton;

BackButton.propTypes = {
  navigate: PropTypes.string.isRequired,
};
