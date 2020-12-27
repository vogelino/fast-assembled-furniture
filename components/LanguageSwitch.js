import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitch () {
  const router = useRouter()
  return (
    <ul>
      {router.locales.map((locale) => (
        <li key={locale}>
          <Link href={router.asPath} locale={locale}>
            <a className={router.locale === locale ? 'active' : 'inactive'}>{locale}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
