import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// import { icons } from '../img/icons.svg'; // parcel 1
import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime/runtime'; // for polyfilling async await
import { async } from 'regenerator-runtime';

//hot module reloading // straight from parcel

// if (module.hot) {
//   module.hot.accept();
// }
// async part

const controlRecipes = async function () {
  try {
    //getting the id of data to be fetch from the api
    const id = window.location.hash.slice(1); // way faster
    if (!id) return;

    // invoking the peloader before the item get loaded
    recipeView.renderSpinner();

    // 1) load data
    await model.loadRecipe(id);

    //2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
    recipeView.renderError(err);
  }
};

const controlSearchResults = async () => {
  try {
    // 1) while loading implement spinner
    resultsView.renderSpinner();

    //2) get query from the Dom using the _search View
    const query = searchView.getQuery();
    if (!query) return;

    //3) load result form the server _model
    await model.loadSearchResult(query);

    //4) render result to the Dom
    const { results } = model.state.search;
    const page = model.getSearchResultPage();
    resultsView.render(page);
    //render intial pagination button
    paginationView.render({ results, ...model.state.search });
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

const controlPagination = goto => {
  console.log('pag controller');
  // goto new reult
  resultsView.render(model.getSearchResultPage(goto));

  //update the pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  //update the recipe servings
  model.updateServings(newServings);

  //updating the _recipeView
  recipeView.render(model.state.recipe);
};
const init = function () {
  //publisher subscriber pattern
  // to make sure all the events are added ass the site loads
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
