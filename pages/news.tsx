import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header/Header'
import News from '@/modules/news/News/News'
import React from 'react'

export default function news() {
  return (
    <div>
      <Header />
      <News />
      <Footer />
    </div>
  )
}
