import { HTMLProps, FC } from 'react';
import { btn, btnLetter } from './button.module.css';

const commonClasses =
  'transition-all rounded-full hover:border-black px-4 py-2 border-2 transform rotate-0 group-hover:rotate-180';
const secondaryClasses = 'border-gray-200';
const primaryClasses =
  'bg-black text-white border-black font-bold hover:bg-transparent hover:text-black';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  primary?: boolean;
  type: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ children = '', primary = false, className = '', ...rest }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={`${btn} ${commonClasses} ${
      primary ? primaryClasses : secondaryClasses
    } ${className}`}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {String((Array.isArray(children) ? children.join(' ') : children) || '')
      .split('')
      .map((letter, idx) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={`${idx}-${letter}`}
          style={{
            transitionDelay: `${idx * 20}ms`,
          }}
          className={`${btnLetter} inline-block`}
        >
          {letter || '-'}
        </span>
      ))}
  </button>
);

export default Button;
