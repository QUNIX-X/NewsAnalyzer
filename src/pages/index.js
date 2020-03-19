import './index.css';
import CheckSearch from '../blocks/main/search/checkSearch';
import DateCalc from '../modules/date';
import NewsApi from '../modules/api/NewsApi';
import Storage from '../modules/storage';
import Validate from '../modules/validate'
import Results from '../blocks/main/result/results';

const SEARCH_FORM = document.querySelector('.search__field');
const SEARCH_INPUT = document.querySelector('.search__input');
const SEARCH_BUTTON = document.querySelector('.search__button');
const CARD_LIST = document.querySelector('.result__cards');
const BUTTON_SHOW_MORE = document.querySelector('.result__button');

const CHECK_SEARCH = new CheckSearch(SEARCH_INPUT);
const DATE_CALC = () => new DateCalc;
const DATE_FOR_API = DATE_CALC().getDateForApi();
const STORAGE = new Storage;
const RESULTS = new Results(SEARCH_INPUT, SEARCH_BUTTON, CARD_LIST, BUTTON_SHOW_MORE);

const NEWS_API = new NewsApi ({
  url:'https://newsapi.org/v2/everything?',
  apiKey: '118eb65ee44d4f41b692570db5e71bd0'
}, DATE_FOR_API);

new Validate(SEARCH_FORM, SEARCH_INPUT, SEARCH_BUTTON);

const newsLoad = () => {
  if (STORAGE.checkLocalstorage()) {
    RESULTS.newsVisible();
  if (STORAGE.load().length > 3) {
    RESULTS.blockStyle(BUTTON_SHOW_MORE, '');
  } else {
    RESULTS.blockStyle(BUTTON_SHOW_MORE, 'none');
  }
    RESULTS.createCardsBlock(STORAGE.load(), DATE_CALC());
  }
}

const CLEARING_STORAGE = () => {
  localStorage.clear();
  while (CARD_LIST.firstChild) {
    CARD_LIST.firstChild.remove();
  }
}

BUTTON_SHOW_MORE.addEventListener('click', () => RESULTS.showMore(STORAGE.load(), DATE_CALC()));

SEARCH_BUTTON.addEventListener('click', () => {
  let query = CHECK_SEARCH.validation();
  if (query) {
    console.log(CLEARING_STORAGE())
    CLEARING_STORAGE();
    RESULTS.newsLoading();
    NEWS_API.sendRequest(query)
        .then(data => {
          if (data.length === 0) {
            RESULTS.newsEmpty();
          } else {
            STORAGE.textQuery(query);
            STORAGE.save(data);
            newsLoad();
          }
        })
        .catch(() => {
          RESULTS.newsError();
        });
  }
});
