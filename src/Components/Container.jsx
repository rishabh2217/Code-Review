import React from 'react'

export default function Container({ children, isDark }) {
  console.log(isDark)
  return (
    <div 
      className={`min-h-screen transition-colors duration-200 ${
        isDark 
          ? 'bg-neutral-900 text-white' 
          : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      {children}
    </div>
  )
}