import $ from 'jquery'

class PaginateBarComponent {
  #selector;
  #onChange;
  #children;
  #pageNum;
  #perPage;
  #totalRecords;
  #totalPages;

  constructor({ selector, onChange, children }) {
    this.#selector = selector;
    this.#onChange = onChange;
    this.#children = children;

    this.#pageNum = null;
    this.#perPage = null;
    this.#totalRecords = null;
    this.#totalPages = null;

    // prevent new attributes (private or public) from being set
    Object.preventExtensions(this);

    this.#setInitialDOM();
  }

  setValues({ pageNum, perPage, totalRecords, totalPages }) {
    this.#pageNum = parseInt(pageNum, 10);
    this.#perPage = parseInt(perPage, 10);
    this.#totalRecords = parseInt(totalRecords, 10);
    this.#totalPages = parseInt(totalPages, 10);

    this.#updateDOM();
  }

  isLoading(value) {
    const isDisabled = value;
    $('#prev-page').attr('disabled', isDisabled);
    $('#next-page').attr('disabled', isDisabled);
  }

  #setInitialDOM() {
    const html = `
      <div class="paginate-bar">
        <div id="num-results"></div>
        <div id="children">${this.#children}</div>
        <div id="paginator">
          <button class='button paginate-button' id='prev-page'>PREV PAGE</button>
          <button class='button paginate-button' id='next-page'>NEXT PAGE</button>
        </div>
      </div>
    `;

    $(this.#selector).append(html);

    $('#next-page').on('click', () => {
      this.#onChange(this.#pageNum + 1);
    });
    $('#prev-page').on('click', () => {
      this.#onChange(this.#pageNum - 1);
    });
  }

  #updateDOM() {
    let text = '';
    const readableTotalRecords = this.#totalRecords.toLocaleString();
    const plularlizedRecordName = `DOCUMENTS`;
    if (this.#totalPages > 1) {
      let start = this.#pageNum * this.#perPage - this.#perPage + 1;
      let end = Math.min(this.#pageNum * this.#perPage, this.#totalRecords);
      text += `${start}...${end} OF `;
    }
    text += ` ${readableTotalRecords} ${plularlizedRecordName}`;

    $('#num-results').html(text);
    if (this.#pageNum > 1) {
      $('#prev-page').css('display', 'block');
    } else {
      $('#prev-page').css('display', 'none');
    }
    if (this.#pageNum < this.#totalPages) {
      $('#next-page').css('display', 'block');
    } else {
      $('#next-page').css('display', 'none');
    }
  }
}

export default PaginateBarComponent;
