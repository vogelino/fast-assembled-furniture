
import { useState } from 'react'
import useInterval from './hooks/useInterval'

const fFaviconPath = '/favicon-f.ico'
const aFaviconPath = '/favicon.ico'
const fFaviconPathPNG16 = '/favicons/favicon-f-16x16.png'
const aFaviconPathPNG16 = '/favicons/favicon-16x16.png'
const fFaviconPathPNG32 = '/favicons/favicon-f-32x32.png'
const aFaviconPathPNG32 = '/favicons/favicon-32x32.png'

const getFavicons = (letter) => [
  { href: `${letter === 'F' ? fFaviconPath : aFaviconPath}`, type: 'image/x-icon', rel: 'shortcut icon' },
  { href: `${letter === 'F' ? fFaviconPathPNG16 : aFaviconPathPNG16}`, type: 'image/png', rel: 'icon' },
  { href: `${letter === 'F' ? fFaviconPathPNG32 : aFaviconPathPNG32}`, type: 'image/png', rel: 'icon' }
]

const defaults = { isPlaying: false, delay: 500 }
const getHeadFavicons = ({ isPlaying = defaults.isPlaying, delay = defaults.delay } = defaults) => {
  const [faviconLetter, setFaviconLetter] = useState('A')

  useInterval(() => {
    if (!isPlaying) return
    const newFaviconLetter = faviconLetter === 'F' ? 'A' : 'F'
    setFaviconLetter(newFaviconLetter)
  }, delay)

  return getFavicons(faviconLetter)
}

export default getHeadFavicons
