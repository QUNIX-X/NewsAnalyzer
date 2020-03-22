import './index.css';
import CheckSearch from '../blocks/main/search/checkSearch';
import DateCalc from '../modules/date';
import NewsApi from '../modules/api/NewsApi';
import Storage from '../modules/storage';
import Validate from '../modules/validate'
import Results from '../blocks/main/result/results';

const searchForm = document.querySelector('.search__field');
const searchButton = document.querySelector('.search__button');

const buttonShowMore = document.querySelector('.result__button');

const checkSearch = new CheckSearch;
const dateCalc = () => new DateCalc;
const dateForApi = dateCalc().getDateForApi();
const storage = new Storage;
const results = new Results(searchButton, buttonShowMore);

const newsApi = new NewsApi ({
  url: 'https://newsapi.org/v2/everything?',
  apiKey: '118eb65ee44d4f41b692570db5e71bd0'
}, dateForApi);

new Validate(searchForm, searchButton);

const newsLoad = () => {
  if (storage.checkLocalstorage()) {
    results.newsVisible();
  if (storage.load().length > 3) {
    results.blockStyle(buttonShowMore, '');
  } else {
    results.blockStyle(buttonShowMore, 'none');
  }
    results.createCardsBlock(storage.load(), dateCalc());
  }
}

const handlerSearchButton = () => {
  let query = checkSearch.validation();
  if (!!query) {
    results.clearingStorage();
    results.newsLoading();
    newsApi.sendRequest(query)
        .then(data => {
          if (data.length === 0) {
            results.newsEmpty();
          } else {
            storage.textQuery(query);
            storage.save(data);
            newsLoad();
          }
        })
        .catch(() => {
          results.newsError();
        });
  }
};

const handlerButtonShowMore = () => {
  results.showMore(storage.load(), dateCalc())
};

searchButton.addEventListener('click', handlerSearchButton);
buttonShowMore.addEventListener('click', handlerButtonShowMore);
