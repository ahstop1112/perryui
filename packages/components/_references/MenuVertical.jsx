//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import BuiListMenuItem from "./MenuListItem";

const MenuVertical = ({ data }) => (
  <>
    {_.map(data, (item, index) => (
      <BuiListMenuItem key={index} menuItem={item} />
    ))}
  </>
);

export default MenuVertical;

MenuVertical.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
