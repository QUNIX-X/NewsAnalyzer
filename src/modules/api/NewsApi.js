export default class NewsApi {
  constructor(options, DATE_FOR_API) {
    this._url = options.url;
    this._apiKey = options.apiKey;
    this.dateForApi = DATE_FOR_API;
    this.nowDate = this.dateForApi.nowDate;
    this.weekAgoDate = this.dateForApi.weekAgoDate;
  }

  sendRequest(query) {
    const url = `${this._url}q=${query}&language=ru&from=${this.weekAgoDate}&to=${this.nowDate}&sortBy=popularity&pageSize=100&apiKey=${this._apiKey}`;
    return fetch(url)
        .then(status => {
            if (status.ok) {
              return status.json();
            }
        })
        .then(data => {
            return data.articles;
        })
  }
}
