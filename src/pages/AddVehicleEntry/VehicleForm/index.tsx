import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Input, Table, Button, Select } from "antd";
import { ColumnProps } from "antd/lib/table";

import { IVehicleInput } from '../../../interfaces/IVehicleEntry';

import styles from './style.module.scss';

interface IVehicleData extends IVehicleInput {
  key: string;
}

interface IProps {
  onChange: (key: string, uuid: string) => (e: ChangeEvent<HTMLInputElement> | { target: { value: any } }) => void;
  addNewRow: () => void;
  //tableData: IVehicleData[];
  preview: boolean;
}

const VehicleForm = (props: IProps) => {
  const { allVehicles, vehiclesById } = useSelector((state: any) => state.vehicleEntries)

  const data = allVehicles.map((uuid: string)=> {
    return vehiclesById[uuid];
  })

  const columns: ColumnProps<IVehicleData>[] = [
    {
      dataIndex: "sn",
      title: "S.N",
      render: (text, record, index) => {
        return (<>{index + 1}</>)
      }
    },
    {
      title: "Chasis No:-",
      dataIndex: "chassis_number",
      render: (text, record, index) => {
        return (
        <Input disabled={props.preview} className={styles['input-field']} value={text} onChange={props.onChange("chassis_number", record.key)} />
        )
      }
    },
    {
      title: "Engine No:-",
      dataIndex: "engine_number",
      render: (text, record, index) => (
        <Input disabled={props.preview} className={styles['input-field']} value={text} onChange={props.onChange("engine_number", record.key)} />
      )
    },
    {
      title: "Model",
      dataIndex: "model",
      render: (text, record, index) => (
        <Input disabled={props.preview} className={styles['input-field']} value={text} onChange={props.onChange("model", record.key)} />
      )
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (text, record, index) => (
        <Input disabled={props.preview} className={styles['input-field']} value={text} onChange={props.onChange("color", record.key)} />
      )
    },
    {
      title: "Engine Capacity",
      dataIndex: "engine_capacity",
      render: (text, record, index) => (
        <Input disabled={props.preview} className={styles['input-field']} value={text} onChange={props.onChange("engine_capacity", record.key)} />
      )
    },
    { 
      title: "Engine Capacity Unit", 
      dataIndex: "engine_capacity_unit", 
      render: (text, record, index) => ( 
        <Select onChange={(value) => { props.onChange('engine_capacity_unit', record.key)({ target: { value } }) }} placeholder="Select unit">  
          <Select.Option value="CC">CC</Select.Option> 
          <Select.Option value="WATT">WATT</Select.Option> 
        </Select> 
      ) 
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      render: (text, record, index) => (
        <Input disabled={props.preview} className={styles['input-field']} value={text} onChange={props.onChange("remarks", record.key)} />
      )
    },
  ];

  return (
    <>
      {
        !props.preview &&
          <Button type="primary" onClick={props.addNewRow}>
            Add new row
          </Button>
      }
      <div style={{ padding: 20 }}>
        <Table
          rowKey={(text: IVehicleData) => text.key}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </>
  );
};

export default VehicleForm;

