import {
    TEXT_QUERY,
    TEXT_QUERY_REG
} from '../../../modules/queryReg';

export default class AnalyticsData {
  constructor(storage) {
    this.storage = storage;
    this.titleAnalytics = document.querySelector('.report__title');
    this.newsCount = document.querySelector('.report__news');
    this.mentionQueryCount = document.querySelector('.report__mention');
  }

  loadingData() {
    this._titleQuery();
    this._queryTitlesCount();
  }

  _titleQuery() {
    this.titleAnalytics.textContent = `Вы спросили: «${TEXT_QUERY}»`;
    this.newsCount.textContent = this.storage.length;
  }

  _queryTitlesCount() {
    const newsTitleArray = [];
    let matchArray;
    let countMatch = 0;
    this.storage.forEach((item, index) => {
        if (item.title != null) {
            newsTitleArray[index] = item.title;
        }
    });
    newsTitleArray.forEach((item) => {
        matchArray = item.match(TEXT_QUERY_REG);
        if (matchArray != null) {
            countMatch = countMatch + matchArray.length;
        }
    });
    this.mentionQueryCount.textContent = countMatch;
  }
}
