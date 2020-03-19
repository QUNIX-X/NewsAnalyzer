export default class GitHubApi {
  constructor(options) {
    this._url = options.url;
  }

  getCommits(path) {
    return fetch(`${this._url}${path}`)
        .then(res => {
          if (res.ok) {
            document.querySelector('.github__api-error').style.display = 'none';
            document.querySelector('.swiper-container').style.display = ''
          } else {
            document.querySelector('.github__api-error').style.display = '';
            document.querySelector('.swiper-container').style.display = 'none'
          }
          return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        })
  }
}
