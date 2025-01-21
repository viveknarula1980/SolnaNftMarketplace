import React from "react";

import { Market_1 } from "../SVG/index";

const Filter = ({}) => {
  return (
    <div className="tf-soft">
      <div className="soft-right">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton4"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Market_1 />
            <span>Sort by: recently added</span>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <h6>Sort by</h6>
            <a className="dropdown-item">
              <div className="sort-filter">
                <span>Recently added</span>
                <span className="icon-tick">
                  <span className="path2" />
                </span>
              </div>
            </a>
            <a className="dropdown-item">
              <div className="sort-filter">
                <span>Price: Low to High</span>
                <span className="icon-tick">
                  <span className="path2" />
                </span>
              </div>
            </a>
            <a className="dropdown-item">
              <div className="sort-filter">
                <span>Price: High to Low</span>
                <span className="icon-tick">
                  <span className="path2" />
                </span>
              </div>
            </a>

            <h6>Options</h6>
            <a className="dropdown-item">
              <div className="sort-filter">
                <span>Toggle to play</span>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                />
              </div>
            </a>
            <a className="dropdown-item">
              <div className="sort-filter">
                <span>Show lazy minted</span>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
