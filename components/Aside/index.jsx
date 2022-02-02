import React from 'react'

const Aside = ({header, pTags}) => {
  return (
    <aside className='DocsMarkdown--aside' role='note' data-type='note'>
      {header && <div class="DocsMarkdown--aside-header">{header}</div>}
      {pTags.map(tag => <p key={tag}>{tag}</p>)}
    </aside>
  )
}

export default Aside