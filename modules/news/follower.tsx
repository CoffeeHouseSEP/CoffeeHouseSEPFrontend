import Image from 'next/image'
import classNames from 'classnames/bind'
import { CiAlarmOn } from 'react-icons/ci'
import styles from './follower.module.css'

const cx = classNames.bind(styles)
const Follower = () => {
  return (
    <article className={cx('card')}>
      <div style={{ width: '100%', height: '247px', position: 'relative', aspectRatio: '1/1' }}>
        <Image layout="fill" objectFit="cover" src="/asset/News2.png" />
      </div>
      <p className={cx('title')}>
        HẸN YÊU TẠI HIGHLANDS - SAU VALENTINE VẪN CÒN CHỖ ĐỂ TA GẶP NHAU!
      </p>
      <div className={cx('date')}>
        <span>
          <CiAlarmOn size="25" />
          <span>20/02/2023, 23:02</span>
        </span>
      </div>
    </article>
  )
}

export default Follower
