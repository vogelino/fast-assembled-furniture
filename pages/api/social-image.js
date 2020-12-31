import qs from 'querystring'
import pptr from 'puppeteer'
import chrome from 'chrome-aws-lambda'
import { absoluteUrl } from '../../utils/urlUtil'

const isDev = process.env.NODE_ENV === 'development'
const config = {
  width: 1200,
  height: 640,
  padding: 32,
  logoSize: 120,
  strokeWidth: 10,
  strokeColor: '#000000',
  textPadding: 24
}

export default async (req, res) => {
  let browser = null

  try {
    const text = req?.query?.text
    const imgUrl = req?.query?.imgUrl

    const { origin } = absoluteUrl(req)
    const query = qs.stringify({ text, imgUrl, ...config })
    const url = `${origin}/social-image?${query}`

    browser = await chrome.puppeteer.launch({
      args: isDev ? [] : chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: isDev
        ? pptr.executablePath()
        : await chrome.executablePath,
      headless: isDev ? true : chrome.headless,
      ignoreHTTPSErrors: true
    })
    const page = await browser.newPage()

    await page.setViewport({
      width: config.width,
      height: config.height
    })

    await page.goto(url, {
      waitUntil: 'load'
    })

    const screenshot = await page.screenshot({
      encoding: 'binary'
    })

    res.setHeader('content-type', 'image/png')
    res.setHeader('cache-control', 'public, max-age=604800')
    res.send(screenshot)
  } catch (error) {
    res.status(500).json({ error })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
