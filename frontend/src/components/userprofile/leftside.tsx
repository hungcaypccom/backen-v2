import React from "react";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";

interface Props {
  setSettingType: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSide: React.FC<Props> = ({ setSettingType }) => {
  return (
    <div className="user-category">
      <p className="user-category-name">Account setting</p>
      <div className="user-category-list">
        <div
          onClick={() => setSettingType(true)}
          className="user-category-item"
        >
          <InfoCircleOutlined />
          <p>Basic information</p>
        </div>
        <div
          onClick={() => setSettingType(false)}
          className="user-category-item"
        >
          <SettingOutlined />
          <p>Password</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
