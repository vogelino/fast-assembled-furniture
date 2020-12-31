import React from 'react'

const SocialImagePage = ({
  text,
  width = 1200,
  height = 640,
  padding = 40,
  noLogo = false,
  logoSize = 120,
  strokeWidth = 4,
  imgUrl
}) => {
  return (
    <div style={{ width, height, padding }} className='relative'>
      {!noLogo && (
        <img
          style={{
            width: logoSize,
            height: logoSize,
            left: (padding * 2) + strokeWidth,
            top: (padding * 2) + strokeWidth
          }}
          src='/favicons/apple-touch-icon.png'
          className='absolute rounded-md'
        />
      )}
      {imgUrl && (
        <div
          className='bg-cover rounded-xl box-border'
          style={{
            width: width - (padding * 2),
            height: height - (padding * 2),
            left: padding + strokeWidth,
            top: padding + strokeWidth,
            backgroundImage: `url(${imgUrl})`,
            border: `solid ${strokeWidth}px black`
          }}
        />
      )}
      {text && (
        <h1
          className='absolute bg-black text-white p-6 leading-tight text-5xl rounded-md break-all'
          style={{
            maxWidth: width - (padding * 3) - 48,
            left: (padding * 2) + strokeWidth,
            bottom: (padding * 2) + strokeWidth
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
  props: {
    text: query.text,
    imgUrl: query.imgUrl
  }
})

export default SocialImagePage
