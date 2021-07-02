import LoadingOverlay from 'react-loading-overlay-ts';
import styles from './styles.module.scss';

const ScreenLoader = () => {
  return (
    <div className={styles['background']}>
      <LoadingOverlay
        active={true}
        spinner={true}
        text="Your screen is loading..."
      />
    </div>
  );
};

export default ScreenLoader;
