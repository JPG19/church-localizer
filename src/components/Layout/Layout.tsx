import { useEffect, useState } from 'react'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <>
    <Header />
    {children}
    <Footer />
    </>
  )
}

export default Layout