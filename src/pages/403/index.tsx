import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../../config/routes';

const Unauthorize = () => {
  const history = useHistory();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary"
          onClick={() => history.push(routes.dashboard.path)}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Unauthorize;
