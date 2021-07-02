import { useState, useEffect } from 'react';
import { Table, Skeleton, message, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../../../config/routes';
import { IVehicle } from '../../../interfaces/IVehicleEntry';
import VehicleEntryService from '../../../services/VehicleEntry';
import UploadService from '../../../services/Upload';
import EditableCell, {
  EditableRow,
} from '../../../components/EditableCell';
import Upload from '../../../components/Upload';
import { fileTypes } from '../../../utils/fileTypes';
import './styles.scss';
interface IProps {
  vehicleEntryUuid: string;
}

const VehilceList = (props: IProps) => {
  const [vehicles, setVehicles] = useState<IVehicle[] | []>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<{}[]>([]);

  const history = useHistory();

  useEffect(() => {
    if (!fetched) {
      VehicleEntryService.getVehicleEntryById({
        uuid: props.vehicleEntryUuid,
      }).then((response: any) => {
        setVehicles(response.results);
        setFetched(true);
      });
    }
  }, [fetched, props.vehicleEntryUuid]);

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
    },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    { title: 'Color', dataIndex: 'color', key: 'color' },
    { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
  ];

  if (!fetched) {
    return <Skeleton />;
  }

  const handleDataSave = (args: any) => {
    VehicleEntryService.updateSingleVehicleEntry(args)
      .then((resp: any) => {
        if (resp.status === 200 || resp.state === 201) {
          message.info('Changed Successfully!!!');
          history.push(routes.unverifiedList.path);
        }
      })
      .catch(() => {
        message.error('Something went wrong');
      });
  };

  const handleSave = (row: any) => {
    const newData = [...vehicles];
    const index = newData.findIndex(
      (item: IVehicle) => row.uuid === item.uuid,
    );
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setVehicles(newData);
    const args = {
      uuid: row.uuid,
      payload: {
        chassis_number: row.chassis_number,
      },
    };
    handleDataSave(args);
  };

  const col = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const onDocumentRemove = (
    removedUuid: string = '',
    fileType: string = '',
  ) => {
    const matchedImg: any = imageFiles.find(
      (file: any) => file.type === fileType,
    );
    const id = removedUuid || matchedImg.uuid;
    return UploadService.remove({ files: [id] })
      .then((res) => {
        setImageFiles(
          imageFiles.filter((file: any) => file.uuid !== id),
        );
        message.info('Document removed');
        return true;
      })
      .catch(() => {
        message.error('Error removing document');
        return false;
      });
  };

  const fileExists = (type: string) => {
    return imageFiles.some((file: any) => {
      return file.type === type;
    });
  };

  const onFileAdd = (uuid: string) => {
    const args = {
      uuid,
      payload: {
        file: imageFiles,
      },
    };
    handleDataSave(args);
  };

  return (
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      columns={col}
      dataSource={vehicles}
      pagination={false}
      expandable={{
        expandedRowRender: (record: any) => (
          <>
            <h5>Upload documents</h5>
            <div className="file-upload">
              <div>
                <h6>Please Upload Engine Photo</h6>
                <Upload
                  onUpload={(id: string) => {
                    const newImage = {
                      uuid: id,
                      type: fileTypes.enginePhoto,
                    };
                    setImageFiles([...imageFiles, newImage]);
                  }}
                  onRemove={(id: string) => onDocumentRemove(id)}
                  disabled={fileExists(fileTypes.enginePhoto)}
                  showRemoveIcon
                  showPreviewIcon
                />
                {fileExists(fileTypes.enginePhoto) && (
                  <Button
                    danger
                    onClick={() =>
                      onDocumentRemove(
                        undefined,
                        fileTypes.enginePhoto,
                      )
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div>
                <h6>Please Upload Chasis Photo</h6>
                <Upload
                  onUpload={(id: string) => {
                    const newImage = {
                      uuid: id,
                      type: fileTypes.chasisPhoto,
                    };
                    setImageFiles([...imageFiles, newImage]);
                  }}
                  onRemove={(id: string) => onDocumentRemove(id)}
                  disabled={fileExists(fileTypes.chasisPhoto)}
                  showRemoveIcon
                  showPreviewIcon
                />
                {fileExists(fileTypes.chasisPhoto) && (
                  <Button
                    danger
                    onClick={() =>
                      onDocumentRemove(
                        undefined,
                        fileTypes.chasisPhoto,
                      )
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
            <Button
              disabled={
                !fileExists(fileTypes.chasisPhoto) ||
                !fileExists(fileTypes.enginePhoto)
              }
              onClick={() => onFileAdd(record.uuid)}
            >
              Save
            </Button>
          </>
        ),
      }}
      rowKey={(e) => e.uuid}
    />
  );
};

export default VehilceList;
