/* eslint-disable react/prop-types */
import SideBarMenu from "components/SideBarMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SideBarMenu
      menus={[
        { title: "Home", url: "/" },
        { title: "Companies", url: "/company" },
        { title: "Cloths", url: "/cloth-resource" },
        { title: "Storage", url: "/storage" },
        { title: "M2M Token", url: "/token" },
      ]}
    >
      <Outlet />
    </SideBarMenu>
  );
};
export default Layout;
