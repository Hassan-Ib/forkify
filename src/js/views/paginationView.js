import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //page 1 and their are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._nextBtnMarkup(currentPage);
    }

    //last page
    if (currentPage === numPages && numPages > 1)
      return this._prevBtnMarkup(currentPage);
    //other page
    if (currentPage > 1) {
      return (
        this._prevBtnMarkup(currentPage) + this._nextBtnMarkup(currentPage)
      );
    }
    // page 1 and no other pages
    return '';
  }

  _prevBtnMarkup(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }"class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
            </button>`;
  }

  _nextBtnMarkup(currentPage, page) {
    return `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button> `;
  }
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);

      handler(gotoPage);
    });
  }
}

export default new PaginationView();
