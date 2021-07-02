import React, { useState, useEffect } from 'react';
import { Popconfirm, Form, Typography } from 'antd';

import NaamSariForm from './naamSariForm/naamSariForm';

import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import config from '../../config';
import {
  getVehicleEntry,
  // getVehicleEntryWithFilter,
} from '../../redux/actions/vehicleEntry';
import PageHeader from '../../components/PageHeader';
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

const NaamSari = () => {
  const [offset] = useState(0);
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

  // function handleDropDownChange(value: any) {
  //   setSearchByValue(value);
  // }

  // function handleInputValueChange(value: any) {
  //   setSearchInputValue(value);
  // }

  // const initiateSearch = () => {
  //   dispatch(
  //     getVehicleEntryWithFilter({
  //       offset,
  //       limit: perPage,
  //       filter: searchParams,
  //     }),
  //   );
  // };

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
      title: 'Entry Type',
      dataIndex: 'entry_type',
      key: 'entry_type',
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
            {/* <a
              href="#"
              onClick={() => save(record.uuid)}
              style={{ marginRight: 8 }}
            >
              Save
            </a> */}
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              {/* <a>Cancel</a> */}
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
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
      <PageHeader title="Naam Sari" />

      <div className={styles['naamSariFormContainer']}>
        <NaamSariForm />
      </div>
    </>
  );
};

export default NaamSari;
