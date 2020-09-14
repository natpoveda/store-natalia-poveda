import React, { useContext } from "react";
import { HashRouter, Link } from "react-router-dom";
import { HeaderContext } from "../contexts/contextProviderHeader";
import headphones from "../assets/icons/header.png";

const Header = () => {
  const { user } = useContext(HeaderContext);
  let name = "";
  let points = "";

  if (user != null) {
    name = user.name;
    points = user.points;
  }

  return (
    <>
      <div className="top box">
        <div className="logo"></div>

        <div className="nav-content">
          <HashRouter>
            <ul className="tabs tabs-transparent">
              <li className="tab" key="h00">
                <Link key="header00" to="">
                  <div className="umenu">Home</div>
                </Link>
              </li>
              <li className="tab" key="h01">
                <Link key="header01" to="user">
                  <div className="umenu">User Space</div>
                </Link>
              </li>
            </ul>
          </HashRouter>
        </div>
        <div className="profile">
          <div className="namexUser">{name}</div>
          <div className="points">
            <div className="rectangle">
              <div className="number">{points}</div>
              <div className="money"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <img src={headphones} alt="header headphones"></img>
      </div>
    </>
  );
};

export default Header;
