//  General JS Library importation
import React from "react";
import { useTranslation } from "react-i18next";
//  Getting the Common Hooks from core/store/hooks
import useAuth from "core/store/hooks/useAuth"; //  Getting the authentication data or functions from useAuth
//  Framework Components
import ButtonContained from "components/ButtonContained";
import ActionButtons from "./ActionButtons";

const SectionButtons = ({
  layout,
  actionTypes,
  assignee,
  onFormSubmit,
  onFormCancel,
  pageAction,
  isAPILoading,
  disabled,
}) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { userStorage } = useAuth();

  return (
    <>
      {/* //  Evaluate Buttons */}
      {pageAction === "evaluate" ? (
        <>
          <ButtonContained
            color="primiary"
            type="button"
            value="OK"
            className="CANCEL"
            onClick={onFormCancel}
            disabled={false}
          >
            {t("logout.alertDialog.cancel")}
          </ButtonContained>
          <ButtonContained color="primiary" type="button" value="OK" onClick={onFormSubmit} disabled={false}>
            {t("bpmp:bpmp.commons.sendEvaluateRequest")}
          </ButtonContained>
        </>
      ) : null}
      {pageAction === "reject" ||
      pageAction === "release" ||
      pageAction === "resume" ||
      pageAction === "return" ||
      pageAction === "returnForReject" ||
      pageAction === "terminate" ||
      pageAction === "submit" ||
      pageAction === "approve" ? (
        <>
          <ButtonContained
            color="primiary"
            type="button"
            value="OK"
            className="CANCEL"
            onClick={onFormCancel}
            loading={false}
            disabled={false}
          >
            {t("logout.alertDialog.cancel")}
          </ButtonContained>
          <ButtonContained color="primiary" type="button" value="OK" onClick={onFormSubmit} disabled={false}>
            {t("logout.alertDialog.ok")}
          </ButtonContained>
        </>
      ) : null}
      {pageAction === "withdraw" && actionTypes.includes("CANCEL") ? (
        <>
          <ButtonContained
            color="primiary"
            type="button"
            value="OK"
            className="CANCEL"
            onClick={onFormCancel}
            disabled={disabled}
          >
            {t("logout.alertDialog.cancel")}
          </ButtonContained>
          <ButtonContained color="primiary" type="button" value="OK" onClick={onFormSubmit} disabled={false}>
            {t("bpmp:bpmp.commons.withdraw")}
          </ButtonContained>
        </>
      ) : null}
      {pageAction === "add" ||
      pageAction === "login" ||
      pageAction === "draft" ||
      pageAction === "edit" ||
      pageAction === "resubmit" ||
      (pageAction === "review" && assignee === userStorage?.loginId && actionTypes) ? (
        <ActionButtons
          layout={layout}
          actionTypes={actionTypes}
          pageAction={pageAction}
          onFormSubmit={onFormSubmit}
          isAPILoading={isAPILoading}
        />
      ) : null}
      {pageAction === "bulkAssign" ? (
        <ButtonContained
          className="BULK_ASSIGN"
          color="primiary"
          type="button"
          value="OK"
          onClick={onFormSubmit}
          disabled={disabled}
        >
          {t("bpmp:bpmp.commons.bulkAssign")}
        </ButtonContained>
      ) : null}
    </>
  );
};

export default SectionButtons;
