import { Popover } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loinIcon from "../../assets/login.svg";
import logoIcon from "../../assets/logo.png";
import { deleteAllCookies } from "utils/utils";
import useIsMobile from "hooks/useIsMobile";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const popoverContent = (
    <div className="home-page-header-popover">
      {isMobile ? (
        <>
          <Link to={"/"}>
            <span
            >
              Home
            </span>
          </Link>
          <Link to={"user"}>
            <span
            >
              Profile
            </span>
          </Link>
          <Link to={"aisimulation"}>
            <span
            >
              AI Simulation
            </span>
          </Link>
        </>
      ) : null}
      <Link to={"login"}>
        <span
          onClick={() => {
            deleteAllCookies();
          }}
        >
          Logout
        </span>
      </Link>
    </div>
  );
  return (
    <div className="home-page-header">
      <div className="home-page-img">
        <img className="home-page-logo" src={logoIcon} alt="" />
      </div>
      <div className="home-page-navigate">
        {!isMobile ? (
          <>
            <Link to={"/"}>
              <span
                className={location.pathname == "/" ? `home-page-active` : ""}
              >
                Home
              </span>
            </Link>
            <Link to={"user"}>
              <span
                className={
                  location.pathname == "/user" ? `home-page-active` : ""
                }
              >
                Profile
              </span>
            </Link>
            <Link to={"aisimulation"}>
            <span
            >
              AI Simulation
            </span>
          </Link>
          </>
        ) : null}
        <Popover content={popoverContent} placement="bottom" title={null}>
          <img src={loinIcon} alt="" />
        </Popover>
      </div>
    </div>
  );
};

export default Header;
