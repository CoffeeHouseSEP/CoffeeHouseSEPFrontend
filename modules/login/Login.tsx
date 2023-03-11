import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Image from 'next/image'
import styles from './Login.module.css'

const cx = classNames.bind(styles)

export default function Login() {
  const [change1, setChange1] = useState(false)
  const [change2, setChange2] = useState(false)

  const [show, setShow] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const handleshowRegister = () => {
    setShowRegister(!showRegister)
    setShow(false)
  }
  const handleshowLogin = () => {
    setShow(!show)
    setShowRegister(false)
  }
  const handleshowRegisterRepo = () => {
    setChange1(!change1)
    setChange2(!change2)
  }
  const handleshowLoginRepo = () => {
    setChange2(!change2)
    setChange1(!change1)
  }
  const classes = cx('container', {
    change: show,
    showRegister,
  })
  return (
    <>
      <div className={classes}>
        <div className={cx('form-wrapper')}>
          <div className={cx('banner')}>
            <div className={cx('logo')}>
              <Image
                className={cx('imagelogo')}
                width={130}
                height={95}
                src="/asset/logo.png"
                alt=""
              />
            </div>
            <h2>Hello, My Coffee House!</h2>
            <p>Enter your personal details and start journey with us</p>
          </div>
          <div className={cx('green-bg')}>
            <button type="button" className={cx('login')} onClick={() => handleshowLogin()}>
              Sign In
            </button>
            <button className={cx('register')} type="button" onClick={() => handleshowRegister()}>
              Sign Up
            </button>
          </div>
          <form className={cx('signup-form', { change1 })}>
            <h1>Sign Up Form</h1>
            <div className={cx('social-media')}>
              <AiFillFacebook className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
            </div>
            <p>or use your email for registration</p>
            <div className={cx('group-input')}>
              <div className={cx('input-group')}>
                <BiUserCircle size="25" className={cx('icon')} />
                <input required type="text" placeholder="Name" />
              </div>
              <div className={cx('input-group')}>
                <MdEmail size="25" className={cx('icon')} />
                <input required type="email" placeholder="Email" />
              </div>
              <div className={cx('input-group')}>
                <RiLockPasswordFill size="25" className={cx('icon')} />
                <input required type="password" placeholder="Password" />
              </div>
            </div>
            <button className={cx('signin-btn', { change1 })} type="submit">
              Sign Up
            </button>
            <p className={cx('relogin')} onClick={() => handleshowLoginRepo()}>
              Already Account? Login
            </p>
          </form>
          <form className={cx('signin-form', { change2 })}>
            <h1>Sign In Form</h1>
            <div className={cx('social-media')}>
              <AiFillFacebook className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
            </div>
            <p>or use your email for registration</p>
            <div className={cx('group-input')}>
              <div className={cx('input-group')}>
                <MdEmail size="25" className={cx('icon')} />
                <input required type="email" placeholder="Email" />
              </div>
              <div className={cx('input-group')}>
                <RiLockPasswordFill size="25" className={cx('icon')} />
                <input required type="password" placeholder="Password" />
              </div>
            </div>
            <button type="submit">Sign In</button>
            <p className={cx('redirect')} onClick={() => handleshowRegisterRepo()}>
              Not Account? Register
            </p>
          </form>
        </div>
      </div>
      <div className={cx('duplicate')}>abc</div>
    </>
  )
}
