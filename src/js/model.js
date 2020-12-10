import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
import { RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    // console.log(res, data);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      ingredient: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
    };

    // console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const loadSearchResult = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    // alert(error);
    throw error;
  }
};

export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipes.ingredient.forEach(el => {});
};
