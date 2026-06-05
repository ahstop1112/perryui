//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

const MetaTitle = ({ title }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  return (
    <Helmet>
      <title>{title || t("commons.unknown")}</title>
    </Helmet>
  );
};

export default MetaTitle;

MetaTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
