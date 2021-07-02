import moment from 'moment';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Pagination, Skeleton, Row, Space, Button, DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import {
  PlusOutlined,
} from '@ant-design/icons';

import { getVehicleEntry } from '../../redux/actions/vehicleEntry';
import config from '../../config';
import routes from '../../config/routes';
import PageHeader from '../../components/PageHeader';
import VehicleList from './VehicleList';

import styles from './style.module.scss';

const VehicleEntry = () => {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = config.paging.perPage;
  const [createdAt, setCreatedAt] = useState<string>('');
  const [registeredAt, setRegisteredAt] = useState<string>('');

  const { entries, paging, listLoading } = useSelector((state: any) => state.vehicleEntries)

  useEffect(() => {
    dispatch(getVehicleEntry({ offset, limit: perPage, created_at: createdAt, registered_at: registeredAt }));
  }, [dispatch, offset, perPage, createdAt, registeredAt])

  const changePage = (page: number) => {
    const newOffset = (page - 1) * perPage;
    setOffset(newOffset);
    setCurrentPage(page);
  }

  const columns = [
    { 
      title: 'S.N', 
      render: (vehicle: any, value: any, index: number) => {
        return (
          <>{offset + index + 1}</>
        )
      }
    },
    { 
      title: 'Reg no', dataIndex: 'registration_no', key: 'registration_no' 
    },
    { 
      title: 'Reg date', 
      render: (vehicle: any) => {
        return <>{moment(vehicle.created_at).format('YYYY/MM/DD')}</>
      }
    },
    { title: 'Reg by', dataIndex: 'organization_name', key: 'organization_name' },
    { title: 'Manufactured year', dataIndex: 'manufactured_year', key: 'manufactured_year' },
    { title: 'Gyapan patra no', dataIndex: 'gyapan_patra_number', key: 'gyapan_patra_number' },
    { title: 'No of import', dataIndex: 'number_of_imports', key: 'number_of_imports' },
  ];

  return (
    <>
      <PageHeader title="Vehicle Entries" />
      <Space>
        <DatePicker 
          placeholder="Select created date"
          onChange={(_: any, dateString: string) => setCreatedAt(dateString)} 
          value={createdAt ? moment(createdAt, 'YYYY-MM-DD') : null}
        />
        <DatePicker 
          placeholder="Select registered date"
          onChange={(_: any, dateString: string) => setRegisteredAt(dateString)}
          value={registeredAt ? moment(registeredAt, 'YYYY-MM-DD') : null}
        />
        <Button 
          onClick={() => {
            setCreatedAt('');
            setRegisteredAt('');
          }} 
        >
          Clear
        </Button>
      </Space>

      <Row justify="end" style={{ marginBottom: '1em' }}>
        <Space>
          <Link to={routes.newVehicleEntry.path}>
            <Button
              type="default"
              size="large"
              style={{
                fontSize: 15,
                borderRadius: 4,
              }}
            >
              <PlusOutlined /> New Vehicle Entry 
            </Button>
          </Link>
        </Space>
      </Row>
      {
        (listLoading && !entries.length) ?
          <Skeleton /> :
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={entries}
            pagination={false}
            rowKey={(e) => e.uuid}
            expandable={{ 
              expandedRowRender: (record) => {
                return <VehicleList vehicleEntryUuid={record.uuid} />
            }
            }}
          />

      }

      {
        (paging?.next || paging?.previous) && 
          <div className={styles['pagination']}>
            <Pagination current={currentPage} onChange={changePage} total={paging?.count} pageSize={perPage}/>
          </div>
      }
    </>
  );
}

export default VehicleEntry;

