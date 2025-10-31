import { Button, Divider, Flex, Menu, MenuProps, Modal } from "antd";
import { useEffect, useState } from "react";
import PATH from "@/configs/PATH";
import { useLocation, useNavigate } from "react-router-dom";
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

function Sidebar({ collapsed }) {
  const [current, setCurrent] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrent(location.pathname);
  }, []);
  const items = [
    {
      label: "Overview",
      key: PATH.OVERVIEW,
      icon: <ChartNoAxesColumnIncreasingIcon size={14} />,
    },
    {
      label: "Manage Campaigns",
      key: PATH.CAMPAIGN,
      icon: <CalendarDaysIcon size={14} />,
    },
    {
      label: "Broadcast List",
      key: PATH.BROADCAST,
      icon: <SendIcon size={14} />,
    },
    {
      label: "Blacklist",
      key: PATH.BLACK_LIST,
      icon: <UserRoundXIcon size={14} />,
    },
    {
      label: "Report",
      icon: <ScrollTextIcon size={14} />,
      key: PATH.REPORT.ROOT,
      children: [
        {
          label: "Campaign Report",
          key: PATH.REPORT.CAMPAIGN_REPORT,
        },
        {
          label: "Overall Report",
          key: PATH.REPORT.OVERALL_REPORT,
        },
        {
          label: "Message History",
          key: PATH.REPORT.MESSAGE_HISTORY,
        },
      ],
    },
    {
      label: "Account Management",
      key: PATH.ACCOUNT_MANAGEMENT,
      icon: <UserRoundCogIcon size={14} />,
    },
  ];
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <>
      <Flex vertical justify='space-between' style={{ height: "100dvh" }}>
        <div>
          <Logo>{!collapsed ? <h2>Smart SMS</h2> : <h6>Smart SMS</h6>}</Logo>
          <Menu
            theme='light'
            onClick={onClick}
            defaultOpenKeys={[PATH.REPORT.ROOT]}
            selectedKeys={[current]}
            mode='inline'
            className='menu-sidebar'
            items={items}
          />
        </div>
        <LogoutWrapper>
          <Divider />
          <Button
            color='danger'
            variant='filled'
            block
            icon={<LogOutIcon size={14} />}
            onClick={() => setOpenModal(true)}
          >
            Logout
          </Button>
        </LogoutWrapper>
      </Flex>

      <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Sidebar;

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
