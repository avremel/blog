import React from 'react'

const VisuallyHidden = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="inline-block absolute overflow-hidden clip-[rect(0 0 0 0)] h-1 w-1 m-[-1px] p-0 border-0"
      style={{ clip: 'rect(0 0 0 0)' }}
    >
      {children}
    </span>
  )
}

export default VisuallyHidden
