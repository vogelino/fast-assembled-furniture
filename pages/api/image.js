import { createCanvas, screenshotCanvas, loadImage, close } from 'puppet-canvas'
import { drawRoundedRect, drawText } from '../../utils/canvasUtil'

const DEFAULT_IMAGE = 'https://media.graphcms.com/resize=fit:crop,height:640,width:1200/nbczo5TCSuGKdNFND0hw'
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 640
const PADDING = 32
const FULL_PADDING = PADDING * 2
const LOGO_SIZE = 120
const STROKE_WIDTH = 10
const STROKE_COLOR = '#000000'
const TEXT_PADDING = 24

const drawCanvas = async (canvas, text, imgUrl) => {
  const ctx = await canvas.getContext('2d')

  const [logoImg, bgImage] = await Promise.all([
    loadImage(`${process.env.URL}/favicons/android-chrome-192x192.png`, canvas),
    loadImage(imgUrl || DEFAULT_IMAGE, canvas)
  ])

  await drawRoundedRect(ctx, {
    width: CANVAS_WIDTH - FULL_PADDING,
    height: CANVAS_HEIGHT - FULL_PADDING,
    x: PADDING,
    y: PADDING,
    radius: PADDING,
    strokeWidth: STROKE_WIDTH,
    strokeColor: STROKE_COLOR
  })
  await ctx.clip()
  await ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  await ctx.drawImage(logoImg, FULL_PADDING, FULL_PADDING, LOGO_SIZE, LOGO_SIZE)

  await drawText(ctx, {
    x: FULL_PADDING,
    y: CANVAS_HEIGHT - FULL_PADDING,
    text,
    fontSize: 64,
    lineHeight: 56,
    padding: TEXT_PADDING
  })

  return await screenshotCanvas(canvas)
}

const handleError = (res, error) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`<h1>Error: ${error.message}</h1>`)
}

const handleSuccess = (res, imageBuffer) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'image/png')
  res.end(imageBuffer)
}

export default async (req, res) => {
  try {
    const text = req?.query?.text
    const imgUrl = req?.query?.img
    const canvas = await createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    const imageBuffer = await drawCanvas(canvas, text, imgUrl)

    handleSuccess(res, imageBuffer)
    await close()
  } catch (error) {
    handleError(res, error)
  }
}
