import Layout from "components/layout";
import Information from "components/userprofile/basic.information";
import LeftSide from "components/userprofile/leftside";
import Password from "components/userprofile/password";
import { UserProfile } from "interface/user";
import React, { useState } from "react";
import "./style.css";

const UserProfilePage: React.FC = () => {
  const [settingType, setSettingType] = useState<boolean>(true);

  return (
    <Layout>
      <div className="user-container">
        <LeftSide setSettingType={setSettingType} />
        {settingType ? <Information /> : <Password />}
      </div>
    </Layout>
  );
};

export default UserProfilePage;
