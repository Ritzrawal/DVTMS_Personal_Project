import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { uploadDocument } from '../../../redux/actions/documentUpload';

import Dropzone from '../../../components/Dropzone';

const DocumentUpload = () => {
  const dispatch = useDispatch();

  const { allTemporaryUuids, byTemporaryUuid } = useSelector((state: any) => state.documentUpload)

  const onDrop = (acceptedFiles: any) => {

    const formData = new FormData();

    const file = acceptedFiles[0];

    if(file) {
      formData.append('files', file)

      dispatch(uploadDocument({
        data: formData,
        file: Object.assign(file, {
          preview: URL.createObjectURL(file),
          loading: true,
        }),
        temporaryUuid: uuidv4(),
      }))
    } else {
      message.info('Select file');
    }
  }

  const files = allTemporaryUuids?.map((uuid: string) => {
    return byTemporaryUuid[uuid];
  })

  return (
    <Dropzone onDrop={onDrop} files={files} />
  )
}

export default DocumentUpload;
