
import styles from './style.module.scss'

interface IProps {
  title: string
}

const PageHeader = (props: IProps) => {
  return (
    <div className={styles['page-header']}>
      <h2>{props.title}</h2>
    </div>
  )
}

export default PageHeader;
