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
    resultsView.render(model.getSearchResultPage());
    //render intial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
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

const controlServings = () => {
  //update the recipe servings
  model.updateServings(6);

  //updating the _recipeView
};
const init = function () {
  //publisher subscriber pattern
  // to make sure all the events are added ass the site loads
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();

//another method intead of using hashchange but hash change is better
// using event propagation
// resultList.addEventListener('click', e => {
//   const id = e.target.id && e.target.id;
//   console.log(id);
//   controlRecipes(id);
// });

// let getLocation = () => {
//   return new Promise((resolve, reject) => {
//     // new Promises are you to TO CREATE PROMISES

//     navigator.geolocation.getCurrentPosition(resolve, reject); // NAVIGATOR.GEOLOCATION.GETCURRENTPOSITION
//   });
// };

// getLocation()
//   .then(el => {
//     console.log(el);
//     let { latitude, longitude } = el.coords;
//     console.log(latitude, longitude);
//   })
//   .catch(err => alert(err));

// let whereAmI = async ()=> {
//   const position = await getLocation();
//   console.log(position)
// }
// whereAmI();
