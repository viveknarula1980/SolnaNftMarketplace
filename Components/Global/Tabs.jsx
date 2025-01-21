import React from "react";

const Tabs = () => {
  return (
    <ul className="widget-menu-tab">
      <li className="item-title">
        <span className="inner">Category</span>
      </li>
      <li className="item-title active">
        <span className="inner">Items</span>
      </li>
      <li className="item-title">
        <span className="inner">Status</span>
      </li>
      <li className="item-title">
        <span className="inner">Price range</span>
      </li>
    </ul>
  );
};

export default Tabs;
