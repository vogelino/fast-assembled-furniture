import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitch () {
  const router = useRouter()
  return (
    <ul className='inline-flex'>
      {router.locales.map((locale) => (
        <li key={locale}>
          <Link href={router.asPath} locale={locale}>
            <a className={`${router.locale === locale ? 'font-bold cursor-default' : 'hover:underline'} py-2 mr-4`}>{locale.toUpperCase()}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
