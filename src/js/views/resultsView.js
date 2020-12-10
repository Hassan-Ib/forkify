import View from './view';
// import icons from 'url:../../img/icons.svg'; // parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errormessage = `No recipes found for your query! Please try again ;)`;
  _message = '';

  _generateMarkup() {
    return this._data.map(recipe => this._generateRecipe(recipe)).join('');
  }

  _generateRecipe(recipe) {
    return `
            <li class="preview">
            <a class="preview__link " href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                
              </div>
            </a>
          </li>
      `;
  }
}

export default new ResultsView();
