export default class GitHubApi {
  constructor(options) {
    this._url = options.url;
  }

  getCommits(path) {
    return fetch(`${this._url}${path}`)
        .then(res => {
          return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch(err => {
          return console.log(err)
        })
  }
}
