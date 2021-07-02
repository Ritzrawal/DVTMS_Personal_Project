import { useState, useEffect } from 'react';
import { Table, Skeleton } from 'antd';

import { IVehicle, IVehicleEntry } from '../../../interfaces/IVehicleEntry';
import VehicleEntryService from '../../../services/VehicleEntry';

interface IProps {
  vehicleEntryUuid: string;
}

const VehicleList = (props: IProps) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    if(!fetched) {
      VehicleEntryService.getVehiclesByEntry({
        uuid: props.vehicleEntryUuid,
      })
      .then((response: IVehicleEntry) => {
        setVehicles(response.vehicles)
        setFetched(true)
      })
    }
  }, [fetched, props.vehicleEntryUuid])

  const columns = [
    { 
      title: 'S.N',
      render: (record: any, re: any, index: number) => {
        return <>{index + 1}</>
      }
    },
    { title: 'Chassis No', dataIndex: 'chassis_number', key: 'chassis_number' },
    { title: 'Engine No', dataIndex: 'engine_number', key: 'engine_number' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    { title: 'Color', dataIndex: 'color', key: 'color' },
  ];

  if(!fetched) {
    return (
      <Skeleton />
    )
  }

  return (
    <Table 
      columns={columns} 
      dataSource={vehicles} 
      pagination={false} 
      rowKey={(v) => v.uuid}
    />
  );
}

export default VehicleList;

