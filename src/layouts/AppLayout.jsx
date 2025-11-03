import { Layout } from "antd";
import styled from "styled-components";
import Sidebar from "./components/Sider";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState, useCallback } from "react";
import AppBreadcrumb from "@/components/AppBreadcrumb";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const handleCollapse = useCallback((value) => {
    setCollapsed(value);
  }, []);
  return (
    <Layout>
      <SiderWrapper width={235} collapsed={collapsed} onCollapse={handleCollapse}>
        <Sidebar collapsed={collapsed} hasLogo />
      </SiderWrapper>
      <Layout>
        <div style={{ minHeight: "100dvh", position: "relative" }}>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <ContentWrapper>
            <AppBreadcrumb />
            <Outlet/>
          </ContentWrapper>
        </div>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

const HeaderWrapper = styled(Layout.Header)`
  background: #fff;
  box-shadow: 6px 0 8px #ccc;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding-left: calc(235px + 24px);
`;

const SiderWrapper = styled(Layout.Sider)`
  position: sticky;
  top: 0;
  height: 100dvh;
  background: #fff;
  /* box-shadow: 2px 0 8px #ccc; */
  z-index: 1001;
`;

const ContentWrapper = styled(Layout.Content)`
  position: relative;
  min-height: calc(100vh - 64px);
  margin-top: 64px;
  padding: 24px;
  transition: opacity 0.2s ease-in-out;
`;
