import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import LanguageSwitch from '../components/LanguageSwitch'
import Cart from '../components/Cart'

const Layout = ({ children }) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <div className='container mx-auto p-4'>
      <header className='flex place-content-between items-center mb-4'>
        <Link href='/' locale={router.locale}>
          <a>
            <h2 className='font-bold'>{t('pages.home')}</h2>
          </a>
        </Link>
        <div>
          <Cart locale={router.locale} />
          <LanguageSwitch />
        </div>
      </header>
      {children}
    </div>
  )
}

export default Layout
