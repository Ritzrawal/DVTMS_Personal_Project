import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import {
  Table,
  Pagination,
  Skeleton,
  Button,
  Row,
  Input,
  Space,
  Switch,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./style.module.scss";

import config from "../../config";
import routes from "../../config/routes";
import { getUsers } from "../../redux/actions/user";
import PageHeader from "../../components/PageHeader";
import { IUser, IUserPagingInput } from "../../interfaces/IUser";
import UserService from "../../services/User";

const Users = () => {
  const dispatch = useDispatch();

  const [pagingInput, setPagingInput] = useState<{
    offset: number;
    search: string | null;
    currentPage: number;
  }>({
    offset: 0,
    search: null,
    currentPage: 1,
  });
  const perPage = config.paging.perPage;

  const { users, paging, listLoading } = useSelector(
    (state: any) => state.users
  );
  useEffect(() => {
    const args: IUserPagingInput = {
      offset: pagingInput.offset,
      limit: perPage,
    };

    if (pagingInput.search) {
      args.search = pagingInput.search;
    }
    dispatch(getUsers(args));
  }, [dispatch, pagingInput, perPage]);

  const changePage = (page: number) => {
    const newOffset = (page - 1) * perPage;
    setPagingInput({
      ...pagingInput,
      offset: newOffset,
      currentPage: page,
    });
  };

  const handleSearch = (e: any) => {
    setPagingInput({
      offset: 0,
      search: e.target.value,
      currentPage: 1,
    });
  };

  const onChangeStatus = (checked: boolean, username: string) => {
    if (checked) {
      UserService.activateUser(username)
        .then((res: any) => {
          if (res.status === 200 || res.status === 201) {
            const message = "Successfull ! ";
            const description = "User activte successfully";
            openNotificationWithIcon("success", message, description);
          }
        })
        .catch(() => {
          const message = "Error ! ";
          const description = "Something went wrong!";
          openNotificationWithIcon("error", message, description);
        });
    }

    UserService.deactivateUser(username)
      .then((resp: any) => {
        if (resp.status === 200 || resp.status === 201) {
          const message = "Successfull ! ";
          const description = "User deactivte successfully";
          openNotificationWithIcon("success", message, description);
        }
      })
      .catch(() => {
        const message = "Error ! ";
        const description = "Something went wrong!";
        openNotificationWithIcon("error", message, description);
      });
  };

  const openNotificationWithIcon = (
    type: "success" | "error",
    message: string,
    description: string
  ) => {
    notification[type]({
      message,
      description,
    });
  };

  const columns = [
    {
      title: "S.N",
      render: (user: any, value: any, index: number) => {
        return <>{pagingInput.offset + index + 1}</>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    { title: "Name", dataIndex: "display_name", key: "display_name" },
    {
      title: "Created at",
      render: (user: IUser) => {
        return <>{moment(user.created_at).format("YYYY/MM/DD")}</>;
      },
    },
    {
      title: "Manufacturer",
      dataIndex: "manufaturer",
      key: "manufacturer",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      render: (user: IUser) => {
        return (
          <>
            Active: &nbsp;
            <Switch
              defaultChecked={user.is_active}
              onChange={(checked: boolean) =>
                onChangeStatus(checked, user.username)
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader title="Users" />
      <Row justify="end" className={styles["actions"]}>
        <Space>
          <Input
            placeholder="Search"
            onChange={debounce(handleSearch, 300)}
            style={{ width: 400, height: 41 }}
          />

          <Link to={routes.newUser.path}>
            <Button
              type="default"
              size="large"
              style={{
                fontSize: 15,
                borderRadius: 4,
              }}
            >
              <PlusOutlined /> New User
            </Button>
          </Link>
        </Space>
      </Row>

      {listLoading && !users?.length ? (
        <Skeleton />
      ) : (
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={users}
          pagination={false}
          rowKey={(u: IUser) => u.username}
        />
      )}

      {(paging?.next || paging?.previous) && (
        <div className={styles["pagination"]}>
          <Pagination
            current={pagingInput.currentPage}
            onChange={changePage}
            total={paging?.count}
            pageSize={perPage}
          />
        </div>
      )}
    </>
  );
};

export default Users;
