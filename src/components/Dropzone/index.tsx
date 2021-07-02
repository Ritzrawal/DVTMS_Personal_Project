import { useDropzone } from "react-dropzone";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Spin, Image, Space } from "antd";

import { ZoomInOutlined, DeleteOutlined } from "@ant-design/icons";

import styles from "./style.module.scss";

interface IProps {
  onDrop: (acceptedFiles: any) => void;
  files: any[];
}

const Dropzone = (props: IProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
  });

  const thumbs = props?.files?.map((file: any) => {
    return (
      <div key={file?.name}>
        <div className={styles["thumb"]} key={file?.name}>
          <div className={styles["thumb-inner"]}>
            {file?.loading ? (
              <Spin className={styles["img-loading"]} />
            ) : (
              <div>
                <DeleteOutlined className={styles["img-delete"]} />
                <Image
                  alt="file"
                  src={file?.preview}
                  preview={{
                    maskClassName: `${styles["customize-mask"]}`,
                    mask: (
                      <Space direction="horizontal" align="center">
                        <ZoomInOutlined />
                      </Space>
                    ),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div {...getRootProps({ className: styles["dropzone-container"] })}>
        <input className="dropzone-input" {...getInputProps()} />
        <div className={styles["dropzone-message"]}>
          <CloudUploadOutlined className={styles["upload-icon"]} />
          {isDragActive ? (
            <h4>Release to drop the files here</h4>
          ) : (
            <h4 className="dropzone-content">
              Drag 'n' drop some files here, or click to select files
            </h4>
          )}
        </div>
      </div>
      <aside className={styles["thumbs-container"]}>{thumbs}</aside>
    </div>
  );
};

export default Dropzone;
