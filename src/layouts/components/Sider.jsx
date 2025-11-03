// import { Button, Divider, Flex, Menu, MenuProps, Modal } from "antd";
// import { useEffect, useState } from "react";
import PATH from "@/configs/PATH";
// import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  LogOutIcon,
  ScrollTextIcon,
  SendIcon,
  UserRoundCogIcon,
  UserRoundXIcon,
} from "lucide-react";
import styled from "styled-components";
import LogoutModal from "@/components/Modals/LogoutModal";
import { Divider, Menu } from "antd";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// function Sidebar({ collapsed }) {
//   const [current, setCurrent] = useState("1");
//   const [openModal, setOpenModal] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     setCurrent(location.pathname);
//   }, []);
//   const items = [
//     {
//       label: "Overview",
//       key: PATH.OVERVIEW,
//       icon: <ChartNoAxesColumnIncreasingIcon size={14} />,
//     },
//     {
//       label: "Manage Campaigns",
//       key: PATH.CAMPAIGN.ROOT,
//       icon: <CalendarDaysIcon size={14} />,
//     },
//     {
//       label: "Broadcast List",
//       key: PATH.BROADCAST,
//       icon: <SendIcon size={14} />,
//     },
//     {
//       label: "Blacklist",
//       key: PATH.BLACK_LIST,
//       icon: <UserRoundXIcon size={14} />,
//     },
//     {
//       label: "Report",
//       icon: <ScrollTextIcon size={14} />,
//       key: PATH.REPORT.ROOT,
//       children: [
//         {
//           label: "Campaign Report",
//           key: PATH.REPORT.CAMPAIGN_REPORT,
//         },
//         {
//           label: "Overall Report",
//           key: PATH.REPORT.OVERALL_REPORT,
//         },
//         {
//           label: "Message History",
//           key: PATH.REPORT.MESSAGE_HISTORY,
//         },
//       ],
//     },
//     {
//       label: "Account Management",
//       key: PATH.ACCOUNT_MANAGEMENT,
//       icon: <UserRoundCogIcon size={14} />,
//     },
//   ];
//   const onClick = (e) => {
//     setCurrent(e.key);
//     navigate(e.key);
//   };

//   return (
//     <>
//       <Flex vertical justify='space-between' style={{ height: "100dvh" }}>
//         <div>
//           <Logo>{!collapsed ? <h2>Smart SMS</h2> : <h6>Smart SMS</h6>}</Logo>
//           <Menu
//             theme='light'
//             onClick={onClick}
//             defaultOpenKeys={[PATH.REPORT.ROOT]}
//             selectedKeys={[current]}
//             mode='inline'
//             className='menu-sidebar'
//             items={items}
//           />
//         </div>
//         <LogoutWrapper>
//           <Divider />
//           <Button
//             color='danger'
//             variant='filled'
//             block
//             icon={<LogOutIcon size={14} />}
//             onClick={() => setOpenModal(true)}
//           >
//             Logout
//           </Button>
//         </LogoutWrapper>
//       </Flex>

//       <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />
//     </>
//   );
// }

// export default Sidebar;

const Logo = styled.div`
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  h2,
  h6 {
    color: #2c7a8c;
    text-transform: uppercase;
  }
`;

const LogoutWrapper = styled.div`
  padding: 4px;
  padding-bottom: 8px;

  .ant-divider {
    margin: 8px 0;
  }
`;
// import { UnsavedChangesModal } from '../AppModal/modals';
// import { useUnsaved } from '@/contexts/UnsavedContext';
const menuItems = [
  {
    label: "Overview",
    key: "overview",
    path: PATH.OVERVIEW,
    icon: <ChartNoAxesColumnIncreasingIcon size={14} />,
  },
  {
    label: "Manage Campaigns",
    key: "manage-campaigns",
    path: PATH.CAMPAIGN.ROOT,
    icon: <CalendarDaysIcon size={14} />,
  },
  {
    label: "Broadcast List",
    key: "broadcast-list",
    path: PATH.BROADCAST,
    icon: <SendIcon size={14} />,
  },
  {
    label: "Blacklist",
    key: "blacklist",
    path: PATH.BLACK_LIST,
    icon: <UserRoundXIcon size={14} />,
  },
  {
    label: "Report",
    icon: <ScrollTextIcon size={14} />,
    key: "report",
    path: PATH.REPORT.ROOT,
    children: [
      {
        label: "Campaign Report",
        key: "campaign-report",
        path: PATH.REPORT.CAMPAIGN_REPORT,
      },
      {
        label: "Overall Report",
        key: "overall-report",
        path: PATH.REPORT.OVERALL_REPORT,
      },
      {
        label: "Message History",
        key: "message-history",
        path: PATH.REPORT.MESSAGE_HISTORY,
      },
    ],
  },
  {
    label: "Account Management",
    key: "account-management",
    path: PATH.ACCOUNT_MANAGEMENT,
    icon: <UserRoundCogIcon size={14} />,
  },
];

const Sider = React.memo(function Sider({
  theme,
  hasLogo = false,
  isMobile = false,
  handleCloseDrawer,
  openDrawer,
  collapsed,
}) {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState([]);
  // const { hasUnsaved } = useUnsaved();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const { selected } = findActiveMenuKeys(currentPath, menuItems);
    setSelectedKey([selected]);
  }, [location.pathname]);
  const handleMenuClick = useCallback((e, target) => {
    // if (hasUnsaved) {
    //   e.preventDefault();
    //   UnsavedChangesModal(() => {
    //     navigate(target, { replace: true });
    //   });
    //   return false;
    // }

    if (openDrawer) {
      handleCloseDrawer();
    }

    return true;
  }, [openDrawer, handleCloseDrawer]);

  const findActiveMenuKeys = useCallback((path, items) => {
    for (const item of items) {
      if (item.path === path) {
        return { selected: item.key };
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path || path.startsWith(child.path)) {
            return { selected: child.key };
          }
        }
        if (path.startsWith(item.path)) {
          return { selected: item.key };
        }
      } else if (item.path && path.startsWith(item.path)) {
        return { selected: item.key };
      }
    }
    return { selected: "" };
  }, []);

  const processedMenuItems = useMemo(() => {
    const items = menuItems.map((item) => ({
      ...item,
      label: item.children ? (
        <span>{item.label}</span>
      ) : (
        <NavLink to={item.path} onClick={(e) => handleMenuClick(e, item.path)}>
          {item.label}
        </NavLink>
      ),
      children: item.children?.map((child) => ({
        ...child,
        label: (
          <NavLink
            to={child.path}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            onClick={(e) => handleMenuClick(e, child.path)}
          >
            {child.label}
          </NavLink>
        ),
      })),
    }));

    return items;
  }, [handleMenuClick]);

  return (
    <div className={!isMobile ? "pb-1" : ""}>
      {hasLogo && (
        <Logo>{!collapsed ? <h2>Smart SMS</h2> : <h6>Smart SMS</h6>}</Logo>
      )}
      <Menu
        theme={theme}
        mode='inline'
        selectedKeys={selectedKey}
        // openKeys={openKeys}
        defaultOpenKeys={["report"]}
        items={processedMenuItems}
        // width={250}
      />
    </div>
  );
});

export default Sider;
