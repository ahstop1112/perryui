import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink
    ref={ref}
    {...props}
    className={({ isActive }) =>
      [props.className, isActive ? props.activeClassName || "active" : null].filter(Boolean).join(" ")
    }
  />
));

export default NavLink;
