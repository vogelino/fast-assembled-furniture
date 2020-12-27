import { useRouter } from 'next/router'
import Link from 'next/link'
import LanguageSwitch from '../components/LanguageSwitch'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  return (
    <div className='container mx-auto p-4'>
      <header className='flex place-content-between'>
        <Link href='/' locale={router.locale}>
          <a>
            <h2 className='font-bold'>Home</h2>
          </a>
        </Link>
        <LanguageSwitch />
      </header>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
