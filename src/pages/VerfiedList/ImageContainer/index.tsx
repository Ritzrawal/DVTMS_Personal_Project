import styles from './style.module.scss';

interface Props {
  image?: string;
  vehicleFiles: any;
}

const VehicleImageContainer = (props: Props) => {
  const { vehicleFiles } = props;
  return (
    <div className={styles['vehicleTableImageContainer']}>
      {vehicleFiles.map((value: any, index: any) => {
        if (value.file.includes('.pdf')) {
          return (
            <div className={styles['vehicleTableImage']}>
              <a href={process.env.REACT_APP_API_URL + value.file}>
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
              src={process.env.REACT_APP_API_URL + value.file}
            ></img>
          );
      })}
    </div>
  );
};

export default VehicleImageContainer;
