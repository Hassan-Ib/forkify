class SearchView {
  _parentEelement = document.querySelector('.search');

  getQuery() {
    const query = this._parentEelement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEelement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEelement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
