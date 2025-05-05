import React, { FC } from 'react'

interface TwoColumnBorderedProps {
  leftContent: React.ReactNode
  rightContent: React.ReactNode
}

const TwoColumnBordered: FC<TwoColumnBorderedProps> = ({ leftContent, rightContent }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 w-full border-b-4 border-t-4 border-black-five p-4 text-center font-archivo uppercase">
        {leftContent}
      </div>
      <div className="md:w-3/4 w-full border-b-4 border-t-4 border-black-five p-4 text-center font-archivo">
        {rightContent}
      </div>
    </div>
  )
}

export default TwoColumnBordered
