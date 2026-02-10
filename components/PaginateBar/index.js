import cn from 'classnames'
import css from './index.module.css'

class PaginateBarComponent {
  #selector
  #onChange
  #children
  #pageNum
  #perPage
  #totalRecords
  #totalPages

  constructor({ selector, onChange, children }) {
    this.#selector = selector
    this.#onChange = onChange
    this.#children = children

    this.#pageNum = null
    this.#perPage = null
    this.#totalRecords = null
    this.#totalPages = null

    Object.preventExtensions(this)

    this.#setInitialDOM()
  }

  setValues({ pageNum, perPage, totalRecords, totalPages }) {
    this.#pageNum = parseInt(pageNum, 10)
    this.#perPage = parseInt(perPage, 10)
    this.#totalRecords = parseInt(totalRecords, 10)
    this.#totalPages = parseInt(totalPages, 10)

    this.#updateDOM()
  }

  isLoading(value) {
    const prevButton = document.querySelector('#prev-page')
    const nextButton = document.querySelector('#next-page')

    if (prevButton) {
      prevButton.disabled = value
    }

    if (nextButton) {
      nextButton.disabled = value
    }
  }

  #setInitialDOM() {
    const html = `
      <div class=${css['paginate-bar']}>
        <div id='num-results' class=${css['num-results']}></div>
        <div id='children' class=${css.children}>${this.#children}</div>
        <div id='paginator' class=${css.paginator}>
          <button class=${cn(css.button, css['paginate-button'])} id='prev-page'>PREV PAGE</button>
          <button class=${cn(css.button, css['paginate-button'])} id='next-page'>NEXT PAGE</button>
        </div>
      </div>
    `

    const root = document.querySelector(this.#selector)
    if (!root) {
      return
    }

    root.insertAdjacentHTML('beforeend', html)

    const nextButton = root.querySelector('#next-page')
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.#onChange(this.#pageNum + 1)
      })
    }

    const prevButton = root.querySelector('#prev-page')
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        this.#onChange(this.#pageNum - 1)
      })
    }
  }

  #updateDOM() {
    const numResults = document.querySelector('#num-results')
    const prevButton = document.querySelector('#prev-page')
    const nextButton = document.querySelector('#next-page')

    if (!numResults || !prevButton || !nextButton) {
      return
    }

    let text = ''
    const readableTotalRecords = this.#totalRecords.toLocaleString()
    const pluralizedRecordName = 'DOCUMENTS'

    if (this.#totalPages > 1) {
      const start = this.#pageNum * this.#perPage - this.#perPage + 1
      const end = Math.min(this.#pageNum * this.#perPage, this.#totalRecords)
      text += `${start}...${end} OF `
    }

    text += ` ${readableTotalRecords} ${pluralizedRecordName}`

    numResults.innerHTML = text
    prevButton.style.display = this.#pageNum > 1 ? 'block' : 'none'
    nextButton.style.display = this.#pageNum < this.#totalPages ? 'block' : 'none'
  }
}

export default PaginateBarComponent
