import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, message } from 'antd';

import routes from '../../config/routes';
import { IVehicleEntryInput } from '../../interfaces/IVehicleEntry';
import { IImportingGroup } from '../../interfaces/IImportingGroup';
import { IPagingResponse } from '../../interfaces/IPaging';
import VehicleEntryService from '../../services/VehicleEntry';
import ImportingGroupService from '../../services/ImportingGroup';
import { resetUploadDocument } from '../../redux/actions/documentUpload';
import { resetVehicleEntry } from '../../redux/actions/vehicleEntry';
import UploadService from '../../services/Upload';

import PageHeader from '../../components/PageHeader';
import VehicleEntryForm from './VehicleEntryForm';
import Upload from '../../components/Upload';

import styles from './style.module.scss'

const NewVehicleEntry = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
  const [entries, setEntries] = useState<any>({});
  const { allVehicles, vehiclesById } = useSelector((state: any) => state.vehicleEntries)
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [groups, setGroups] = useState<IImportingGroup[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const handlePreview = (data: IVehicleEntryInput) => {
    if(allVehicles?.length !== data?.number_of_imports) {
      message.error('Vehicles list and number of imports are not equal')
      return;
    }
    setIsPreviewing(true);
    setEntries(data);
  }

  useEffect(() => {
    window.scrollTo(0, ref.current?.offsetTop ?? 0)
  }, [isPreviewing])

  useEffect(() => {
    return () => {
      dispatch(resetUploadDocument())
      dispatch(resetVehicleEntry())
    }
  }, [dispatch])

  useEffect(() => {
    ImportingGroupService.getImportingVehicles({})
      .then((response: IPagingResponse<IImportingGroup>) => {
        setGroups(response?.results);
      })
      .catch(err => {})
  }, [])

  const onDocumentRemove = (removedUuid: string) => {
    return UploadService.remove({ files: [removedUuid] })
      .then((res) => {
        setImageFiles(imageFiles.filter(uuid => uuid !== removedUuid))
        message.info('Document removed')
        return true;
      })
      .catch(() => {
        message.error('Error removing document')
        return false;
      })
  }

  const handleSubmit = () => {
    if(!allVehicles?.length) {
      message.error('Vehicles should not be empty')
      return;
    }

    if(allVehicles.length !== entries.number_of_imports) {
      message.error('Vehicles list and number of imports are not equal')
      return;
    }

    if(!imageFiles?.length) {
      message.error('Document not selected')
      return;
    }

    VehicleEntryService.postVehicleEntry({
      ...entries,
      vehicles: allVehicles?.map((uuid: string) => {
        return vehiclesById[uuid];
      }),
      files: imageFiles,
    })
      .then(() => {
        message.info('Vehicle entry has been added')
        history.push(routes.vehicleEntry.path)
      })
      .catch((err) => {
        message.error("Whoops!! Something happened. Please check your inputs and try again!")
      })
  }

  return (
    <>
      <PageHeader title="Add new vehicle entry" />

      <div className={styles['container']} ref={ref}>
        <Row style={{ paddingTop: '20px' }}>
          <Col span={12}>
            <div className={styles['wizard-header-entry']}>
              <h5 
                className={isPreviewing ? styles['wizard-header-inactive']: styles['wizard-header-active']}
              >Vehicle Entry</h5>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles['wizard-header-preview']}>
              <h5 
                className={isPreviewing ? styles['wizard-header-active']: styles['wizard-header-inactive']}
              >Preview and Submit</h5>
            </div>
          </Col>
        </Row>

        <hr />

        <div className={styles['form-container']}>
          <VehicleEntryForm 
            preview={isPreviewing} 
            onFinish={handlePreview}
            groups={groups}
          />

          {
            isPreviewing &&
              <>

                <div className={styles['upload-wrapper']}>
                  <h5>Upload documents</h5>
                  <Upload
                    onUpload={(id: string) => { 
                      setImageFiles([...imageFiles, id])
                    }}
                    onRemove={(id: string) => onDocumentRemove(id)}
                    showRemoveIcon
                    showPreviewIcon
                  />
                </div>
                <div style={{ paddingTop: '12px' }}>
                  <Button onClick={() => setIsPreviewing(false)} style={{ marginRight: '1em' }}>
                    Previous 
                  </Button>
                  <Button type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </>
          }
        </div>
      </div>

    </>
  );
};

export default NewVehicleEntry;
