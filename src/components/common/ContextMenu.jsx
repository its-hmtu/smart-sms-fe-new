import AppDropdown from "@/components/AppDropdown";
import { Button, Tooltip } from "antd";
import { EllipsisVerticalIcon } from "lucide-react";
import React from "react";
import styled from "styled-components";

function ContextMenu({ options, iconSize = 16 }) {
  return (
    <AppDropdown
      options={options}
      onChange={(item) => item.onClick()}
      overlayStyle={{ minWidth: 140 }}
    >
      <Tooltip title='Change Status'>
        <StyledButton type='text' icon={<EllipsisVerticalIcon size={iconSize} />} />
      </Tooltip>
    </AppDropdown>
  );
}

export default ContextMenu;

const StyledButton = styled(Button)`
  padding: 0 8px;
`;
