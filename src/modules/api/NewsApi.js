export default class NewsApi {
  constructor(options, dateForApi) {
    this._url = options.url;
    this._apiKey = options.apiKey;
    this.dateForApi = dateForApi;
    this.nowDate = this.dateForApi.nowDate;
    this.weekAgoDate = this.dateForApi.weekAgoDate;
  }

  sendRequest(query) {
    const url = `${this._url}q=${query}&lang=ru&max=100&mindate=${this.weekAgoDate}$maxdate=${this.nowDate}&token=${this._apiKey}`; //NEWS API - `${this._url}q=${query}&language=ru&from=${this.weekAgoDate}&to=${this.nowDate}&sortBy=popularity&pageSize=100&apiKey=${this._apiKey}`
    return fetch(url)
      .then(status => {
        if (status.ok) {
          return status.json();
        }
      })
      .then(data => {
        return data.articles;
      })
      .catch(err => {
        return console.log(err)
      })
  }
}
