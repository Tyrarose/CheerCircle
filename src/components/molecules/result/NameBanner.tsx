import React, { FC } from 'react'

interface NameBannerProps {
  name: string
}

const NameBanner: FC<NameBannerProps> = ({ name }) => {
  return (
    <div className="mx-auto bg-yellow-five w-full">
      <div className="text-center text-4xl font-archivo py-6 text-black tracking-widest">
        {name.toUpperCase()}
      </div>

    </div>
  )
}


export default NameBanner