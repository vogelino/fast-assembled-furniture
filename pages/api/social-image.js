import qs from 'querystring'
import pptr from 'puppeteer'
import chrome from 'chrome-aws-lambda'
import { absoluteUrl } from '../../utils/urlUtil'

const isDev = process.env.NODE_ENV === 'development'
const config = {
  width: 1200,
  height: 640
}

export default async (req, res) => {
  let browser = null

  try {
    const { origin } = absoluteUrl(req)
    const query = qs.stringify({ ...config, ...(req?.query || {}) })
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

    console.log(req?.query?.height ? parseInt(req?.query?.height, 10) : config.height)
    await page.setViewport({
      width: req?.query?.width ? parseInt(req?.query?.width, 10) : config.width,
      height: req?.query?.height ? parseInt(req?.query?.height, 10) : config.height
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
