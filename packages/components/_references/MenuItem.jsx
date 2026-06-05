import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem as BuiMenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles"; //  Define styles with @mui library
import { htiPrimaryGery25 } from "styles/AppColours";

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    margin: theme.spacing(1),
  },
  sectionItem: {
    margin: theme.spacing(1),
  },
  cardHeader: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    backgroundColor: htiPrimaryGery25,
  },
}));

const MenuItem = ({ menuItem }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const itemRef = useRef(null);

  const togglePopMenu = () => {
    setOpen(!open);
  };

  const closePopMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {menuItem.type === "LINK" && <Button onClick={menuItem.action}>{menuItem.title}</Button>}
      {menuItem.type === "GROUP" && (
        <>
          <Button
            ref={itemRef}
            onClick={() => togglePopMenu()}
            classes={{ root: classes.topLevelIcon }}
            startIcon={menuItem.icon}
          >
            {menuItem.title}
          </Button>
          <Popper open={open} anchorEl={itemRef.current} transition placement="bottom-start">
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: "center-bottom" }}>
                <Paper>
                  <ClickAwayListener onClickAway={() => closePopMenu()}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      {_.map(menuItem.subMenus, (item) => {
                        if (item.type === "LINK") {
                          return (
                            <BuiMenuItem className={classes.itemLink} onClick={item.action}>
                              {item.title}
                            </BuiMenuItem>
                          );
                        } else {
                          return <BuiMenuItem className={classes.itemLink}>{item.title}</BuiMenuItem>;
                        }
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </>
  );
};

export default MenuItem;
MenuItem.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.string).isRequired,
};
