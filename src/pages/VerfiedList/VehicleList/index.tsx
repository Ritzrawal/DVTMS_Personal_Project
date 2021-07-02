import { useState, useEffect } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Skeleton,
  Modal,
  Button,
  Space,
  Tooltip,
  message,
} from 'antd';

import { CloseOutlined, EditOutlined, EyeOutlined, SaveOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { IVehicle, IVehiclePartialInput } from '../../../interfaces/IVehicleEntry';
import VehicleEntryService from '../../../services/VehicleEntry';
import VehicleService from '../../../services/Vehicle';
import VehicleImageContainer from '../ImageContainer';
import VehicleForm from '../VehicleForm';
import styles from '../ImageContainer/style.module.scss';
import './styles.css';

interface IProps {
  vehicleEntryUuid: string;
}

interface Item {
  uuid: string;
  chassis_number: string;
  engine_number: string;
  model: string;
  color: string;
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

const VehicleList = (props: IProps) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [vehicleFiles, setVehicleFiles] = useState([]);
  const [response, setResponse] = useState({ status: '' });
  const [fetched, setFetched] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [showVehicleForm, setShowVehicleForm] = useState(false);

  const [vehiclesData, setData] = useState(vehicles);
  const [patchVehiclesData, setPatchVehiclesData] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleEditId, setVehicleEditId] = useState('');

  const [selectedVehicle, setSelectedVehicle] = useState({
    chassis_number: '',
    color: '',
    engine_capacity: '',
    engine_number: '',
    status: '',
    horsepower: '',
    uuid: '',
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isEditing = (record: any) => record.uuid === editingKey;

  useEffect(() => {
    if (!fetched) {
      VehicleEntryService.getVehiclesByEntry({
        uuid: props.vehicleEntryUuid,
      }).then((response: any) => {
        setVehicles(response.vehicles);

        setVehicleFiles(response.files);
        setResponse(response);
        setFetched(true);
      });
    }
  }, [fetched, props.vehicleEntryUuid]);

  useEffect(() => {
    setData(vehicles);
  }, [vehicles]);

  const edit = (record: Item) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.uuid);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (uuid: string) => {
    try {
      const updateData = (await form.validateFields());
      VehicleService.partialUpdate(uuid, updateData as IVehiclePartialInput)
        .then(() => {
          message.success('Update successful!')
          const newData = [...vehiclesData];
          const index = newData.findIndex(
            (item: any) => uuid === item.uuid,
          );

          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...updateData,
            });
            setData(newData);
            setEditingKey('');
          } else {
            setData(newData);
            setEditingKey('');
          }
        })
        .catch(() => {
          message.error('Whoops!! Something happened. Please try again!');
        })

    } catch (errInfo) {
      message.error('Whoops!! Something happened. Please try again!');
    }
  };

  const addMoreDetailClick = (id: string) => {
    setShowVehicleForm(true);
    setVehicleEditId(id);
  }

  const hideVehicleForm = () => {
    setShowVehicleForm(false);
    setVehicleEditId('');
  }

  const columns = [
    {
      title: 'S.N',
      render: (record: any, re: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: 'Chassis No',
      dataIndex: 'chassis_number',
      key: 'chassis_number',
      editable: true,
    },
    {
      title: 'Engine No',
      dataIndex: 'engine_number',
      key: 'engine_number',
      editable: true,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      editable: true,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Tooltip title="Save">
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => save(record.uuid)}
              />
            </Tooltip>

            <Popconfirm 
              title="Are you sure?" 
              onConfirm={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Cancel">
                <Button
                  type="primary"
                  icon={<CloseOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Tooltip title="Edit">
              <Button
                type="primary"
                icon={<EditOutlined />}
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
              />
            </Tooltip>

            <Tooltip title="View more">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                disabled={editingKey !== ''}
                onClick={() => {
                  showModal();
                  setSelectedVehicle(record);
                }}
              />
            </Tooltip>

            <Tooltip title="Add more details">
              <Button
                type="primary"
                disabled={editingKey !== ''}
                icon={<PlusCircleOutlined />}
                onClick={() => addMoreDetailClick(record.uuid)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  if (!fetched) {
    return <Skeleton />;
  }

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
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={vehiclesData}
          pagination={false}
          rowKey={(e: any) => e.uuid}
        />
      </Form>

      <VehicleImageContainer vehicleFiles={vehicleFiles} />

      <Modal
        title="Vehicle Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="verifiedListModalMainContainer">
          <h3 className="verifiedListVehicleStatus">
            सवारीको विस्तृत जानकारी
          </h3>
          <h3 className="verifiedListVehicleStatus">
            Status: {response && response.status}
          </h3>
          <div className="verifiedListModalInnerContainer">
            <div>
              <p>कम्पनीको नाम : {selectedVehicle.engine_number}</p>
              <p>मोडेल: {selectedVehicle.engine_capacity}</p>
              <p>चेसिस नम्बर: {selectedVehicle.chassis_number}</p>
              <p>वर्ष निर्मित: {selectedVehicle.color}</p>
              <p>ईन्जिन नम्बर : {selectedVehicle.engine_number}</p>
              <p>सीट क्षमता: {selectedVehicle.chassis_number}</p>
              <p>सिलिन्डर: {selectedVehicle.engine_capacity}</p>
              <p>ईन्धन प्रकार: {selectedVehicle.chassis_number}</p>
              <p>वर्ष निर्मित: {selectedVehicle.color}</p>
              <p>उपकरण विवरण : {selectedVehicle.engine_number}</p>
              <p>
                व्यक्ति वा कम्पनी द्वारा किनेको:{' '}
                {selectedVehicle.engine_capacity}
              </p>
              <p>प्रयोग: {selectedVehicle.chassis_number}</p>
              <p>प्रयोगको स्थान: {selectedVehicle.color}</p>

              <p>भन्सारको नाम : {selectedVehicle.engine_number}</p>
              <p>रसिद नम्बर {selectedVehicle.engine_capacity}</p>
              <p>
                घोडा शक्ति / सीसी:{' '}
                {selectedVehicle.horsepower !== '' ? (
                  selectedVehicle.horsepower
                ) : (
                  <Input
                    onChange={(event: any) => {
                      setPatchVehiclesData({
                        ...patchVehiclesData,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    name="horse_power"
                    placeholder="Horsepower"
                  />
                )}
              </p>
            </div>
            <div>
              {' '}
              <h3>Images</h3>
              <div className={styles['vehicleTableImageContainer']}>
                {vehicleFiles.map((value: any, index: any) => {
                  if (value.file.includes('.pdf')) {
                    return (
                      <div className={styles['vehicleTableImage']}>
                        <a
                          href={
                            process.env.REACT_APP_API_URL + value.file
                          }
                        >
                          {value.file_name}
                        </a>
                      </div>
                    );
                  } else
                    return (
                      <img
                        key={index}
                        alt={value.file_name}
                        className={styles['vehicleTableImage']}
                        src={
                          process.env.REACT_APP_API_URL + value.file
                        }
                      ></img>
                    );
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Add vehicle details"
        visible={showVehicleForm}
        maskClosable={false}
        onCancel={hideVehicleForm}
        footer={[
          <Button 
            onClick={hideVehicleForm}
          >Cancel</Button>
        ]}
      >
        <VehicleForm
          uuid={vehicleEditId}
          hideVehicleForm={hideVehicleForm}
        />
      </Modal>
    </>
  );
};

export default VehicleList;
