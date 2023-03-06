import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header/Header'
import Posts from '@/modules/posts/Posts/Posts'
import React from 'react'

export default function posts() {
  return (
    <div>
      <Header />
      <Posts />
      <Footer />
    </div>
  )
}
