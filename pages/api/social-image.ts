import qs from 'querystring'
import pptr from 'puppeteer'
import chrome from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'
import { absoluteUrl } from '@utils/urlUtil'

const isDev = process.env.NODE_ENV === 'development'
const config = {
	width: 1200,
	height: 640,
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	let browser = null

	try {
		const { origin } = absoluteUrl(req)
		const query = qs.stringify({ ...config, ...(req.query || {}) })
		const url = `${origin}/social-image?${query}`

		browser = await chrome.puppeteer.launch({
			args: isDev ? [] : chrome.args,
			defaultViewport: chrome.defaultViewport,
			executablePath: isDev ? pptr.executablePath() : await chrome.executablePath,
			headless: isDev ? true : chrome.headless,
			ignoreHTTPSErrors: true,
		})
		const page = await browser.newPage()

		const queryWidth: string | string[] | undefined = req.query.width
		const queryHeight: string | string[] | undefined = req.query.height
		await page.setViewport({
			width: typeof queryWidth === 'string' ? parseInt(`${queryWidth}`, 10) : config.width,
			height: typeof queryHeight === 'string' ? parseInt(`${queryHeight}`, 10) : config.height,
		})

		await page.goto(url, {
			waitUntil: 'load',
		})

		const screenshot = await page.screenshot({
			encoding: 'binary',
		})

		res.setHeader('content-type', 'image/png')
		res.setHeader('cache-control', 'public, max-age=604800')
		res.send(screenshot)
	} catch (error) {
		res.status(500).json({ error: new Error(error) })
	} finally {
		if (browser) {
			await browser.close()
		}
	}
}
