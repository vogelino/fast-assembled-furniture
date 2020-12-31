export const drawRoundedRect = async (ctx, { x, y, width, height, radius = 5, strokeColor = '#000000', strokeWidth, fillColor = '#000000' }) => {
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

export const drawText = async (ctx, {
  x,
  y,
  text,
  fontSize = 48,
  fontFace = 'Helvetica',
  fontWeight = 'bold',
  textColor = '#ffffff',
  textBgColor = '#000000',
  lineHeight,
  padding = 10
}) => {
  if (!text) return
  const fullPadding = padding * 2

  ctx.font = `${fontWeight} ${fontSize}px ${fontFace}`
  const textWidth = await ctx.measureText(text).width

  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const height = (lineHeight || fontSize) + fullPadding
  await drawRoundedRect(ctx, {
    x,
    y: y - height,
    width: textWidth + fullPadding,
    height,
    fillColor: textBgColor,
    strokeWidth: 0,
    radius: padding / 2
  })
  ctx.fillStyle = textColor
  ctx.fillText(text, x + padding, y - height + padding)
}
