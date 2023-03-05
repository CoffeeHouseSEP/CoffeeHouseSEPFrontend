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
            <button type="button" onClick={() => handleshowLogin()}>
              Sign In
            </button>
            <button className={cx('register')} type="button" onClick={() => handleshowRegister()}>
              Sign Up
            </button>
          </div>
          <form className={cx('signup-form')}>
            <h1>Sign Up Form</h1>
            <div className={cx('social-media')}>
              <AiFillFacebook className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
            </div>
            <p>or use your email for registration</p>
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
            <button type="submit">Sign Up</button>
          </form>
          <form className={cx('signin-form')}>
            <h1>Sign In Form</h1>
            <div className={cx('social-media')}>
              <AiFillFacebook className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
              <AiFillInstagram className={cx('icon-social')} size="25" />
            </div>
            <p>or use your email for registration</p>
            <div className={cx('input-group')}>
              <MdEmail size="25" className={cx('icon')} />
              <input required type="email" placeholder="Email" />
            </div>
            <div className={cx('input-group')}>
              <RiLockPasswordFill size="25" className={cx('icon')} />
              <input required type="password" placeholder="Password" />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
      <div className={cx('duplicate')}>abc</div>
    </>
  )
}
