import React from 'react'

const Aside = ({header, text}) => {
  return (
    <aside>
      {header && <div class="DocsMarkdown--aside-header">{header}</div>}
      <p>{text}</p>
    </aside>
  )
}

export default Aside