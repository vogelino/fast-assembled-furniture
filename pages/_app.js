import LanguageSwitch from '../components/LanguageSwitch'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <div>
      <LanguageSwitch />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
