import { useState, useEffect } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Select,
  Button,
  Tooltip,
} from 'antd';
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';
import { CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import config from '../../config';
import {
  getVehicleEntry,
  getVehicleEntryWithFilter,
} from '../../redux/actions/vehicleEntry';
import PageHeader from '../../components/PageHeader';
import VehicleList from './VehicleList';
import 'nepali-datepicker-reactjs/dist/index.css';

const { Option } = Select;

interface Item {
  uuid: string;
  key: string;
  name: string;
  address: string;
  registration_number: string;
  registration_date: string;
  registered_by: string;
  manufactured_year: string;
  pargayapan_number: string;
  no_of_import: number;
  vehicles: [];
}

interface EditableCellProps
  extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const VerifiedList = () => {
  const [offset/*, setOffset*/] = useState(0);
  //const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = config.paging.perPage;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState('');

  const [searchByValue, setSearchByValue] = useState(
    'bhansar_rasid_number',
  );

  const [searchInputValue, setSearchInputValue] = useState('');

  const searchParams = `${searchByValue}=${searchInputValue}`;

  const { entries } = useSelector(
    (state: any) => state.vehicleEntries,
  );

  const [data, setData] = useState(entries);

  const isEditing = (record: any) => record.uuid === editingKey;

  useEffect(() => {
    dispatch(getVehicleEntry({ offset, limit: perPage }));
  }, [dispatch, offset, perPage]);

  const edit = (record: any & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.uuid);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (uuid: string) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex(
        (item: any) => uuid === item.uuid,
      );
      // VehicleEntryService.updateVehicleEntry({ ...row, uuid });

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  //Search Feature ---------------------------------------------

  function handleDropDownChange(value: any) {
    setSearchByValue(value);
  }

  function handleInputValueChange(value: any) {
    setSearchInputValue(value);
  }

  const initiateSearch = () => {
    dispatch(
      getVehicleEntryWithFilter({
        offset,
        limit: perPage,
        filter: searchParams,
      }),
    );
  };

  // ----------------------------------------------------------

  useEffect(() => {
    setData(entries);
  }, [entries]);

  const columns = [
    {
      title: 'S.N',
      render: (record: any, re: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: 'Importing Group',
      dataIndex: 'importing_group',
      key: 'importing_group',
      editable: true,
    },
    {
      title: 'Bhansar Rasid No',
      dataIndex: 'bhansar_rasid_number',
      key: 'bhansar_rasid_number',
      editable: true,
    },
    {
      title: 'Reg by',
      dataIndex: 'registered_by',
      key: 'registered_by',
    },
    {
      title: 'Manufactured year',
      dataIndex: 'manufactured_year',
      key: 'manufactured_year',
      editable: true,
    },
    {
      title: 'Pargayapan no',
      dataIndex: 'gyapan_patra_number',
      key: 'gyapan_patra_number',
      editable: true,
    },
    {
      title: 'No of import',
      dataIndex: 'number_of_imports',
      key: 'number_of_imports',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Tooltip title="Save">
              <Button
                type="primary"
                onClick={() => save(record.uuid)}
                style={{ marginRight: 8 }}
                icon={<SaveOutlined />}
              />
            </Tooltip>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Tooltip title="Cancel">
                <Button
                  type="primary"
                  icon={<CloseOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </span>
        ) : (
          <Tooltip title="Edit">
            <Button
              type="primary"
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <PageHeader title="Verified List" />
      <div className={styles['verifiedListSearchDiv']}>
        <div className={styles['searchByDropdownDiv']}>
          Search by
          <Select
            defaultValue="bhansar_rasid_number"
            style={{ width: 200 }}
            onChange={handleDropDownChange}
            className={styles['searchByDropdown']}
          >
            <Option value="bhansar_rasid_number">
              Bhansar Rasid No
            </Option>
            <Option value="registered_at">Manufactured Date</Option>
            <Option value="pragayapan_no">Pargayapan Number</Option>
          </Select>
        </div>
        {searchByValue === 'registered_at' && (
          <NepaliDatePicker
            className={styles.item}
            inputClassName="form-control"
            value=""
            onChange={(value: string) => {
              setSearchInputValue(value);
            }}
            options={{ calenderLocale: 'ne', valueLocale: 'en' }}
          />
        )}
        {searchByValue !== 'registered_at' && (
          <Input
            placeholder={`${searchByValue}`}
            onChange={(e) => handleInputValueChange(e.target.value)}
          />
        )}

        <Button
          onClick={initiateSearch}
          className="searchButtonVerifiedList"
        >
          Search
        </Button>

        <div className={styles['selectManufacturerDiv']}>
          Select Manufacturer
          <Select
            defaultValue="honda"
            style={{ width: 200 }}
            onChange={handleDropDownChange}
            className={styles['searchByDropdown']}
          >
            <Option value="Honda">Honda</Option>
            <Option value="Yamaha">Yamaha</Option>
            <Option value="Bajaj">Bajaj</Option>
          </Select>
        </div>
      </div>
      <br />

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={(e: any) => e.uuid}
          expandable={{
            expandedRowRender: (record: any) => {
              return (
                <VehicleList
                  vehicleEntryUuid={record.uuid}
                />
              );
            },
          }}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default VerifiedList;
