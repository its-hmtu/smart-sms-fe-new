import { Modal } from 'antd';

function AppModal({ children, ...props }) {
  return (
    <Modal maskClosable={false} {...props}>
      {children}
    </Modal>
  );
}

export default AppModal;