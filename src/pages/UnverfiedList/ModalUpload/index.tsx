import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import styles from "../VehicleList/style.module.scss";
import DocumentUpload from "../../../components/Upload";
import VehicleEntryService from "../../../services/VehicleEntry";
interface Props {
  files?: any;
  data: any;
}
const UploadModal = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [imagetype, setFileType] = useState("Chasis_photo");
  const { Option } = Select;

  /*========================OnImageUpload=====================*/

  const onFileChange = (value: any) => {
    setFileType(value);
  };

  const onImageUpload = (Uuid: any) => {
    const filedata = {
      file: [{ uuid: Uuid, type: imagetype }],
    };
    VehicleEntryService.updateSingleVehicleEntry({
      ...props.data[0],
      ...filedata,
    });
  };
  return (
    <>
      <Button
        className={styles["add-button"]}
        onClick={() => setVisible(true)}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add
      </Button>
      <Modal
        title="Add Photo"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <div>
          <Select
            className={styles["modal-select"]}
            value={imagetype}
            placeholder="Photo Type"
            onChange={onFileChange}
          >
            <Option value="Chasis_photo">Chasis_photo</Option>
            <Option value="Engine_photo">Engine_photo</Option>
          </Select>
          <div className={styles["dropzone-photoupload"]}>
            <DocumentUpload onUpload={onImageUpload} />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UploadModal;
