import { Popover } from "antd";
import { TOKEN_KEY } from "config";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loinIcon from "../../assets/login.svg";
import logoIcon from "../../assets/logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log("location", location);
  
  const popoverContent = (
    <>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          localStorage.removeItem(TOKEN_KEY);
          navigate("/login", { replace: true });
        }}
      >
        Logout
      </span>
    </>
  );
  return (
    <div className="home-page-header">
      <div className="home-page-img">
        <img className="home-page-logo" src={logoIcon} alt="" />
      </div>
      <div className="home-page-navigate">
        <Link to={"/"}>
          <span className={location.pathname == "/" ? `home-page-active`:""}>Home</span>
        </Link>
        <Link to={"user"}>
          <span className={location.pathname == "/user" ? `home-page-active`:""}>Profile</span>
        </Link>
        <Link to={"3dview"}>
          <span className={location.pathname == "/3dview" ? `home-page-active`:""}>3D View</span>
        </Link>
        <Popover content={popoverContent} placement="bottom" title={null}>
          <img src={loinIcon} alt="" />
        </Popover>
      </div>
    </div>
  );
};

export default Header;
