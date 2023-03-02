import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Login.module.css'

const cx = classNames.bind(styles)

export default function Login() {
  const [show, setShow] = useState(false)
  const classes = cx('container', {
    change: show,
  })
  return (
    <>
      <div className={classes}>
        <div className={cx('form-wrapper')}>
          <div className={cx('banner')}>
            <h1>Hello, My Coffe House!</h1>
            <p>Enter your personal details and start journey with us</p>
          </div>
          <div className={cx('green-bg')}>
            <button type="button" onClick={() => setShow(!show)}>
              Sign In
            </button>
          </div>
          <form className={cx('signup-form')}>
            <h1>Create Account</h1>
            <div className={cx('social-media')}>
              <i className="fab fa-facebook-f" />
              <i className="fab fa-instagram" />
              <i className="fab fa-linkedin-in" />
            </div>
            <p>or use your email for registration</p>
            <div className={cx('input-group')}>
              <i className="fas fa-user" />
              <input type="text" placeholder="Name" />
            </div>
            <div className={cx('input-group')}>
              <i className="fas fa-envelope" />
              <input type="email" placeholder="Email" />
            </div>
            <div className={cx('input-group')}>
              <i className="fas fa-lock" />
              <input type="password" placeholder="Password" />
            </div>
            <button type="button">Sign In</button>
          </form>
        </div>
      </div>
      <div className={cx('duplicate')}>abc</div>
    </>
  )
}
