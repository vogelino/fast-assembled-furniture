import 'Browser'
import { createCanvas, screenshotCanvas, loadImage, close } from 'puppet-canvas'

const DEFAULT_IMAGE = 'https://media.graphcms.com/resize=fit:crop,height:640,width:1200/nbczo5TCSuGKdNFND0hw'
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 640
const PADDING = 32
const FULL_PADDING = PADDING * 2
const LOGO_SIZE = 120
const STROKE_WIDTH = 10
const STROKE_COLOR = '#000000'
const TEXT_PADDING = 24
const TEXT_FULL_PADDING = TEXT_PADDING * 2

const drawRoundedRect = async (ctx, { x, y, width, height, radius = 5, strokeColor = '#000000', strokeWidth, fillColor = '#000000' }) => {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius }
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
    for (const side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side]
    }
  }
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()

  if (fillColor) {
    ctx.fillStyle = fillColor
    ctx.fill()
  }
  if (strokeWidth) {
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.stroke()
  }
}

const drawText = async (ctx, {
  x,
  y,
  text,
  fontSize = 48,
  fontFace = 'Helvetica',
  fontWeight = 'bold',
  textColor = '#ffffff',
  textBgColor = '#000000',
  lineHeight
}) => {
  if (!text) return

  ctx.font = `${fontWeight} ${fontSize}px ${fontFace}`
  const textWidth = await ctx.measureText(text).width

  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const height = (lineHeight || fontSize) + TEXT_FULL_PADDING
  await drawRoundedRect(ctx, {
    x,
    y: y - height,
    width: textWidth + TEXT_FULL_PADDING,
    height,
    fillColor: textBgColor,
    strokeWidth: 0,
    radius: TEXT_PADDING / 2
  })
  ctx.fillStyle = textColor
  ctx.fillText(text, x + TEXT_PADDING, y - height + TEXT_PADDING)
}

export default async (req, res) => {
  try {
    const canvas = await createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    const ctx = await canvas.getContext('2d')

    const [logoImg, bgImage] = await Promise.all([
      loadImage(`${process.env.URL}/favicons/android-chrome-192x192.png`, canvas),
      loadImage(req?.query?.img || DEFAULT_IMAGE, canvas)
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
      text: req?.query?.text,
      fontSize: 64,
      lineHeight: 56
    })

    const imageBuffer = await screenshotCanvas(canvas)
    console.log('I WENT THAT FAR')
    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.end(imageBuffer)
    await close()
  } catch (error) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>Error: ${error.message}</h1>`)
  }
}
