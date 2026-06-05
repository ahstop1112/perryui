import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { useTranslation } from "react-i18next";
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Button, MenuItem } from "@mui/material";
import { black, htiPrimaryBlue75, htiPrimaryGery10, htiSecondaryDarkCyan } from "styles/AppColours";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavLink from "components/NavLink";

const useStyles = makeStyles((theme) => ({
  activeNavItem: {
    backgroundColor: htiPrimaryGery10,
    "& div": {
      color: black,
    },
  },
  drawerList: {
    overflow: "initial",
    padding: 0,
    margin: 0,
  },
  drawerListItem: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    "&:hover, &:focus": {
      backgroundColor: htiSecondaryDarkCyan,
      color: htiPrimaryGery10,
      "& div": {
        color: htiPrimaryGery10,
      },
    },
    color: htiPrimaryBlue75,
  },
  drawerListIcon: {
    color: htiPrimaryBlue75,
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(3),
    fontSize: theme.spacing(3),
  },
  drawerListText: {
    padding: 0,
    fontWeight: "bolder",
    color: htiPrimaryBlue75,
  },
  drawerListTextPrimary: {
    padding: 0,
    fontWeight: "bolder",
  },
  drawerListItemNest: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),
    "&:hover, &:focus": {
      backgroundColor: htiSecondaryDarkCyan,
      color: htiPrimaryGery10,
      "& div": {
        color: htiPrimaryGery10,
      },
    },
  },
  topLevelIcon: {
    fontSize: theme.spacing(5),
    // fill: htiLimitedYellowGreen75
  },
}));

const MenuListItem = ({ menuItem }) => {
  const { t } = useTranslation(); //  Using the react i18n for translateion
  const classes = useStyles();

  const location = useLocation();

  const [subMenuOpen, setSubMenuOpen] = useState(true);

  function toggleSubMenuOpen() {
    setSubMenuOpen(!subMenuOpen);
  }

  // TODO how to handle active on parent item
  const getNavLinkClass = (path) => (location.pathname === path ? classes.activeNavItem : "");

  return (
    <>
      {menuItem.type === "GROUP" && (
        <>
          <ListItem
            button
            onClick={() => toggleSubMenuOpen()}
            className={`${classes.drawerListItem} ${getNavLinkClass()}`}
          >
            <ListItemIcon className={classes.drawerListIcon}>
              {React.cloneElement(menuItem.icon, { className: classes.topLevelIcon })}
            </ListItemIcon>
            <ListItemText
              primary={t(menuItem.title)}
              primaryTypographyProps={{ variant: "subtitle1" }}
              classes={{
                root: classes.drawerListText,
                primary: classes.drawerListTextPrimary,
              }}
            />
            {subMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
            {_.map(menuItem.subMenus, (item, index) => {
              if (item.type === "LINK") {
                return (
                  <List key={index} component="div" disablePadding dense="true" className={classes.drawerList}>
                    {/* <MenuItem onClick={item.action}>{item.title}</MenuItem> */}
                    <ListItem
                      button
                      className={classes.drawerListItemNest}
                      component={React.forwardRef((props) => {
                        if (_.isUndefined(item.link)) {
                          return <Button {...props} onClick={item.action} />;
                        } else {
                          return (
                            <NavLink
                              {...props}
                              to={item.link}
                              onClick={item.action}
                              activeClassName={classes.activeNavItem}
                            />
                          );
                        }
                      })}
                    >
                      {item.icon && <ListItemIcon className={classes.drawerListIcon}>{item.icon}</ListItemIcon>}
                      <ListItemText
                        inset
                        primary={t(item.title)}
                        primaryTypographyProps={{ variant: "body2" }}
                        className={classes.drawerListText}
                      />
                    </ListItem>
                  </List>
                );
              } else {
                return <MenuItem>{item.title}</MenuItem>;
              }
            })}
          </Collapse>
        </>
      )}
    </>
  );
};

export default MenuListItem;

MenuListItem.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.string).isRequired,
};
