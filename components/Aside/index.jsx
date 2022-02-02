import React from 'react'

const Aside = ({header, text}) => {
  return (
    <aside className='DocsMarkdown--aside' role='note' data-type='note'>
      {header && <div class="DocsMarkdown--aside-header">{header}</div>}
      <p>{text}</p>
    </aside>
  )
}

export default Aside