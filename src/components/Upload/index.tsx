import { useState } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import config from '../../config';
import { getToken } from '../../utils/token';
import styles from './style.module.scss';

export interface UploadProps {
  onUpload: (id: string) => void;
  fileList?: any;
  onRemove?: (uuid: string) => Promise<boolean>;
  accept?: string;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  disabled?: boolean;
}

const tokenData = getToken({ name: config.tokenName });

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const DocumentUpload = (props: UploadProps) => {
  const { disabled = false } = props;
  const [preview, setPreview] = useState<{
    previewImage: string;
    previewVisible: boolean;
    previewTitle: string;
  }>({
    previewImage: '',
    previewVisible: false,
    previewTitle: '',
  });
  const uploadProps = {
    disabled,
    name: 'files',
    accept: props?.accept,
    data: {
      fileType: 'Photo',
    },
    showUploadList: {
      showRemoveIcon: props?.showRemoveIcon ?? false,
      showPreviewIcon: props?.showPreviewIcon ?? false,
    },
    action: `${config.apiUrl}/api/v1/core/files/upload/`,
    headers: {
      Authorization: `Token ${tokenData?.token}`,
    },
    //fileList,
    onRemove(file: any) {
      if (props?.onRemove) {
        return props?.onRemove?.(file?.response?.[0]?.uuid);
      }
      return Promise.resolve(true);
    },
    onPreview: async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreview({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle:
          file.name ||
          file.url.substring(file.url.lastIndexOf('/') + 1),
      });
    },
    onChange(info: any) {
      /*
      //if incase need to change the filelist
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1);

      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      setFileList(fileList)
      */

      if (info.file.status === 'done') {
        props.onUpload(info.file.response?.[0]?.uuid);
        message.success(
          `${info.file.name} file uploaded successfully`,
        );
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {...uploadProps} listType="picture-card">
        <div>
          <PlusOutlined />
          <div>Upload</div>
        </div>
      </Upload>

      {preview.previewVisible && (
        <div className={styles['image-preview']}>
          <span
            className={styles['close']}
            onClick={() =>
              setPreview({
                previewImage: '',
                previewTitle: '',
                previewVisible: false,
              })
            }
          >
            &times;
          </span>
          <img
            className={styles['preview-content']}
            src={preview.previewImage}
            alt="preview"
          />
        </div>
      )}
    </>
  );
};

export default DocumentUpload;
