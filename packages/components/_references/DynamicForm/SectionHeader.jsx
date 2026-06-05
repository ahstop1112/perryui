//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  subTitle: {
    lineHeight: 1.2,
    fontSize: `1.25rem`,
    color: theme.palette.text[2],
    fontWeight: 700,
    margin: 0,
    // marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: `1rem`,
    },
  },
  sectionHeader: {
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
}));

const SectionHeader = ({ formSection, titleFromApi }) => {
  const { t } = useTranslation();
  const { title } = formSection || {};

  const classes = useStyles();

  return (
    <Grid container item lg={12} className={classes.sectionHeader}>
      <Grid container item lg={10}>
        {title && <h5 className={classes.subTitle}>{titleFromApi ? title : t(`${title}`)}</h5>}
      </Grid>
      {/* <Grid container item lg={2} md={2} sm={6} className={classes.submitContainer}>
          {isReadWrite && pageAction === 'view' && (
            <ButtonContained
              type='button'
              value='button'
              onClick={() => navigate(editLink)}
              className={classes.button}
              disabled={false}>
              {t('commons.edit')}
            </ButtonContained>
          )}
        </Grid> */}
    </Grid>
  );
};

export default SectionHeader;
