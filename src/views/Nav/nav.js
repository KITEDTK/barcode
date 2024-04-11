import React from "react";
import './nav.css';
import {NavLink,
} from "react-router-dom";

function Navigation() {
    return (
      <>
        <ul>
          <li>
            <NavLink to="/">Barcode Reader</NavLink>
          </li>
          <li>
            <NavLink to="/printer">Printer</NavLink>
          </li>
        </ul>
      </>
    );
}

export default Navigation;
