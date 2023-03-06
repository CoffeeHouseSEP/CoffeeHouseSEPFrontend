import { useFetch } from '@/hooks/useFetch'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Follower from '../follower'
import styles from './News.module.css'

const cx = classNames.bind(styles)
function News() {
  const { loading, data } = useFetch()
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState<any>([])
  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index: number) => {
    setPage(index)
  }

  return (
    <main>
      <div className={cx('section-title')}>
        <h1>{loading ? 'loading...' : 'TIN TỨC'}</h1>
        <div className={cx('underline')} />
      </div>
      <section className={cx('followers')}>
        <div className={cx('container')}>
          {followers.map((follower: any) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && (
          <div className={cx('btn-container')}>
            <button type="button" className={cx('prev-btn')} onClick={prevPage}>
              prev
            </button>
            {data.map((index: any) => {
              return (
                <button
                  type="button"
                  key={index + 1}
                  className={(cx(index === page ? 'active-btn' : ''), 'page-btn')}
                  onClick={() => handlePage(index)}
                >
                  1
                </button>
              )
            })}
            <button type="button" className={cx('next-btn')} onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default News
