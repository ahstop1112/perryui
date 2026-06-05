//  General JS Library importation
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import ErrorIcon from "@mui/icons-material/Error";
//  Getting the Common Hooks from core/store/hooks
import useApiHandler from "core/store/hooks/useApiHandler"; //  Getting the API Handler dispatch from useApiHandler (Red Box on the right top)
//  Styles
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library

const useStyles = makeStyles((theme) => ({
  "@keyframes toast-in-right": {
    "0%": {
      opacity: 0,
      transform: "translateX(100%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes toast-in-left": {
    from: {
      transform: `translateX(-100%)`,
    },
    to: {
      transform: `translateX(0)`,
    },
  },
  ToastContainer: {
    width: 400,
  },
  notification: {
    transition: `.3s ease`,
    position: `relative`,
    pointerEvents: `auto`,
    overflow: `hidden`,
    margin: `0 0 6px`,
    marginBottom: `15px`,
    width: 400,
    color: `#fff`,
    opacity: 0.9,
    display: `flex`,
    "&.top-right": {
      top: `12px`,
      right: `12px`,
      transitionProperty: `transform`,
      transitionTimingFunction: `ease-in-out`,
      transitionDuration: `7s`,
      animation: `$toast-in-right 0.85s `,
    },
    "&:hover": {
      opacity: 1,
      cursor: `pointer`,
    },
  },
  container: {
    flex: `0 0 85%`,
  },
  id: {
    fontWeight: 700,
    fontSize: `0.75rem`,
    textAlign: `left`,
    marginTop: 0,
    marginBottom: 6,
  },
  title: {
    fontWeight: 900,
    fontSize: `1em`,
    textAlign: `left`,
    marginTop: 0,
    marginBottom: 6,
    height: `1.125em`,
  },
  message: {
    margin: 0,
    textAlign: `left`,
    marginLeft: -1,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    fontSize: `0.875em`,
  },
  image: {
    float: `left`,
    marginRight: 15,
    "& img": {
      width: 30,
      height: 30,
    },
  },
  toast: {
    width: 365,
    color: theme.palette.background.content[2],
    padding: `20px 15px`,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  messageText: {
    color: "inherit",
  },
  detailExpansion: {
    color: theme.palette.error.main,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  detailExpansionSummary: {
    height: theme.spacing(4),
    minHeight: theme.spacing(4),
  },
  detailPanel: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  detailHeaderText: {
    color: "inherit",
    fontWeight: "bolder",
  },
  detailItem: {
    padding: theme.spacing(0),
  },
  traceIdGrid: {
    paddingTop: theme.spacing(0),
    textAlign: "end",
  },
  traceIdText: {
    color: "inherit",
  },
}));

const NotificationPopUp = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const { ApiHandlerState, dispatch: apiHandlerDispatch } = useApiHandler();
  const errorPath = ApiHandlerState?.errorPath;
  const currentPath = window.location.href;
  const dismissAllToast = () => toast.dismiss();
  let toastList = ApiHandlerState?.toastList;

  const displayToast = () => {
    const toastIndex = toastList.length - 1;
    toastList.map((item, index) => {
      const latest = 0;

      const description = `${item?.errorCode} : ${t(`bpmp:errors.${item?.errorCode}`)}`;

      const subDescription =
        !item?.errorInfoList || !item?.errorInfoList[0]
          ? item?.description
          : `${item?.errorInfoList[latest].errorCode} : ${
              item?.errorInfoList[latest]?.errorParams
                ? t(`bpmp:errors.${item?.errorInfoList[latest]?.errorCode}`, {
                    ...item?.errorInfoList[latest]?.errorParams,
                  })
                : t(`bpmp:errors.${item?.errorInfoList[latest]?.errorCode}`)
            } ${
              item?.errorInfoList[latest]?.errorParams?.fieldName
                ? ` --- ${item?.errorInfoList[latest]?.errorParams?.fieldName}`
                : ""
            }`;

      return toast.error(
        <InitToast
          index={toastIndex}
          title={item.title}
          description={`${!description ? `` : description} ${!subDescription ? `` : subDescription}`}
          messageParams={item.errorParams}
          traceId={item.traceId}
        />,
        {
          toastId: toastIndex,
          theme: "colored",
          icon: false,
        },
      );
    });
  };

  useEffect(() => {
    // console.log(errorPath);
    // console.log(currentPath);
    if (toastList.length > 0 && errorPath === currentPath) {
      displayToast();
    } else {
      toastList = [];
      apiHandlerDispatch({ type: "CLEAR_TOAST_LIST" });
      dismissAllToast();
    }
  }, [currentPath, errorPath, toastList]);

  const InitToast = ({ title, description, traceId }) => (
    <div className={classes.notification}>
      <ErrorIcon className={classes.image} />
      <div className={classes.container}>
        <p className={classes.title}>{title}</p>
        <p className={classes.id}>{traceId}</p>
        <p className={classes.message}>{description}</p>
      </div>
    </div>
  );

  InitToast.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  return (
    <div>
      <ToastContainer
        className={classes.ToastContainer}
        position="top-right"
        autoClose={30000}
        hideProgressBar="true"
        newestOnTop="true"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default NotificationPopUp;
