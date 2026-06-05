//  General JS Library importation
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import BuiMenuItem from "components/MenuItem";

const MenuHorizontal = ({ data }) => (
  <>
    {_.map(data, (item, index) => (
      <React.Fragment key={index}>
        {index > 0 && " | "}
        <BuiMenuItem menuItem={item} />
      </React.Fragment>
    ))}
  </>
);

export default MenuHorizontal;

MenuHorizontal.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
