import Header from "components/home/header";
import React, { Children } from "react";
import "./style.css";

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="home-page">
      <div className="home-page-container">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
