import React from 'react'
import { btn, btnLetter } from './button.module.css'

const commonClasses = 'transition-all rounded-full hover:border-black px-4 py-2 border-2 transform rotate-0 group-hover:rotate-180'
const secondaryClasses = 'border-gray-200'
const primaryClasses = 'bg-black text-white border-black font-bold hover:bg-transparent hover:text-black'
const Button = ({ children = '', primary = false, className = '', ...rest }) => (
  <button
    className={`${btn} ${commonClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
    {...rest}
  >
    {((Array.isArray(children) ? children.join(' ') : children) || '').split('').map((letter, idx) => (
      <span
        key={`${idx}-${letter}`}
        style={{
          transitionDelay: `${idx * 20}ms`
        }}
        className={`${btnLetter} inline-block`}
      >
        {letter || '-'}
      </span>
    ))}
  </button>
)

export default Button
