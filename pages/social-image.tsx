import React from 'react'

const SocialImagePage = ({
  text,
  width = 1200,
  height = 640,
  noLogo = false,
  logoSize = 120,
  strokeWidth = 8,
  textPadding = 24,
  innerPadding = 40,
  outerPadding = 24,
  padding,
  imgUrl
}) => {
  const innerPad = padding && !innerPadding ? padding : innerPadding
  const outerPad = padding && !outerPadding ? padding : outerPadding
  const innerOuterPadding = innerPad + outerPad
  const fullInnerPadding = innerPad * 2
  const fullOuterPadding = outerPad * 2
  const fullPadding = fullInnerPadding + fullOuterPadding
  return (
    <div>
      {imgUrl && (
        <div
          className='fixed bg-cover rounded-xl box-border'
          style={{
            width: width - fullOuterPadding,
            height: height - fullOuterPadding,
            marginLeft: outerPad,
            marginTop: outerPad,
            backgroundImage: `url(${imgUrl})`,
            border: `solid ${strokeWidth}px black`
          }}
        />
      )}
      {!noLogo && (
        <img
          style={{
            width: logoSize,
            height: logoSize,
            left: innerOuterPadding,
            top: innerOuterPadding
          }}
          src='/favicons/apple-touch-icon.png'
          className='fixed rounded-md'
        />
      )}
      {text && (
        <h1
          className='fixed bg-black font-bold text-white leading-tight text-5xl rounded-md break-normal overflow-hidden'
          style={{
            maxWidth: width - fullPadding - textPadding,
            left: innerOuterPadding,
            bottom: innerOuterPadding,
            padding: `${Math.round(textPadding * 0.4)}px ${textPadding}px ${Math.round(textPadding * 0.7)}px`
          }}
        >
          {text.length > 109 ? `${text.slice(0, 109)}...` : text}
        </h1>
      )}
    </div>
  )
}

SocialImagePage.disableLayout = true

export const getServerSideProps = async ({ query }) => ({
  props: query
})

export default SocialImagePage
