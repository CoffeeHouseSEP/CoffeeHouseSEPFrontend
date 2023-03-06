import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header/Header'
import { useFetch } from '@/hooks/useFetch'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Follower from '../follower'
import styles from './Posts.module.css'

const cx = classNames.bind(styles)
function Posts() {
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
      <Header />
      <div className={cx('section-title')}>
        <h1>{loading ? 'loading...' : 'TRÁCH NHIỆM CỘNG ĐỒNG'}</h1>
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
                  className={cx(`page-btn ${index === page ? 'active-btn' : null}`)}
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
      <Footer />
    </main>
  )
}

export default Posts
