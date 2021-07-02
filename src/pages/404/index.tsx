import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../../config/routes';

const NotFound = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
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

export default NotFound;
