//  General JS Library importation
import React from "react";
import _ from "lodash";
// import Lightbox from 'react-image-lightbox';
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
//  Framework Components
import DynamicFormInputs from "components/DynamicForm/FormInputs";
import DynamicFormMultiple from "components/DynamicForm/Multiple";
//  Utility
import { isObject } from "utility/index"; //  Getting the re-useable functions from utility/index

//  Generate each Form Section Body
const SectionBody = ({ hooks, formSection, section, pageAction, onDropdownButton }) => {
  const useStyles = makeStyles((theme) => ({
    sectionBody: {
      // border: `1px solid red`,
      display: `flex`,
      alignItems: `flex-start`,
    },
    itemContainer: {
      // border: `1px solid red`,
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: 0,
      paddingRight: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  }));

  const classes = useStyles();
  const { fields, fieldGroup } = formSection;

  if (fieldGroup?.length > 0) {
    const shownFields = Object.values(fields)
      .filter((input) => isObject(input) && input.isShown === true)
      .sort((a, b) => a.groupOrder - b.groupOrder);
    const uniqueGroups = _.groupBy(shownFields, fieldGroup);
    const groupList = Object.keys(uniqueGroups);

    return (
      <Grid container item lg={12} className={classes.sectionBody}>
        {Object.keys(formSection).length > 0 &&
          groupList.map((group) => (
            <div style={{ width: "100%" }} key={group}>
              {group && <h4>{group}</h4>}
              {shownFields
                .filter((child) => child[fieldGroup] === group)
                .map((input) =>
                  input.type === "multiple" ? (
                    <DynamicFormMultiple
                      pageAction={pageAction}
                      key={`multiple_${pageAction}_${input.name}`}
                      index={`multiple_${pageAction}_${input.name}`}
                      section={section}
                      hooks={hooks}
                      inputField={input}
                    />
                  ) : (
                    <Grid
                      key={`${input.id}`}
                      container
                      item
                      xl={input.layoutGrid?.xl}
                      lg={input.layoutGrid?.lg}
                      md={input.layoutGrid?.md}
                      sm={input.layoutGrid?.sm}
                      xs={input.layoutGrid?.xs}
                      justifyContent="flex-start"
                      className={`${classes.itemContainer} itemContainer`}
                    >
                      <DynamicFormInputs
                        showLabel
                        pageAction={pageAction}
                        section={section}
                        hooks={hooks}
                        inputField={input}
                        onDropdownButton={onDropdownButton}
                        fields={fields}
                      />
                    </Grid>
                  ),
                )}
            </div>
          ))}
      </Grid>
    );
  } else {
    const showFields = Object.keys(fields).filter((input) => isObject(fields[input]) && fields[input].isShown === true);
    return (
      <Grid container item lg={12} className={classes.sectionBody}>
        {Object.keys(formSection).length > 0 && // Level 2 - Section Inputs
          showFields.map((input) =>
            fields[input].type === "multiple" ? (
              <DynamicFormMultiple
                pageAction={pageAction}
                key={`multiple_${pageAction}_${input}`}
                index={`multiple_${pageAction}_${input}`}
                section={section}
                hooks={hooks}
                inputField={fields[input]}
              />
            ) : (
              <Grid
                key={input}
                container
                item
                xl={fields[input].layoutGrid?.xl}
                lg={fields[input].layoutGrid?.lg}
                md={fields[input].layoutGrid?.md}
                sm={fields[input].layoutGrid?.sm}
                xs={fields[input].layoutGrid?.xs}
                justifyContent="flex-start"
                className={`${classes.itemContainer} itemContainer`}
              >
                <DynamicFormInputs
                  showLabel
                  pageAction={pageAction}
                  section={section}
                  hooks={hooks}
                  inputField={fields[input]}
                  onDropdownButton={onDropdownButton}
                  fields={fields}
                />
              </Grid>
            ),
          )}
      </Grid>
    );
  }
};

export default SectionBody;
