//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
//  Framework Components
import ButtonContained from "components/ButtonContained";

const ActionButtons = ({ layout, actionTypes, onFormSubmit, pageAction, isAPILoading }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion

  let newActionTypes = actionTypes;
  if (layout.type === "steps") newActionTypes = actionTypes.filter((item) => item !== "SUBMIT");

  //  KeyPress action handling
  const handleKeyPress = (e) => {
    if (
      pageAction === "search" ||
      pageAction === "login" ||
      pageAction === "reject" ||
      pageAction === "cancel" ||
      pageAction === "return"
    ) {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        onFormSubmit("SUBMIT");
      }
    } else {
      return false;
    }
    return false;
  };

  //  Action Buttons (Terminate | Evaluate | Reject | Release | Resume | Return | Return For Reject | Withdraw)

  return (
    <>
      {newActionTypes &&
        newActionTypes.length > 0 &&
        newActionTypes
          .filter((item) => item !== "DELETE" && item !== "CANCEL")
          .map((item) => (
            <ButtonContained
              key={item}
              color="primiary"
              type="button"
              value={item}
              onClick={() => onFormSubmit(item)}
              onKeyPress={handleKeyPress}
              disabled={isAPILoading}
              className={item}
            >
              {t(`commons.${item}`)}
            </ButtonContained>
          ))}
      {pageAction === "edit" &&
        newActionTypes.includes("DELETE") &&
        newActionTypes
          .filter((item) => item === "DELETE")
          .map((item) => (
            <ButtonContained
              key={item}
              color="primiary"
              type="button"
              value={item}
              onClick={() => onFormSubmit("DELETE")}
              disabled={isAPILoading}
              className={item}
            >
              {t(`commons.${item}`)}
            </ButtonContained>
          ))}
      {pageAction === "review" &&
        newActionTypes.includes("CANCEL") &&
        // formKey.includes('cancel') &&
        newActionTypes
          .filter((item) => item === "CANCEL")
          .map((item) => (
            <ButtonContained
              key={item}
              color="primiary"
              type="button"
              value={item}
              onClick={() => onFormSubmit("WITHDRAW")}
              disabled={isAPILoading}
              className="WITHDRAW"
            >
              {t(`commons.WITHDRAW`)}
            </ButtonContained>
          ))}
    </>
  );
};

ActionButtons.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ActionButtons;
