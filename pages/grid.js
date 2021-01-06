import React from 'react'
import Layout from '../components/Layout'

const isOneOf = (num, possibilitiesArray) => possibilitiesArray.includes(num)

const Grid = () => (
  <Layout>
    <div className='grid bg-black gap-0.5 grid-cols-12 p-0.5 rounded-md'>
      {[...Array(20)].map((_, idx) => (
        <div
          key={`grid-item-${idx}`}
          style={[
            { minHeight: `${1520 / 12}px` },
            isOneOf(idx, [1, 5]) && { backgroundSize: '32px', backgroundImage: 'url(\'/favicons/favicon-f-32x32.png\')' },
            isOneOf(idx, [6]) && { backgroundSize: '32px', backgroundImage: 'url(\'/favicons/favicon-32x32.png\')' },
            isOneOf(idx, [3]) && { backgroundImage: 'url(\'https://images.unsplash.com/photo-1532588213355-52317771cce6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80\')' }
          ].filter((x) => x).reduce((acc, item) => ({
            ...acc,
            ...(item || {})
          }), {})}
          className={[
            `grid-item-${idx}`,
            'rounded bg-cover bg-no-repeat bg-center',
            isOneOf(idx, [0]) ? 'bg-black' : 'bg-white',
            isOneOf(idx, [2]) && 'col-span-2 row-span-4',
            isOneOf(idx, [3, 4, 9]) && 'col-span-4 row-span-2',
            isOneOf(idx, [7, 8]) && 'col-span-2 row-span-2',
            isOneOf(idx, [10, 13]) && 'row-span-2',
            isOneOf(idx, [14, 15]) && 'row-span-4 col-span-4',
            isOneOf(idx, [16]) && 'col-span-3',
            isOneOf(idx, [17]) && 'col-span-3 row-span-3'
          ].filter((x) => x).join(' ')}
        />
      ))}
    </div>
  </Layout>
)

export default Grid
