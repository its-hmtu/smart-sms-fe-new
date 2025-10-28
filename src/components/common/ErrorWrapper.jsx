import PATH from '@/config/paths/PATH';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorWrapper = ({ children, status = '500' }) => {
  const MODE = process.env.NODE_ENV;
  if (MODE === 'development') {
    return null;
  }
  const renderResult = () => {
    switch (status) {
      case '403':
        return (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button type="primary">
                <Link to={PATH.HOME}>Back Home</Link>
              </Button>
            }
          />
        );
      case '500':
        return (
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button type="primary">
                <Link to={PATH.HOME}>Back Home</Link>
              </Button>
            }
          />
        );
      case '404':
        return (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary">
                <Link to={PATH.HOME}>Back Home</Link>
              </Button>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children ? children : renderResult()}
    </div>
  );
};

export default ErrorWrapper;